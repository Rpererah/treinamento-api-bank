import { useContext } from "react"
import { TransactionContext } from "../contexts/TransactionsContext"

export function useSummary(){
    const { transactions } = useContext(TransactionContext)

    const summary = transactions.reduce(
        (acumulador,transaction) => {
            if(transaction.type === 'income'){
                acumulador.income+= transaction.price
                acumulador.total+=transaction.price
            }else{
                acumulador.outcome+=transaction.price
                acumulador.total-=transaction.price
            }
            return acumulador;
        },
        {
            income: 0,
            outcome: 0,
            total: 0
        }
    )

    return summary;
}