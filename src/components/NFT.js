import React, { useState } from 'react'
import css from "../styles/NFT.module.css"
import { Button } from 'react-bootstrap'
import { FaEthereum } from "react-icons/fa"

function NFT(img) {

    const [isBought, setisBought] = useState(false)

    function handleBuy() {
        setisBought(true)
    }
    return (
        <div className={css.NFT}>
            <header style={{ textAlign: "center" }}> {`Ape #${Math.floor(Math.random() * 10000)}`}</header>
            <img src={img.src} alt={"loading.."} style={{ height: "13rem" }} className={css.NFT} />
            {
                isBought ?
                    <div style={{ fontSize: "1.5rem", textAlign: "center", backgroundColor: "green" }}>Sold !</div> :
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: "30px", textAlign: "left" }}>
                            Price : {Math.floor(Math.random() * 10 + 1)} <FaEthereum style={{ fontSize: "1.5rem", textAlign: "center", marginBottom: "0.5rem" }} />
                        </span>
                        <Button onClick={handleBuy}>Buy</Button>
                    </div>
            }
        </div>
    )
}

export default NFT