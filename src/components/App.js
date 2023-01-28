import "bootstrap/dist/css/bootstrap.min.css"
import NFT from "./NFT";
import css from "../styles/NFT.module.css"
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { clusterApiUrl, Connection, PublicKey, Keypair, LAMPORTS_PER_SOL, Transaction, SystemProgram, } from "@solana/web3.js"
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer, Account, getMint, getAccount, createMintToInstruction } from "@solana/spl-token"


let provider;
const NETWORK = clusterApiUrl("devnet");
const connection = new Connection(NETWORK);

window.Buffer = require("buffer").Buffer

function App() {

  const [activeAcc, setactiveAcc] = useState(null)
  let paths = []

  useEffect(() => {

    const getProvider = () => {
      if ('phantom' in window) {
        provider = window.phantom?.solana;
        console.log("found");
        return true
      } else {
        console.log("not found");
        return false
      }
    }

    const wallet = getProvider()

    if (!wallet) {
      setTimeout(() => {
        getProvider()
      }, 2000);
    }
  }, [])


  for (let i = 1; i <= 5; i++) {
    paths.push(require(`../images/${i}.png`))
  }

  async function buy() {

    try {
      const wallet = Keypair.generate()
      let connection = new Connection(clusterApiUrl("devnet"), "confirmed")

      const aidropsig = await connection.requestAirdrop(wallet.publicKey, LAMPORTS_PER_SOL / 2)

      await connection.confirmTransaction(aidropsig)

      let mint = await createMint(
        connection,
        wallet,
        wallet.publicKey,
        null,
        0
      );

      console.log("NFT Mint : " + mint.toBase58());

      let tokenAcc = await getOrCreateAssociatedTokenAccount(connection,
        wallet,
        mint,
        wallet.publicKey
      );

      console.log("Token acc : " + tokenAcc.address.toBase58());

      const sig = await mintTo(
        connection,
        wallet,
        new PublicKey(mint.toBase58()),
        new PublicKey(tokenAcc.address.toBase58()),
        wallet.publicKey,
        1
      )

      const tokens = await getAccount(connection, tokenAcc.address)
      console.log(tokens);

      const toTokenAcc = await getOrCreateAssociatedTokenAccount(connection, wallet, mint, new PublicKey(activeAcc))

      console.log("user token acc : " + toTokenAcc.address);

      const sendtokens = await transfer(
        connection,
        wallet,
        tokenAcc.address,
        toTokenAcc.address,
        wallet.publicKey,
        1
      )

      console.log("user send token sig : " + sendtokens);


      const usertokens = await getAccount(connection, toTokenAcc.address)
      console.log("user has : " + usertokens.amount);

      return true;

    } catch (e) {
      console.log(e);
    }
  }

  async function connectWallet() {
    try {
      const address = await provider.connect();
      setactiveAcc(address.publicKey)
    }
    catch (e) {
      console.log(e);
    }


  }

  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "space-between", }}>

        <h1 style={{ textAlign: "center", paddingTop: "1rem" }}>The NFT marketplace</h1>
        {
          activeAcc == null ?
            <Button style={{ margin: "1rem" }} onClick={connectWallet}>Connect Wallet</Button>
            :
            <div style={{ fontSize: "1rem", margin: "1rem", backgroundColor: "cyan", minHeight: "3rem", minWidth: "10rem", display: "flex", alignItems: "center", justifyContent: "center", color: "black" }}>
              <span>{activeAcc.toBase58().slice(0, 10) + "...."}</span>
            </div>
        }
      </div>
      <div className={css.wrapper}>
        {
          paths.map((img, i) => {
            return <NFT src={img} buy={buy} key={i} />
          })
        }
      </div>

    </div>
  );
}

export default App;
