import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import axios from 'axios';
import { useState } from 'react'
var fromKey : PublicKey;
const Swap = () => {
    const [amount,setAmount] = useState("");
  const [address, setAddress] = useState("");
  

  const sendSol = async ()=>{ 
    const connection = new Connection("https://api.devnet.solana.com");
    const instruction = SystemProgram.transfer({
      fromPubkey: fromKey,
      toPubkey: new PublicKey(address), 
      lamports: Number(amount)*LAMPORTS_PER_SOL,

    })


    const {blockhash} = await connection.getLatestBlockhash()
    const tx = new Transaction().add(instruction)  //THIS ADD STATEMENT IS INSTRUCTION
    tx.recentBlockhash = blockhash;
    tx.feePayer = fromKey

    const serializedTx = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false
    });

    

    const result = await axios.post("http://localhost:3000/api/v1/txn/sign",{
      serializedTx: serializedTx,
      signer: fromKey,
      blockhash: blockhash,
      retry: false,
    },{withCredentials:true})

    console.log(result.data)

  }
  return (
    <div>
        <div>
        <input type="text" placeholder='Amount' value={amount} onChange={(e)=>setAmount(e.target.value)} required={true}/>
        <input type="text" placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)} required={true}/>
        <button type="submit" onClick={sendSol} className='buttons'>Submit</button> 
      </div>
    </div>
  )
}

export default Swap