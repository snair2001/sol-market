import React, { useState, useEffect, useRef } from 'react'
import css from "../styles/NFT.module.css"
import { Button, Modal, ModalFooter } from 'react-bootstrap'
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
        <div className={isBought ? css.sold : css.NFT}>
            <Modal show={txSuccess === false} onHide={() => {settxSuccess("")}}>

            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Something went wrong</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Cannot procees given instruction please refresh the page and try again
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => {settxSuccess("")}} variant="secondary">Close</Button>
                </Modal.Footer>
            </Modal.Dialog>
            </Modal>
            <header style={{ textAlign: "center" }}> {`Ape #${Math.floor(Math.random() * 10000)}`}</header>
            <img src={img.src} alt={"loading.."} style={{ height: "13rem" }} className={css.NFT} />
            {
                isBought ?
                    <div style={{ fontSize: "1.5rem", textAlign: "center", backgroundColor: "green" }}>Sold !</div> :
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: "1.3rem", textAlign: "left" }}>
                            Price : 0.1 <FaEthereum style={{ fontSize: "1rem", textAlign: "center", marginBottom: "0.5rem" }} />
                        </span>
                        <Button  onClick={handleBuy}>Buy</Button>
                    </div>
            }
        </div>
    )
}

export default NFT