import React, { useState } from 'react'
import { Transaction } from '../../interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBoxModal from '../CardBox/Modal'

const TableTransactions = ({ data }) => {
  const perPage = 5

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

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  return (
    <>
      <CardBoxModal
        title="Sample modal"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>

      <CardBoxModal
        title="Please confirm"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>

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
          {clientsPaginated.map((tx: Transaction) => (
            <tr key={tx.created}>
              <td data-label="created">{tx.created}</td>
              <td data-label="activity">{tx.activity}</td>
              <td data-label="baseAmount">{tx.baseAmount}</td>
              <td data-label="quoteAmount">{tx.quoteAmount}</td>
              <td data-label="tokenPriceSOL">{tx.tokenPriceSOL}</td>
              <td data-label="tokenPriceUSD">{tx.tokenPriceUSD}</td>
              <td data-label="trading">{tx.trading}</td>
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
            {pagesList.map((page) => (
              <Button
                key={page}
                active={page === currentPage}
                label={page + 1}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
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

export default TableTransactions
