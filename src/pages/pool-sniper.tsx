import React, { useEffect, useState, ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { mdiTableBorder } from '@mdi/js'
import Head from 'next/head'
import axios from 'axios'
import { RootState } from '../stores/store'
import { useAppDispatch } from '../stores/hooks'
import Buttons from '../components/Buttons'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import TableSniping from '../components/Table/Sniping'
import { getPageTitle } from '../config'
import { setRunSniping } from '../stores/mainSlice'
import useTransactionData from '../hooks/useTransactionData'

const PoolSniperPage = () => {
  const dispatch = useAppDispatch()

  useTransactionData(`${process.env.NEXT_PUBLIC_API_URL}/sse/substxs`)

  const snipingSettings = useSelector((state: RootState) => state.main.snipingSettingsForm)
  const snipinggData = useSelector((state: RootState) => state.main.snipingData)

  const runSniping = useSelector((state: RootState) => state.main.runSniping)
  const [txsData, setTxsData] = useState([])

  const getActivityData = () => {
    if (snipinggData.length === 0) {
      return
    }

    const newTxsData = []
    for (const activity of snipinggData) {
      newTxsData.push({
        created: new Date(activity.id).toISOString(),
        poolId: activity.state.poolId,
        tokenAddress: activity.state.tokenAddress,
        isLocked: activity.state.isLocked,
        poolSize: activity.state.poolSize,
        sniping: activity.state.buying
          ? `https://solscan.io/tx/${activity.state.buying.signature}`
          : '',
      })
    }

    setTxsData(newTxsData)
  }

  // const toPlainString = (num) => {
  //   return ('' + +num).replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/, function (a, b, c, d, e) {
  //     return e < 0
  //       ? b + '0.' + Array(1 - +e - c.length).join('0') + c + d
  //       : b + c + d + Array(+e - d.length + 1).join('0')
  //   })
  // }

  const checkSettings = () => {
    if (snipingSettings.privateKey === '') {
      alert('Please enter private key from the settings page.')
      return false
    }

    try {
      parseInt(snipingSettings.minPoolSize.toString())
    } catch (e) {
      alert('Please enter min pool size from the settings page.')
      return false
    }

    try {
      parseInt(snipingSettings.maxPoolSize.toString())
    } catch (e) {
      alert('Please enter max pool size from the settings page.')
      return false
    }

    try {
      parseFloat(snipingSettings.buyAmount.toString())
    } catch (e) {
      alert('Please enter the correct amount to buy from the settings page.')
      return false
    }

    return true
  }

  const onStartSniping = async () => {
    if (!checkSettings()) {
      return
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/startPoolSniping`, snipingSettings)
      .then((res) => {
        console.log(res.data)
        if (res.data.Ok) {
          dispatch(setRunSniping(true))
        } else {
          alert(res.data.Err)
        }
      })
      .catch((err) => {
        console.log('error in request', err)
      })
  }

  const onStopSniping = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/stopPoolSniping`)
      .then((res) => {
        console.log(res.data)
        dispatch(setRunSniping(false))
      })
      .catch((err) => {
        console.log('error in request', err)
      })
  }

  // console.log(snipinggData)

  useEffect(() => {
    getActivityData()
  }, [snipinggData])

  return (
    <>
      <Head>
        <title>{getPageTitle('Tables')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiTableBorder} title="Pool Sniping" main>
          <Buttons>
            <Button
              label="Start Pool Sniping"
              color="info"
              roundedFull
              small
              disabled={runSniping}
              onClick={onStartSniping}
            />
            <Button
              label="Stop Pool Sniping"
              color="danger"
              roundedFull
              small
              disabled={!runSniping}
              onClick={onStopSniping}
            />
          </Buttons>
        </SectionTitleLineWithButton>

        <CardBox className="mb-6" hasTable>
          <TableSniping data={txsData} />
        </CardBox>
      </SectionMain>
    </>
  )
}

PoolSniperPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default PoolSniperPage
