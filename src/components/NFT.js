import React, { useState, useEffect, useRef } from 'react'
import css from "../styles/NFT.module.css"
import { Button, Modal } from 'react-bootstrap'
import { FaEthereum } from "react-icons/fa"
import { ethers } from 'ethers'
import abi from "../build/NFTSale.json"

function NFT(img) {

    const [isBought, setisBought] = useState(false)
    const [txSuccess, settxSuccess] = useState()
    const [selectedAcc, setselectedAcc] = useState()

    const contract = useRef()
    const signer = useRef()

    useEffect(() => {

        connectWallet()
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        contract.current = new ethers.Contract("0x284777D8f533D9d817DA702D613abaf669a692d1", abi.abi, provider)

        signer.current = contract.current.connect(provider.getSigner())
    }, [])


    async function connectWallet() {
        const selectedAccount = await window.ethereum.request({ method: "eth_requestAccounts" })
        setselectedAcc(selectedAccount[0])

    }



    async function handleBuy() {
        // setisBought(true)
        try {
            await signer.current.buy(1, { value: ethers.utils.parseEther("0.1") })
            setisBought(true)
            settxSuccess(true)
        }
        catch (e) {
            settxSuccess(false)
        }
    }
    return (
        <div className={css.NFT}>
            <Modal show={txSuccess === false}>
                <Modal.Header closeButton>Something went wrong</Modal.Header>
            </Modal>
            <header style={{ textAlign: "center" }}> {`Ape #${Math.floor(Math.random() * 10000)}`}</header>
            <img src={img.src} alt={"loading.."} style={{ height: "13rem" }} className={css.NFT} />
            {
                isBought ?
                    <div style={{ fontSize: "1.5rem", textAlign: "center", backgroundColor: "green" }}>Sold !</div> :
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: "30px", textAlign: "left" }}>
                            Price : {Math.floor(Math.random() * 10 + 1)} <FaEthereum style={{ fontSize: "1.5rem", textAlign: "center", marginBottom: "0.5rem" }} />
                        </span>
                        <Button style={{}} onClick={handleBuy}>Buy</Button>
                    </div>
            }
        </div>
    )
}

export default NFT