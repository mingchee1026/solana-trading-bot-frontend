import { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import { mdiAccount, mdiBallotOutline, mdiMail } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import { useAppDispatch } from '../stores/hooks'
import { RootState } from '../stores/store'
import { setTradingForm, setSnipingForm } from '../stores/mainSlice'
import Button from '../components/Button'
import Buttons from '../components/Buttons'
import CardBox from '../components/CardBox'
import CardBoxComponentBody from '../components/CardBox/Component/Body'
import CardBoxComponentFooter from '../components/CardBox/Component/Footer'
import FormCheckRadio from '../components/Form/CheckRadio'
import FormField from '../components/Form/Field'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import { getPageTitle } from '../config'

const FormsPage = () => {
  const dispatch = useAppDispatch()

  const tradingForm = useSelector((state: RootState) => state.main.tradingSettingsForm)

  const snipingForm = useSelector((state: RootState) => state.main.snipingSettingsForm)

  return (
    <>
      <Head>
        <title>{getPageTitle('Settings')}</title>
      </Head>

      <SectionMain>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col">
            <SectionTitleLineWithButton
              icon={mdiBallotOutline}
              title="Token Trading Settings"
              main
            ></SectionTitleLineWithButton>
            <CardBox className="flex-1" hasComponentLayout>
              <Formik
                initialValues={tradingForm}
                onSubmit={(values) => {
                  if (values.privateKey === '') {
                    alert('Please enter private key!')
                    return
                  }

                  if (values.tokenAddress === '') {
                    alert('Please enter token address!')
                    return
                  }

                  try {
                    parseInt(values.buySlipage.toString())
                  } catch (e) {
                    alert('Please enter correct buy slipage!')
                    return
                  }

                  try {
                    parseInt(values.sellSlipage.toString())
                  } catch (e) {
                    alert('Please enter correct sell slipage!')
                    return
                  }

                  try {
                    parseFloat(values.buyAmount.toString())
                  } catch (e) {
                    alert('Please enter the correct amount to buy!')
                    return
                  }

                  try {
                    parseFloat(values.jitoTips.toString())
                  } catch (e) {
                    alert('Please enter the correct Jito Bundle Tips!')
                    return
                  }

                  dispatch(setTradingForm(values))
                }}
              >
                <Form className="flex flex-col flex-1">
                  <CardBoxComponentBody>
                    <FormField
                      label="Private Key"
                      help="Required. Your Private Key"
                      labelFor="privateKey1"
                      icons={[mdiAccount]}
                    >
                      <Field
                        type="password"
                        name="privateKey"
                        id="privateKey1"
                        placeholder="Your Private Key"
                      />
                    </FormField>

                    <FormField
                      label="Token Address"
                      help="Required. Token Address"
                      labelFor="tokenAddress"
                      icons={[mdiMail]}
                    >
                      <Field name="tokenAddress" id="tokenAddress" placeholder="Token Address" />
                    </FormField>

                    <FormField
                      label="Buy Amount (SOL)"
                      help="Required. Buy Amount"
                      labelFor="buyAmount1"
                    >
                      <Field name="buyAmount" id="buyAmount1" placeholder="Buy Amount" />
                    </FormField>

                    <FormField
                      label="Buy Slipage (%)"
                      help="Required. Buy Slipage"
                      labelFor="buySlipage"
                    >
                      <Field name="buySlipage" id="buySlipage" placeholder="Buy Slipage" />
                    </FormField>

                    <FormField
                      label="Sell Slipage (%)"
                      help="Required. Sell Slipage"
                      labelFor="sellSlipage"
                    >
                      <Field name="sellSlipage" id="sellSlipage" placeholder="Sell Slipage" />
                    </FormField>

                    <FormField
                      label="Jito Tips (SOL)"
                      help="Required. Jito Bundle Tips"
                      labelFor="jitoTips"
                    >
                      <Field name="jitoTips" id="jitoTips" placeholder="Jito Bundle Tips" />
                    </FormField>
                  </CardBoxComponentBody>

                  <CardBoxComponentFooter>
                    <Buttons className={'justify-end'}>
                      <Button color="info" type="submit" label="Save" />
                      {/* <Button color="info" label="Options" outline /> */}
                    </Buttons>
                  </CardBoxComponentFooter>
                </Form>
              </Formik>
            </CardBox>
          </div>

          <div className="flex flex-col">
            <SectionTitleLineWithButton
              icon={mdiBallotOutline}
              title="LP Sniping Settings"
              main
            ></SectionTitleLineWithButton>
            <CardBox hasComponentLayout>
              <Formik
                initialValues={snipingForm}
                onSubmit={(values) => {
                  if (values.privateKey === '') {
                    alert('Please enter private key!')
                    return
                  }

                  try {
                    parseInt(values.minPoolSize.toString())
                  } catch (e) {
                    alert('Please enter min pool size!')
                    return
                  }

                  try {
                    parseInt(values.maxPoolSize.toString())
                  } catch (e) {
                    alert('Please enter max pool size!')
                    return
                  }

                  try {
                    parseFloat(values.buyAmount.toString())
                  } catch (e) {
                    alert('Please enter the correct amount to buy!')
                    return
                  }

                  dispatch(setSnipingForm(values))
                }}
              >
                <Form className="flex flex-col flex-1">
                  <CardBoxComponentBody>
                    <FormField
                      label="Private Key"
                      help="Required. Your Private Key"
                      labelFor="privateKey2"
                      icons={[mdiAccount]}
                    >
                      <Field
                        type="password"
                        name="privateKey"
                        id="privateKey2"
                        placeholder="Your Private Key"
                      />
                    </FormField>

                    <FormField
                      label="Min Pool Size (SOL)"
                      help="Required. Min Pool Size"
                      labelFor="minPoolSize"
                    >
                      <Field name="minPoolSize" id="minPoolSize" placeholder="Min Pool Size" />
                    </FormField>

                    <FormField
                      label="Max Pool Size (SOL)"
                      help="Required. Max Pool Size"
                      labelFor="maxPoolSize"
                    >
                      <Field name="maxPoolSize" id="maxPoolSize" placeholder="Max Pool Size" />
                    </FormField>

                    <FormField
                      label="Buy Amount (SOL)"
                      help="Required. Buy Amount"
                      labelFor="buyAmount2"
                    >
                      <Field name="buyAmount" id="buyAmount2" placeholder="Buy Amount" />
                    </FormField>

                    <FormField>
                      <FormCheckRadio type="switch" label="Check Locked">
                        <Field type="checkbox" name="checkLocked" id="checkLocked" />
                      </FormCheckRadio>
                    </FormField>
                  </CardBoxComponentBody>

                  <CardBoxComponentFooter>
                    <Buttons className={'justify-end'}>
                      <Button color="info" type="submit" label="Save" />
                      {/* <Button color="info" label="Options" outline /> */}
                    </Buttons>
                  </CardBoxComponentFooter>
                </Form>
              </Formik>
            </CardBox>
          </div>
        </div>
      </SectionMain>
    </>
  )
}

FormsPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default FormsPage
