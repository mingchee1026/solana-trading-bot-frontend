import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  UserPayloadObject,
  TradingObject,
  SnipingObject,
  TradingSettingsForm,
  SnipingSettingsForm,
} from '../interfaces'

interface MainState {
  userName: string
  userEmail: null | string
  tradingSettingsForm: TradingSettingsForm
  snipingSettingsForm: SnipingSettingsForm
  runTrading: boolean
  runSniping: boolean
  tradingData: TradingObject[]
  snipingData: SnipingObject[]
}

const initialState: MainState = {
  /* User */
  userName: 'Admin',
  userEmail: 'admin@example.com',

  /* Field focus with ctrl+k (to register only once) */
  tradingSettingsForm: {
    privateKey: '',
    tokenAddress: 'HQ7DaoiUxzC2K1Dr7KXRHccNtXvEYgNvoUextXe8dmBh',
    buyAmount: 0.01,
    buySlipage: 50,
    sellSlipage: 50,
    jitoTips: 0.001,
  },
  snipingSettingsForm: {
    privateKey: '',
    minPoolSize: 8,
    maxPoolSize: 0,
    buyAmount: 0.01,
    checkLocked: true,
  },
  runTrading: false,
  runSniping: false,
  tradingData: [],
  snipingData: [],
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserPayloadObject>) => {
      state.userName = action.payload.name
      state.userEmail = action.payload.email
    },
    setTradingForm: (state, action: PayloadAction<TradingSettingsForm>) => {
      state.tradingSettingsForm = action.payload
    },
    setSnipingForm: (state, action: PayloadAction<SnipingSettingsForm>) => {
      state.snipingSettingsForm = action.payload
    },
    setRunTrading: (state, action: PayloadAction<boolean>) => {
      state.runTrading = action.payload
    },
    setRunSniping: (state, action: PayloadAction<boolean>) => {
      state.runSniping = action.payload
    },
    setTradingData: (state, action: PayloadAction<TradingObject[]>) => {
      state.tradingData = [...state.tradingData, ...action.payload]
    },
    setSnipingData: (state, action: PayloadAction<SnipingObject[]>) => {
      state.snipingData = [...state.snipingData, ...action.payload]
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setUser,
  setTradingForm,
  setSnipingForm,
  setRunTrading,
  setRunSniping,
  setTradingData,
  setSnipingData,
} = mainSlice.actions

export default mainSlice.reducer
