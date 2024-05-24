export type UserPayloadObject = {
  name: string
  email: string
}

export type MenuAsideItem = {
  label: string
  icon?: string
  href?: string
  target?: string
  color?: ColorButtonKey
  isLogout?: boolean
  menu?: MenuAsideItem[]
}

export type MenuNavBarItem = {
  label?: string
  icon?: string
  href?: string
  target?: string
  isDivider?: boolean
  isLogout?: boolean
  isDesktopNoLabel?: boolean
  isToggleLightDark?: boolean
  isCurrentUser?: boolean
  menu?: MenuNavBarItem[]
}

export type ColorKey = 'white' | 'light' | 'contrast' | 'success' | 'danger' | 'warning' | 'info'

export type ColorButtonKey =
  | 'white'
  | 'whiteDark'
  | 'lightDark'
  | 'contrast'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'void'

export type BgKey = 'purplePink' | 'pinkRed'

export type TrendType = 'up' | 'down' | 'success' | 'danger' | 'warning' | 'info'

export enum TransactionType {
  BUY,
  SELL,
}

export type Transaction = {
  created: number
  activity: string
  baseAmount: string
  quoteAmount: string
  tokenPriceSOL: string
  tokenPriceUSD: string
  trading: string
}

export type ActivityState = {
  transactionType: TransactionType
  transactionBaseAmount: number
  transactionQuoteAmount: number
  tokenPriceSOL: number
  tokenPriceBase: number
  tokenPriceUSB: number
  bundle?: {
    diff: number
    buySlippage: number
    sellSlippage: number
  }
}

export type ActivityObject = {
  id: number
  state: ActivityState
}

export type UserForm = {
  name: string
  email: string
}
