'use client'

import '../../Styles/globals.css'
import { useContractRead,useContractWrite,usePrepareContractWrite } from 'wagmi'
import {useEffect, useState, ChangeEvent } from "react";
import {chainlinkABI} from './contracts'






export function Swapper()
{



    const [swapRate,setSwapRate]=useState(0)


    const [amountToSwap,setAmountToSwap]=useState(0)
    const updateAmountToSwap = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value)>=0)
        {
             setAmountToSwap(Number(e.target.value));
        }
       
    };


    //get rate from chainlink for informative purpose only
    const getSwapRate = useContractRead(
        {
            address: '0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e',
            ...chainlinkABI,
            functionName:'latestAnswer',
            chainId : 5,
            enabled:true,
        })

        

        //Fetch the current rate Directly from the onChain oracle
        useEffect(()=>
        {
        getSwapRate.refetch
        setSwapRate(Number(getSwapRate.data)/100000000)
        console.log(getSwapRate.data)
    },[])




    function testt()
    {
        getSwapRate.refetch
        console.log(getSwapRate.data)
    }



    return(
        
<>
<div className="bg-indigo-950 mb-10">

  

<button onClick={testt}>TESTT</button>
<h1>{swapRate}</h1>
<h1>{amountToSwap}</h1>

<center>
<div className="m-3 w-80 h-300 border-white border-2 rounded-lg bg-violet-950">
    
    <div className='m-2'>
        <h1 className="underline m-2 block text-2xl font-medium text-white">Swapper</h1>
         </div>

    
    <div className='m-3'>
    <h1 className="m-1 block text-xs font-medium text-white">Enter Amount of BAP token to swap :</h1>
    <input onChange={updateAmountToSwap} value ={amountToSwap} placeholder='BadAppelToken amount' type="number" id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>

    <h1 className="m-1 text-xs font-medium text-white">You will receive approximately STC :</h1>
    <input value={String(amountToSwap*swapRate)} disabled={true} placeholder='StableCoan amount' type="number" id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
<br/>   

<h1 className=" text-xs font-medium  text-white">Expected Change Rate ATM is : 1BAP ≈ {swapRate} STC</h1>
<h1 className="m-1 text-xs font-medium  text-white">(Price rates are based on ETH/U$D live price)</h1>

<br/>
    <div className='flex flex-row-reverse'>
        <div className='border-white border-2 rounded bg-gray-500 hover:bg-gray-800'>
            <button className='m-1 text-white'>
                Swap Token
            </button>
        </div>
            
            &nbsp;
        <div className='border-white border-2 rounded bg-gray-500 hover:bg-gray-800'>
            <button className='m-1 text-white'>
                Allow ERC20
            </button>
        </div>

    </div>


</div>
</div>
</center>


</div>

</>
        
    )
}