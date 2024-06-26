import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import {
  PriceHighLight,
  TransactionTable,
  TransactionsContainer,
} from './styles'
import { TransactionContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { useContextSelector } from 'use-context-selector'

export function Transactions() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionTable>
          <tbody>
            {transactions.map((transactionItem) => (
              <tr key={transactionItem.id}>
                <td width="50%">{transactionItem.description}</td>
                <td>
                  <PriceHighLight variant={transactionItem.type}>
                    {transactionItem.type === 'outcome' && '- '}
                    {priceFormatter.format(transactionItem.price)}
                  </PriceHighLight>
                </td>
                <td>{transactionItem.category}</td>
                <td>
                  {dateFormatter.format(new Date(transactionItem.createAt))}
                </td>
              </tr>
            ))}
          </tbody>
        </TransactionTable>
      </TransactionsContainer>
    </div>
  )
}
