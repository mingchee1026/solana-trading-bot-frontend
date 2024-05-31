import React, { useEffect, useState, ReactElement } from 'react'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import axios from 'axios'
import { mdiChartTimelineVariant } from '@mdi/js'
import { RootState } from '../stores/store'
import { useAppDispatch } from '../stores/hooks'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import Button from '../components/Button'
import Buttons from '../components/Buttons'
import CardBox from '../components/CardBox'
import PriceChartLine from '../components/Chart/PriceMovement'
import TableTrading from '../components/Table/Trading'
import { getPageTitle } from '../config'
import { setRunTrading } from '../stores/mainSlice'
import useTransactionData from '../hooks/useTransactionData'

const TokenMonitor = () => {
  const dispatch = useAppDispatch()

  useTransactionData(`${process.env.NEXT_PUBLIC_API_URL}/sse/substxs`)

  const tradingSettings = useSelector((state: RootState) => state.main.tradingSettingsForm)
  const tradingData = useSelector((state: RootState) => state.main.tradingData)

  const runTrading = useSelector((state: RootState) => state.main.runTrading)
  const [chartData, setChartData] = useState([])
  const [txsData, setTxsData] = useState([])

  const getActivityData = () => {
    if (tradingData.length === 0) {
      return
    }

    const newChartData = []
    const newTxsData = []
    for (const activity of tradingData) {
      newChartData.push([activity.id, activity.state.tokenPriceSOL])

      let tradingInfo = ''
      if (activity.state.trading) {
        tradingInfo =
          activity.state.trading.type === 0
            ? 'Trading BUY'
            : `Trading SELL, Profit/Loss: ${activity.state.trading.profit}`
      }

      newTxsData.push({
        created: new Date(activity.id).toISOString(),
        activity: activity.state.transactionType === 0 ? 'BUY' : 'SELL',
        baseAmount: activity.state.transactionBaseAmount,
        quoteAmount: toPlainString(activity.state.transactionQuoteAmount),
        tokenPriceSOL: activity.state.tokenPriceSOL.toFixed(14),
        tokenPriceUSD: activity.state.tokenPriceUSB.toFixed(14),
        trading: activity.state.bundle
          ? `BUNDLE, DIFF: ${toPlainString(activity.state.bundle.diff)}`
          : activity.state.trading
            ? tradingInfo
            : '',
      })
    }

    setChartData(newChartData)
    setTxsData(newTxsData)
  }

  const toPlainString = (num) => {
    return ('' + +num).replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/, function (a, b, c, d, e) {
      return e < 0
        ? b + '0.' + Array(1 - +e - c.length).join('0') + c + d
        : b + c + d + Array(+e - d.length + 1).join('0')
    })
  }

  const checkSettings = () => {
    if (tradingSettings.privateKey === '') {
      alert('Please enter private key from the settings page.')
      return false
    }

    if (tradingSettings.tokenAddress === '') {
      alert('Please enter token address from the settings page.')
      return false
    }

    try {
      parseInt(tradingSettings.buySlipage.toString())
    } catch (e) {
      alert('Please enter correct buy slipage from the settings page.')
      return false
    }

    try {
      parseInt(tradingSettings.sellSlipage.toString())
    } catch (e) {
      alert('Please enter correct sell slipage from the settings page.')
      return false
    }

    try {
      parseFloat(tradingSettings.buyAmount.toString())
    } catch (e) {
      alert('Please enter the correct amount to buy from the settings page.')
      return false
    }

    try {
      parseFloat(tradingSettings.jitoTips.toString())
    } catch (e) {
      alert('Please enter the correct Jito Bundle Tips from the settings page.')
      return
    }

    return true
  }

  const onStartTrading = async () => {
    if (!checkSettings()) {
      return
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/startTokenTrading`, tradingSettings)
      .then((res) => {
        console.log(res.data)
        if (res.data.Ok) {
          dispatch(setRunTrading(true))
        } else {
          alert(res.data.Err)
        }
      })
      .catch((err) => {
        console.log('error in request', err)
      })
  }

  const onStopTrading = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/stopTokenTrading`)
      .then((res) => {
        console.log(res.data)
        dispatch(setRunTrading(false))
      })
      .catch((err) => {
        console.log('error in request', err)
      })
  }

  // console.log(tradingData)

  useEffect(() => {
    getActivityData()
  }, [tradingData])

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="Price Movement" main>
          <Buttons>
            <Button
              label="Start Token Trading"
              color="info"
              roundedFull
              small
              disabled={runTrading}
              onClick={onStartTrading}
            />
            <Button
              label="Stop Token Trading"
              color="danger"
              roundedFull
              small
              disabled={!runTrading}
              onClick={onStopTrading}
            />
          </Buttons>
        </SectionTitleLineWithButton>

        {/* <SectionTitleLineWithButton icon={mdiChartPie} title="Trends overview">
          <Button icon={mdiReload} color="whiteDark" onClick={fillChartData} />
        </SectionTitleLineWithButton> */}

        <CardBox className="mb-1">{chartData && <PriceChartLine data={chartData} />}</CardBox>

        <CardBox hasTable>
          <TableTrading data={txsData} />
        </CardBox>
      </SectionMain>
    </>
  )
}

TokenMonitor.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TokenMonitor
