
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
import axios from "axios";


const CONTRACT_ADDRESS = "0xFbCfa71Edfa6a7C4145A11b5417C4bc571F6f851";
const nftStorateKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkzOTk5OTQ3N0UzRUVhYTdBMmVCNDc0MmNGRDI4Rjc4QjUxNzRhNDkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NzExMjE1ODcxOCwibmFtZSI6InRlc3QifQ.as0TbVmwnZP7H0XLOK_wpFARDUBT-7hEHJnP8pjKq8g"

const pinataAPIkey = "315080d889573d52d81f"
const pinataSecret = "9c0a50e90dfa23f69a706454e5cf6028847bc82e25de9eee4a919cb8ec09d911"
const pinataURL = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

export default function Poap() {
  const state = {
    button: 1,
  };
  const [txs, setTxs] = useState([]);
  const [contractListened, setContractListened] = useState();
  const [error, setError] = useState();
  const [contractInfo, setContractInfo] = useState({
    address: "-",
    tokenName: "-",
    tokenSymbol: "-",
    totalSupply: "-",
  });
  const [balanceInfo, setBalanceInfo] = useState({
    address: "-",
    balance: "-",
  });
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    client
      .query({
        query: gql`
          query {
            nftEntities {
              id
              contractAddress
              contractInitialOwner
              tokenName
              tokenSymbol
              limit
              mintAmount
              dynamic
            }
          }

        `,
      })
      .then((result) => {
        setTableData([...result.data.nftEntities]);
      });
  }, []);

  useEffect(() => {
    if (contractInfo.address !== "-") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const erc20 = new ethers.Contract(
        contractInfo.address,
        erc20abi,
        provider
      );

      erc20.on("Transfer", (from, to, amount, event) => {
        console.log({ from, to, amount, event });

        setTxs((currentTxs) => [
          ...currentTxs,
          {
            txHash: event.transactionHash,
            from,
            to,
            amount: String(amount),
          },
        ]);
      });
      setContractListened(erc20);

      return () => {
        contractListened.removeAllListeners();
      };
    }
  }, [contractInfo.address]);

  const setErrorHandler = (val) => {
      setError(
        ErrorMessage({
          message: val,
        })
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    
  };

  const handleMintNFT = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let file = data.get("FormFile")
    let filedata = file
    await console.log(filedata)
    const url = "https://api.nft.storage/upload";
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${nftStorateKey}`,
        Accept: "application/json",
        "Content-Type": "*/image",
      },
      body: filedata,
    };
    let fetchData = await fetch(url, options)
    let dataFetched = fetchData.json()
    let imageCID = await dataFetched.then((result)=>{
        return(result.value.cid)
    })
    let imageIPFS = "ipfs://" + imageCID
    console.log(imageIPFS)

    let coinbodyobj = {
        "name": data.get("nftname"),
        "image_url": imageIPFS,
        
      }

    let jsonData = await axios
    .post(pinataURL, coinbodyobj, {
        headers: {
            pinata_api_key: pinataAPIkey,
            pinata_secret_api_key: pinataSecret
        }
    })

    let jsonIPFS = "ipfs://" + jsonData.data.IpfsHash
    await console.log(data.get("mintID"))
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const contractObj = new ethers.Contract(CONTRACT_ADDRESS,factoryabi,signer);
    let bndata = await contractObj.getLatestPrice().then((response)=>{
      return(response);
    })
    await console.log("Hello")
    let fiveusd = BigNumber("50").multiply(BigNumber("100000000000000000000000000")).divide(BigNumber(bndata.toString()));
    let finalDol = BigNumber(fiveusd.toString()).add(BigNumber(1000000000))
    await console.log(finalDol.toString())
    // data.get("mintID")
    // let etherCalculation =  BigNumber("44000000000000000").multiply(data.get("mintID")).toString();
    // await console.log(etherCalculation,"asdasdda");
    // etherCalculation = etherCalculation
    await console.log(data.get("nftname"))
    await console.log(data.get("nftsymbol"))
    await console.log(data.get("nftlimit"))
    await console.log(data.get("nftamount"))
    let namount = await data.get("nftamount")
    await console.log(namount*(10**18))
    namount = BigNumber(namount*(10**18)).toString()
    await console.log("---",namount.toString())
    await console.log(data.get("baseURI"))
    await console.log(data.get("radio"))
    await console.log(finalDol)
    

    try {
      
      await contractObj.createStorage(data.get("nftname"),data.get("nftsymbol"),data.get("nftlimit"),namount,false,jsonIPFS,true,{ value: finalDol.toString() });
    } catch (error) {
      await console.log(error.message)
      // setErrorHandler(error.message)
      
    }
    
  };
  
  

  const handleSetSlotURI = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const contractObj = new ethers.Contract(CONTRACT_ADDRESS,factoryabi,signer);
    try {
      
      await contractObj.withdrawFees();
    } catch (error) {
      await console.log(error.message)
      // setErrorHandler(error.message)
      
    }
  };

  


  return (
    <>

<div id="app" class="sub-app-section wf-section">
    <div class="sub-app-wrapper-1">
      <h2 class="sub-h2">Deploy your NFT ERC-721 in minutes</h2>
      <div class="w-form">
        <form id="email-form" name="email-form" data-name="Email Form" method="get" class="form" onSubmit={handleMintNFT}>
          <div class="div-block">
            <div class="div-block-2">
              <label for="text" class="sub-form-label">Enter your NFT collection/ project name*</label>
              <input type="text" class="sub-input-field w-input nftname" maxlength="256" name="nftname" data-name="Name 2" placeholder="Eg. MY NFT Project" id="nftname" required=""></input>
              <label for="text" class="sub-form-label">Give your project a token name *</label>
              <input type="text" class="sub-input-field w-input nftsymbol" maxlength="256" name="nftsymbol" data-name="Email 2" placeholder="Eg: $MYNFT" id="nftsymbol" required=""></input>
              <label for="text" class="sub-form-label">Enter IPFS Base URI of your NFT collection/ project*</label>
              <input type="file" class="sub-input-field w-input baseURI" maxlength="256" name="FormFile" data-name="Email 2" placeholder="Eg: $MYNFT" id="FormFile" required=""></input>
              </div>
              <div class="div-block-3">
                <label for="field-4" class="sub-form-label">Enter your NFT supply*</label>
                <input type="text" class="sub-input-field w-input nftlimit" maxlength="256" name="nftlimit" data-name="Field 3" placeholder="Eg: 8888 or 10000" id="nftlimit" required=""></input>
                <label for="field-4" class="sub-form-label">Enter price of each NFT *</label>
                <input type="text" class="sub-input-field w-input nftamount" maxlength="256" name="nftamount" data-name="Field 2" placeholder="Eg: 0.1 ETH, 0.08 ETH" id="nftamount" required=""></input>
                
            </div>
          </div><input type="submit" value="DEPLOY CONTRACT" data-wait="Please wait..." class="submit-button w-button"></input>
        </form>
        <div class="w-form-done">
          <div>Thank you! Your submission has been received!</div>
        </div>
        <div class="w-form-fail">
          <div>Oops! Something went wrong while submitting the form.</div>
        </div>
      </div>
      <div class="div-block-8 mint"></div>
    </div>
  </div>
  <div id="app" class="sub-app-section withdraw-contract wf-section">
    <div class="sub-app-wrapper-1 withdraw-bloc">
      <div class="mint-grid">
        <div class="withdraw">
        <form onSubmit={handleSetSlotURI}>
          <h2 class="sub-h2 mint-heading-copy">Withdraw funds</h2>
          <div class="contract-info">You can withdraw your funds from below</div>
          <button class="mint w-inline-block">
            <div class="text-block">Withdraw funds</div>
          </button>
          </form>
        </div>
      </div>
      <div class="div-block-8 mint"></div>
    </div>
  </div>
  <div id="app" class="sub-recent wf-section">
    <div class="sub-app-wrapper-3">
      <h2 class="sub-h2">Recent Deployments</h2>
      <div id="w-node-_5c0edcd0-be75-3544-4a1a-61ea9d6c71eb-08db29d9" class="info-card">
        <TxList txs={tableData} />
      </div>
    </div>
  </div>

        

        {
          // tableData.map(function(element){
          //   return(

              
          //     )
          // })
        }


        {/* <Link to={{
    pathname: "/blogs/0xf481809a8f2e451bd7d7253ad8f7ec3c65b971c7",
    state: {
      fromText: "this is data",
    }
  }}>
            <h2>0xf481809a8f2e451bd7d7253ad8f7ec3c65b971c7</h2>
            <p>Written by 0xf481809a8f2e451bd7d7253ad8f7ec3c65b971c7</p>
          </Link> */}
    
      
    
    </>
  );
}
