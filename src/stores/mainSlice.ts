import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserPayloadObject, ActivityObject } from '../interfaces'

interface MainState {
  userName: string
  userEmail: null | string
  isFieldFocusRegistered: boolean
  transactionData: ActivityObject[]
}

const initialState: MainState = {
  /* User */
  userName: 'Admin',
  userEmail: 'admin@example.com',

  /* Field focus with ctrl+k (to register only once) */
  isFieldFocusRegistered: false,
  transactionData: [],
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserPayloadObject>) => {
      state.userName = action.payload.name
      state.userEmail = action.payload.email
    },
    setTransactionData: (state, action: PayloadAction<ActivityObject[]>) => {
      state.transactionData = [...state.transactionData, ...action.payload]
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setTransactionData } = mainSlice.actions

export default mainSlice.reducer
