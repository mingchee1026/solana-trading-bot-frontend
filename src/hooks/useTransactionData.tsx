import { useEffect } from 'react'
import { useAppDispatch } from '../stores/hooks'
import { setTradingData, setSnipingData } from '../stores/mainSlice'

const useTransactionData = (serverEndpoint: string) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const eventSource = new EventSource(serverEndpoint)
    eventSource.onmessage = (event) => {
      const activities = JSON.parse(event.data)
      dispatch(setTradingData(JSON.parse(activities.tradingData)))
      dispatch(setSnipingData(JSON.parse(activities.snipingData)))
    }
    return () => {
      eventSource.close()
    }
  }, [dispatch, serverEndpoint])
}

export default useTransactionData
