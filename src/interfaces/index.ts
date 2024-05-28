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

export type TradingState = {
  created: number
  activity: string
  baseAmount: string
  quoteAmount: string
  tokenPriceSOL: string
  tokenPriceUSD: string
  trading: string
}

export type SnipingState = {
  created: number
  poolId: string
  tokenAddress: string
  isLocked: string
  poolSize: string
  sniping: string
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

export type TradingObject = {
  id: number
  state: {
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
    trading?: {
      type: number
      profit: number
    }
  }
}

export type SnipingObject = {
  id: number
  state: {
    poolId: string
    tokenAddress: number
    isLocked: number
    poolSize: number
    buying?: {
      amount: number
    }
  }
}

export type TradingSettingsForm = {
  privateKey: string
  tokenAddress: string
  buyAmount: number
  buySlipage: number
  sellSlipage: number
  jitoTips: number
}

export type SnipingSettingsForm = {
  privateKey: string
  minPoolSize: number
  maxPoolSize: number
  buyAmount: number
  checkLocked: boolean
}
