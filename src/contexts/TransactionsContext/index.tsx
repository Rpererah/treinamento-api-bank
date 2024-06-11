import { ReactNode, createContext, useEffect, useState } from "react";

interface Transaction{
    id:number;
    description:string;
    type:'income' | 'outcome';
    price:number;
    category:string;
    createAt:string

}

interface TransactionContextTypes{
transactions:Transaction[];
fetchTransactions:(query?:string)=>Promise<void>
}

export const TransactionContext=createContext({} as TransactionContextTypes);

interface TransactionProviderProps{
    children:ReactNode
}


export function TransactionProvider({children}:TransactionProviderProps){
    const [transactions,setTransaction]=useState<Transaction[]>([])
       
        //uma outra forma de fazer
        // fetch('http://localhost:3000/transactions')
        // .then(response=>response.json())
        // .then(data=>console.log(data))

    async function fetchTransactions(query?:string){
        const url = new URL('http://localhost:3000/transactions')
        if(query){
            url.searchParams.append('q',query)
        }
        const response=await fetch(url)
        const data=await response.json()
        setTransaction(data)
    }

    useEffect(()=>{
        fetchTransactions()

        

    },[])

    return(
        <TransactionContext.Provider value={{transactions,fetchTransactions}}>
            {children}
        </TransactionContext.Provider>
    )
}