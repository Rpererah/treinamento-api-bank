import { useMemo } from 'react'
import { TransactionContext } from '../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

export function useSummary() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions
  })

  const summary = useMemo(() => {
    return transactions.reduce(
      (acumulador, transaction) => {
        if (transaction.type === 'income') {
          acumulador.income += transaction.price
          acumulador.total += transaction.price
        } else {
          acumulador.outcome += transaction.price
          acumulador.total -= transaction.price
        }
        return acumulador
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactions])

  return summary
}
