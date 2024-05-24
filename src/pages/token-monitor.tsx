import { mdiChartTimelineVariant } from '@mdi/js'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import { RootState } from '../stores/store'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import CardBox from '../components/CardBox'
import PriceChartLine from '../components/Chart/PriceMovement'
import TableTransactions from '../components/Table/Transactions'
import { getPageTitle } from '../config'
import { useSelector } from 'react-redux'

const TokenMonitor = () => {
  const transactionData = useSelector((state: RootState) => state.main.transactionData)

  const [chartData, setChartData] = useState([])
  const [txsData, setTxsData] = useState([])

  const getActivityData = () => {
    if (transactionData.length === 0) {
      return
    }

    const newChartData = []
    const newTxsData = []
    for (const activity of transactionData) {
      newChartData.push([activity.id, activity.state.tokenPriceSOL])

      newTxsData.push({
        created: new Date(activity.id).toISOString(),
        activity: activity.state.transactionType === 0 ? 'BUY' : 'SELL',
        baseAmount: activity.state.transactionBaseAmount,
        quoteAmount: toPlainString(activity.state.transactionQuoteAmount),
        tokenPriceSOL: activity.state.tokenPriceSOL.toFixed(14),
        tokenPriceUSD: activity.state.tokenPriceUSB.toFixed(14),
        trading: activity.state.bundle
          ? `DIFF: ${toPlainString(activity.state.bundle.diff)}<br>BUY SLIPPAGE: ${activity.state.bundle.buySlippage}%<br>SELL SLIPPAGE: ${activity.state.bundle.sellSlippage}%`
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

  console.log(transactionData.length)

  useEffect(() => {
    // const eventSource = new EventSource(`http://localhost:8000/api/sse/substxs`)
    // eventSource.onmessage = (e) => {
    //   const activities = JSON.parse(e.data)
    //   if (activities.length === 0) {
    //     return
    //   }

    //   const newChartData = []
    //   const newTxsData = []
    //   for (const activity of activities) {
    //     newChartData.push([activity.id, activity.state.tokenPriceSOL])
    //     console.log(newChartData)
    //     newTxsData.push({
    //       created: new Date(activity.id).toISOString(),
    //       activity: activity.state.transactionType === 0 ? 'BUY' : 'SELL',
    //       baseAmount: activity.state.transactionBaseAmount,
    //       quoteAmount: toPlainString(activity.state.transactionQuoteAmount),
    //       tokenPriceSOL: activity.state.tokenPriceSOL.toFixed(14),
    //       tokenPriceUSD: activity.state.tokenPriceUSB.toFixed(14),
    //       trading: activity.state.bundle
    //         ? `DIFF: ${toPlainString(activity.state.bundle.diff)}<br>BUY SLIPPAGE: ${activity.state.bundle.buySlippage}%<br>SELL SLIPPAGE: ${activity.state.bundle.sellSlippage}%`
    //         : '',
    //     })
    //   }
    //   const newPriceData = [...totalChartData, ...newChartData]
    //   setChartData(newPriceData)
    //   totalChartData = newPriceData
    //   // console.log(totalChartData)
    //   const newTxData = [...totalTxsData, ...newTxsData]
    //   setTxsData(newTxData)
    //   totalTxsData = newTxData
    // }
    // return () => {
    //   console.log('cloded')
    //   eventSource.close()
    // }
    getActivityData()
  }, [transactionData])

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title="Price Movement"
          main
        ></SectionTitleLineWithButton>

        {/* <SectionTitleLineWithButton icon={mdiChartPie} title="Trends overview">
          <Button icon={mdiReload} color="whiteDark" onClick={fillChartData} />
        </SectionTitleLineWithButton> */}

        <CardBox className="mb-1">{chartData && <PriceChartLine data={chartData} />}</CardBox>

        <CardBox hasTable>
          <TableTransactions data={txsData} />
        </CardBox>
      </SectionMain>
    </>
  )
}

TokenMonitor.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TokenMonitor
