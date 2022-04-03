
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import erc20abi from "./ERC20abi.json";
import erc721abi from "./ERC721abi.json";
import borgabi from "./Borg.json";
import factoryabi from "./Factoryabi.json";
import { gql } from "@apollo/client";
import { client } from "./index";
import BigNumber from "big-number";
import styles from "./styles.css";
import icon from "./assets/icon.png";
import { Link } from 'react-router-dom';
import ErrorMessage from "./ErrorMessage";
import TxList2 from "./TxList2";


const CONTRACT_ADDRESS = "0xFbCfa71Edfa6a7C4145A11b5417C4bc571F6f851";

export default function Lock() {
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
  let totalVote2 = 0
  let totalVote = 0

  useEffect(() => {
    client
      .query({
        query: gql`
          query {
            userEntities{
    id
    userAddress
    votingPower
  }

          }

        `,
      })
      .then((result) => {
        setTableData([...result.data.userEntities]);
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

  const handleLocktNFT = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    await console.log(data.get("mintID"))
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const contractObj = new ethers.Contract(CONTRACT_ADDRESS,factoryabi,signer);
    const erc721ObjL = new ethers.Contract(data.get("nftaddress"),erc721abi,signer)
    
    // data.get("mintID")
    // let etherCalculation =  BigNumber("44000000000000000").multiply(data.get("mintID")).toString();
    // await console.log(etherCalculation,"asdasdda");
    // etherCalculation = etherCalculation
    await console.log(data.get("nftaddress"))
    await console.log(data.get("tokenid"))

    

    try {
      if(state.button==1){
          await console.log("Approve Clicked")
          await erc721ObjL.approve(CONTRACT_ADDRESS,data.get("tokenid"));
      }else{
        await console.log("Lock Clicked")
          await contractObj.lockNFT(data.get("nftaddress"),data.get("tokenid"));
    }
    } catch (error) {
      await console.log(error.data.message)
      // setErrorHandler(error.message)
      
    }
    
  };
  
  

  const handleUnLocktNFT = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    await console.log(data.get("mintID"))
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const contractObj = new ethers.Contract(CONTRACT_ADDRESS,factoryabi,signer);
    const erc721ObjL = new ethers.Contract(data.get("nftaddress"),erc721abi,signer)
    
    // data.get("mintID")
    // let etherCalculation =  BigNumber("44000000000000000").multiply(data.get("mintID")).toString();
    // await console.log(etherCalculation,"asdasdda");
    // etherCalculation = etherCalculation
    await console.log(data.get("nftaddress"))
    await console.log(data.get("tokenid"))

    

    try {
      
        await console.log("Lock Clicked")
          await contractObj.unlockNFT(data.get("nftaddress"),data.get("tokenid"));
    
    } catch (error) {
      await console.log(error.message)
      // setErrorHandler(error.message)
      
    }
  };

  function chunkArray(arr,n){
    var chunkLength = Math.max(arr.length/n ,1);
    var chunks = [];
    for (var i = 0; i < n; i++) {
        if(chunkLength*(i+1)<=arr.length)chunks.push(arr.slice(chunkLength*i, chunkLength*(i+1)));
    }
    return chunks; 
}


  return (
    <>

<div id="app" class="sub-app-section wf-section">
    <div class="sub-app-wrapper-1">
      <div class="w-form">
        <form id="email-form" name="email-form" data-name="Email Form" method="get" class="form" onSubmit={handleLocktNFT}>
          <div class="div-block">
            <div class="lock-div">
            <h2 class="sub-h2">Lock your NFT for voting power</h2>
              <label for="text" class="sub-form-label">Enter your NFT address *</label>
              <input type="text" class="sub-input-field w-input nftname" maxlength="256" name="nftaddress" data-name="Name 2" placeholder="NFT Address" id="nftaddress" required=""></input>
              <label for="text" class="sub-form-label">Enter Token ID of your NFT *</label>
              <input type="text" class="sub-input-field w-input nftsymbol" maxlength="256" name="tokenid" data-name="Email 2" placeholder="TokenID of NFT" id="tokenid" required=""></input>
              
            </div>
          </div>
          <div class="submit-btn-flex">
          <input type="submit" onClick={() => (state.button = 1)} value="APPROVE" data-wait="Please wait..." class="submit-button w-button lock"></input>
          <br></br>
          <input type="submit" onClick={() => (state.button = 2)} value="LOCK NFT" data-wait="Please wait..." class="submit-button w-button lock"></input>
        </div></form>
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
        <form id="email-form" name="email-form" data-name="Email Form" method="get" class="form" onSubmit={handleUnLocktNFT}>

          <div class="div-block">
          <div class="lock-div">
            <h2 class="sub-h2">Unlock Your NFT</h2>
              <label for="text" class="sub-form-label">Enter your NFT address *</label>
              <input type="text" class="sub-input-field w-input nftname" maxlength="256" name="nftaddress" data-name="Name 2" placeholder="NFT Address" id="nftaddress" required=""></input>
              <label for="text" class="sub-form-label">Enter Token ID of your NFT *</label>
              <input type="text" class="sub-input-field w-input nftsymbol" maxlength="256" name="tokenid" data-name="Email 2" placeholder="TokenID of NFT" id="tokenid" required=""></input>
              <input type="submit" onClick={() => (state.button = 2)} value="UNLOCK NFT" data-wait="Please wait..." class="submit-button w-button"></input>

            </div>
          </div>
        </form>
        </div>
      </div>
      <div class="div-block-8 mint"></div>
    </div>
  </div>

  <div id="app" class="sub-recent wf-section">
    <div class="sub-app-wrapper-3">
      <h2 class="sub-h2">Voting Powers</h2>
      <div class="w-layout-grid grid">
        <div id="w-node-_5c0edcd0-be75-3544-4a1a-61ea9d6c71eb-08db29d9" class="info-card-main">
        {console.log(tableData)}
        <TxList2 txs={chunkArray(tableData,[2])[1]} />
       
        </div>
        
        <div id="w-node-_5f9e2abd-4801-26ba-696e-77b214c9096f-08db29d9" class="info-card-main">
        {console.log(tableData)}
        <TxList2 txs={chunkArray(tableData,[2])[0]} />
        {
          tableData.forEach(element => {
            totalVote = BigNumber(totalVote).plus(BigNumber(element["votingPower"])).toString()
            
          })
        }
        
        </div>
        <h2 class="alt-h3">Total Voting Power : {(Number(totalVote)/(10**18)).toString()}</h2>
        
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
