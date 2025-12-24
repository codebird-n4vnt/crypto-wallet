import React, { useEffect, useState } from 'react'
import { CiUser } from "react-icons/ci";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdCopy } from "react-icons/io";
import { PublicKey } from '@solana/web3.js';
import axios from 'axios';
var fromKey : PublicKey;
const Sidebar:React.FC = () => {
  const [myAddress, setMyAddress] = useState("");
  const fetchMyAddress = async()=>{
    const response = await axios.get("http://localhost:3000/api/v1/check", {withCredentials:true});
    const userPublicKey = response?.data?.user?.publicKey;
    console.log(userPublicKey)

    setMyAddress(userPublicKey);
    fromKey = new PublicKey(userPublicKey)
    
  }
  useEffect(()=>{
    fetchMyAddress();
  },[])
  return (
    <div className='flex flex-col h-screen pl-5 pt-4 pr-3 fixed top-0 left-0 bg-sec font-exo'>
        <div className=''>
          <span className='sidebar-items'><i className="bg-ter w-12 h-12 flex items-center justify-center rounded-3xl"><CiUser className='h-7 w-7'/></i> </span> 

        <span  className='absolute flex justify-center items-center top-8 left-18 bg-pri px-2 rounded-md '>
        <span className='mx-2 text-quar text-xs cursor-default drop-shadow-2xl'>{myAddress}hoiuoiuf2q8hoq2dj1008jkndqo</span>
        <button onClick={()=>{navigator.clipboard.writeText(myAddress);window.alert('Copy successful')}} className=' text-[#bac860d9] py-1.5 px-2 m-0.5 rounded-lg'><IoMdCopy /></button></span>
        </div>
        <div className=''><span className='sidebar-items'>
          <i className='bg-ter w-12 h-12 flex items-center justify-center rounded-3xl'><MdOutlineAccountBalanceWallet className='h-7 w-7'/></i>
          </span>
            <span  className=' flex justify-center items-center top-8 left-18 bg-pri px-2 rounded-md '><span className='mx-2 text-quar text-xs cursor-default drop-shadow-2xl'>{myAddress}go to</span>
          </span>
        </div>
        <div className=''><span className='sidebar-items'><i className='bg-ter w-12 h-12 flex items-center justify-center rounded-3xl'><IoSettingsOutline className='h-7 w-7'/></i></span></div>
        
    </div>
  )
}



export default Sidebar