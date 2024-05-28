import React, { useState } from 'react'
import { TradingState } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'

const TableTrading = ({ data }) => {
  const perPage = 10

  const [currentPage, setCurrentPage] = useState(0)

  data.sort((a, b) => {
    const aValue = a.created
    const bValue = b.created

    return bValue.localeCompare(aValue)
  })

  const clientsPaginated = data.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = Math.ceil(data.length / perPage)

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>DATE</th>
            <th>TYPE</th>
            <th>TOKEN</th>
            <th>SOL</th>
            <th>PRICE SOL</th>
            <th>PRICE USD</th>
            <th>TRADING</th>
          </tr>
        </thead>
        <tbody>
          {clientsPaginated.map((state: TradingState) => (
            <tr key={state.created}>
              <td data-label="created">{state.created}</td>
              <td data-label="activity">{state.activity}</td>
              <td data-label="baseAmount" className="text-right">
                {state.baseAmount}
              </td>
              <td data-label="quoteAmount" className="text-right">
                {state.quoteAmount}
              </td>
              <td data-label="tokenPriceSOL" className="text-right">
                {state.tokenPriceSOL}
              </td>
              <td data-label="tokenPriceUSD" className="text-right">
                {state.tokenPriceUSD}
              </td>
              <td data-label="trading">{state.trading}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 border-t border-gray-100 lg:px-6 dark:border-slate-800">
        <div className="flex flex-col items-center justify-between py-3 md:flex-row md:py-0">
          <Button
            // leftIcon={<ArrowLeftIcon />}
            small
            color={'lightDark'}
            label="Previous"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage == 0}
          />
          <Buttons>
            {pagesList.map((page, index) => {
              if (pagesList.length > 10) {
                if (index < 5 || index >= pagesList.length - 5) {
                  return (
                    <Button
                      key={page}
                      active={page === currentPage}
                      label={page + 1}
                      color={page === currentPage ? 'lightDark' : 'whiteDark'}
                      small
                      onClick={() => setCurrentPage(page)}
                    />
                  )
                } else if (index === 5 || index === pagesList.length - 5) {
                  return <span key={index}>...</span>
                }
              } else {
                return (
                  <Button
                    key={page}
                    active={page === currentPage}
                    label={page + 1}
                    color={page === currentPage ? 'lightDark' : 'whiteDark'}
                    small
                    onClick={() => setCurrentPage(page)}
                  />
                )
              }
              return null
            })}
          </Buttons>
          <Button
            small
            color={'lightDark'}
            label="Next"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(data.length / perPage)))
            }
            disabled={currentPage + 1 === Math.ceil(data.length / perPage)}
          />
          <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div>
    </>
  )
}

export default TableTrading
