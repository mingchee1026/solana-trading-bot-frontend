import { useEffect } from 'react'
import { useAppDispatch } from '../stores/hooks'
import { setTransactionData } from '../stores/mainSlice'

const useTransactionData = (serverEndpoint: string) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const eventSource = new EventSource(serverEndpoint)
    eventSource.onmessage = (event) => {
      const txsData = JSON.parse(event.data)
      if (txsData.length > 0) {
        dispatch(setTransactionData(txsData))
      }
    }
    // return () => {
    //   eventSource.close()
    // }
  }, [dispatch, serverEndpoint])
}

export default useTransactionData
