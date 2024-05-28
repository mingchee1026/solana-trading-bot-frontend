import Head from 'next/head'
import React, { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import { appTitle } from '../config'
import { useAppDispatch } from '../stores/hooks'
import { setDarkMode } from '../stores/darkModeSlice'
import useTransactionData from '../hooks/useTransactionData'

const HomePage = () => {
  const dispatch = useAppDispatch()

  dispatch(setDarkMode(true))
  useTransactionData(`${process.env.NEXT_PUBLIC_API_URL}/sse/substxs`)

  return (
    <>
      <Head>
        <title>{appTitle}</title>
      </Head>
      <SectionMain>
        <h1 className="text-4xl font-bold text-center text-white mt-80 mb-30 md:text-5xl lg:mt-40">
          Solana Trading Bot Dashboard
        </h1>
      </SectionMain>
    </>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default HomePage
