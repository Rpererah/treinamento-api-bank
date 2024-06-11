import { ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../../lib/axios'
import { createContext } from 'use-context-selector'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createAt: string
}
interface TransactionProviderProps {
  children: ReactNode
}

interface CreateTransactionInput {
  description: string
  category: string
  price: number
  type: 'income' | 'outcome'
}

interface TransactionContextTypes {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

export const TransactionContext = createContext({} as TransactionContextTypes)

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransaction] = useState<Transaction[]>([])

  // uma outra forma de fazer
  // fetch('http://localhost:3000/transactions')
  // .then(response=>response.json())
  // .then(data=>console.log(data))

  // outra forma com fetchAPI
  // const url = new URL('http://localhost:3000/transactions')
  // if(query){
  //     url.searchParams.append('q',query)
  // }
  // const response=await fetch(url)
  // const data=await response.json()

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransaction(response.data)
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { category, description, price, type } = data
      const response = await api.post('/transactions', {
        category,
        description,
        price,
        type,
        createAt: new Date(),
      })
      setTransaction((state) => [...state, response.data])
    },
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
