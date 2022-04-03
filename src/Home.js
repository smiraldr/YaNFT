
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import erc20abi from "./ERC20abi.json";
import borgabi from "./Borg.json";
import factoryabi from "./Factoryabi.json";
import { gql } from "@apollo/client";
import { client } from "./index";
import BigNumber from "big-number";
import styles from "./styles.css";
import icon from "./assets/icon.png";
import { Link } from 'react-router-dom';
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";


export default function Home() {
  
  return (
    <>
  <div id="home" class="sub-section wf-section">
    <div class="sub-wrapper-1">
      <h1 class="sub-h1">Deploy <span class="sub-h1-gradient">no-code, low-gas </span>NFT ERC-721 smart contract</h1>
    </div>
    <div class="sub-wrapper-2">
      <div class="sub-wrapper-content">
        <div class="sub-body-wrapper">
          <div class="sub-body-copy">YaNFT will empower web3 creators to have a concrete on-chain foundation with true creative ownership of their art &amp; smart contracts. All this with the lowest gas fees to mint their own contracts.</div>
        </div>
        <div class="sub-cta-wrapper">
        <Link class="deploy-link"variant="body2"
              to={{
                pathname: `/deploy`
              }}
                >
          <a href="create.html" class="sub-cta w-inline-block">
            <div class="sub-cta-text">LAUNCH APP</div><img src="public/Next.svg" loading="lazy" alt="" class="sub-next-btn"></img>
          </a></Link>
        </div>
      </div>
      <div class="sub-footer">
        <div class="sub-footer-text">Developed by team<span class="text-span-2"> @NFTKnights</span></div>
      </div>
    </div>
  </div>
    </>
  );
}
