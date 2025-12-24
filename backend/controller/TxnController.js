
import { Connection, Keypair, Transaction, VersionedTransaction } from "@solana/web3.js";
import { UserModel } from "../schema/UserSchema.js";
import bs58 from 'bs58'
const connection = new Connection("https://api.devnet.solana.com")

export const signTxn = async (req,res) =>{

    const {serializedTx,signer,blockhash,retry} = req.body;
    try {

        const tx = Transaction.from(Buffer.from(serializedTx))
        const user = await UserModel.findOne({publicKey:signer});

        

        var privateKey = user?.privateKey;
        privateKey = new Uint8Array(JSON.parse('[' + privateKey + ']'));
        console.log( privateKey );

        if(!user) return res.status(401).json({message:"user not found"});
        const keyPair = Keypair.fromSecretKey( privateKey );

        tx.recentBlockhash = blockhash;
        tx.feePayer = keyPair.publicKey;

        tx.sign(keyPair);
        const signature = await connection.sendTransaction(tx, [keyPair]);

        console.log(signature);
        return res.json(signature)

    } catch (error) {
        console.log(error)
        return;
    }
    

}