import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import erc20abi from "./ERC20abi.json";
import borgabi from "./Borg.json";
import factoryabi from "./Factoryabi.json";
import erc721abi from "./ERC721abi.json";
import { fromPromise, gql } from "@apollo/client";
import { client } from "./index";
import BigNumber from "big-number";
import styles from "./Styles.module.css";
import icon from "./assets/icon.png";
import ErrorMessage from "./ErrorMessage";


const BlogDetails = () => {
  const { id } = useParams();
  const location = useLocation()
  // const { from } = location.state
  const [tableData, setTableData] = useState([]);
  console.log(id)
  const stateButton = {
    button: 1,
  };
  const state = location.state.nftcontractdata  

  const handleMintNFT = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    await console.log("Nft contract : ",state.contractAddress)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const contractObj = new ethers.Contract(state.contractAddress,erc721abi,signer);
    try {
      
      await contractObj.mintNFT(data.get("nftid"),{ value: state.mintAmount });
    } catch (error) {
      await console.log(error.message)
      
    }
  };
  
  const handleUpdateNFT = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    await console.log("Nft contract : ",state.contractAddress)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const contractObj = new ethers.Contract(state.contractAddress,erc721abi,signer);
    try {
      
      await contractObj.setNewBaseURI(data.get("baseuri"));
    } catch (error) {
      await console.log(error.message)
      
    }
  };
  
  const handleWithdrawFee = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    await console.log("Nft contract : ",state.contractAddress)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const contractObj = new ethers.Contract(state.contractAddress,erc721abi,signer);
    
    try {
      
      await contractObj.withdrawFees();
    } catch (error) {
      await console.log(error.message)
      
    }
  };

  return (
    <div className="blog-details">
    <div id="app" class="sub-app-section mint-page wf-section">
    <div class="sub-app-wrapper-1 mint-block">
      <div class="mint-grid">
        <div class="div-block-7">
          <div class="mint-form w-form">
            <form id="email-form-2" name="email-form-2" data-name="Email Form 2" method="get" class="form-2" onSubmit={handleMintNFT}>
              <h2 class="sub-h2 mint-heading">Mint an NFT</h2>
              <div class="mint-input"><label for="name-2" class="sub-form-label">Enter your NFT collection/ project name*</label>
              <input type="text" class="sub-input-field w-input" maxlength="256" name="nftid" data-name="Name 2" placeholder="Eg. 2,3,4" id="name-2" required=""></input></div>
              <input type="submit" name="create bet" value="Mint NFT" data-wait="Please wait..." class="submit-button w-button"></input>
            </form>
            <div class="w-form-done">
              <div>Thank you! Your submission has been received!</div>
            </div>
            <div class="w-form-fail">
              <div>Oops! Something went wrong while submitting the form.</div>
            </div>
          </div>
        </div>
        <div class="div-block-7">
          <h2 class="sub-h2 mint-heading">Project Details</h2>
          <div class="info-card mint-pade">
          <p class="contract-info">
        {console.log(state)}
        Name : <strong> {state.tokenName}</strong><br></br>
        Symbol : <strong> {state.tokenSymbol}</strong><br></br>
        NFT Max Limit : <strong> {state.limit}</strong><br></br>
        Mint Price : <strong> {(Number(state.mintAmount)/(10**18)).toString()} ETH</strong><br></br>
        Dynamic NFT : <strong> {state.dynamic  ? "true" : "false"}</strong><br></br>
        Owner : <strong> {state.contractInitialOwner}</strong><br></br>
        
      </p>
          </div>
        </div>
      </div>
      <div class="div-block-8 mint"></div>
    </div>
  </div>
  <div id="app" class="sub-app-section withdraw-page wf-section">
    <div class="sub-app-wrapper-1 withdraw-bloc">
      <div class="mint-grid">
        <div class="withdraw">
          <h2 class="sub-h2 mint-heading-copy">Are you the project owner ?</h2>
          <div class="contract-info">You can withdraw your funds from below</div>
          <form onSubmit={handleWithdrawFee}>
          <button class="mint w-inline-block" name="create bet" value="create bet">
            <div class="text-block">Withdraw your funds</div></button>
            </form>
        </div>
      </div>
      <div class="div-block-8 mint"></div>
    </div>
  </div>
  <div id="app" class="sub-app-section withdraw-page wf-section">
    <div class="sub-app-wrapper-1 withdraw-bloc">
      <div class="mint-grid">
        <div class="withdraw">
          <h2 class="sub-h2 mint-heading-copy">Want To reveal NFT Art ?</h2>
          <div class="contract-info">You can update base URI to reveal ART here(only for owner)</div>
          <form onSubmit={handleUpdateNFT}>
          <input type="text" class="sub-input-field w-input" maxlength="256" name="baseuri" data-name="Name 2" placeholder="ipfs://..." id="name-2" required=""></input>
          <button class="mint w-inline-block" name="create bet" value="create bet">
            <div class="text-block">Update Base URI</div></button>
            </form>
        </div>
      </div>
      <div class="div-block-8 mint"></div>
    </div>
  </div>
  

    </div>
  );
}
 
export default BlogDetails;

// {
//   "__typename": "NftEntity",
//   "id": "0xc3c21b6eb023909df4323865a7d2b3afdbd5828d",
//   "contractAddress": "0xc3c21b6eb023909df4323865a7d2b3afdbd5828d",
//   "contractInitialOwner": "0x0a145677ed307ea97b8ea6e506add16a0f47f182",
//   "tokenName": "TtestNFT2",
//   "tokenSymbol": "TNFT2",
//   "limit": "40",
//   "mintAmount": "30",
//   "dynamic": false
// }