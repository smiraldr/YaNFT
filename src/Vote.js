
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
import TxList3 from "./TxList3";


const CONTRACT_ADDRESS = "0xFbCfa71Edfa6a7C4145A11b5417C4bc571F6f851";

export default function Vote() {
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
  let totalVote = 0;
  useEffect(() => {
    client
      .query({
        query: gql`
          query {
            proposalEntities {
    id
    proposalID
    fundAddress
    fundAmount
    proposalStatus
    voteCount
  }


          }

        `,
      })
      .then((result) => {
        setTableData([...result.data.proposalEntities]);
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

  const handleAddProposal = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    await console.log(data.get("mintID"))
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const contractObj = new ethers.Contract(CONTRACT_ADDRESS,factoryabi,signer);
    
    // data.get("mintID")
    // let etherCalculation =  BigNumber("44000000000000000").multiply(data.get("mintID")).toString();
    // await console.log(etherCalculation,"asdasdda");
    // etherCalculation = etherCalculation
    await console.log(data.get("projaddress"))
    await console.log(data.get("projamount"))
    let projamount = BigNumber(data.get("projamount")*(10**18)).toString()
    

    try {
      
        await console.log("Proposal add Clicked")
          await contractObj.addProposal(data.get("projaddress"),projamount);
    
    } catch (error) {
      await console.log(error.message)
      // setErrorHandler(error.message)
      
    }
    
  };
  
  

  const handlePropVote = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    await console.log(data.get("mintID"))
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const contractObj = new ethers.Contract(CONTRACT_ADDRESS,factoryabi,signer);
    
    // data.get("mintID")
    // let etherCalculation =  BigNumber("44000000000000000").multiply(data.get("mintID")).toString();
    // await console.log(etherCalculation,"asdasdda");
    // etherCalculation = etherCalculation
    await console.log(data.get("propvote"))
    

    try {
      
        await console.log("Proposal vote Clicked")
          await contractObj.vote(data.get("propvote"));
    
    } catch (error) {
      await console.log(error.message)
      // setErrorHandler(error.message)
      
    }
  };


  const handleExecuteVote = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    await console.log(data.get("mintID"))
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();

    const contractObj = new ethers.Contract(CONTRACT_ADDRESS,factoryabi,signer);
    
    // data.get("mintID")
    // let etherCalculation =  BigNumber("44000000000000000").multiply(data.get("mintID")).toString();
    // await console.log(etherCalculation,"asdasdda");
    // etherCalculation = etherCalculation
    await console.log(data.get("propvote"))
    

    try {
      
        await console.log("Proposal vote Clicked")
          await contractObj.executeVote(data.get("propvote"));
    
    } catch (error) {
      await console.log(error.message)
      // setErrorHandler(error.message)
      
    }
  };
  


  return (
    <>

<div id="app" class="sub-app-section wf-section">
    <div class="sub-app-wrapper-1">
      <h2 class="sub-h2">Fund another project</h2>
      <div class="w-form">
        <form id="email-form" name="email-form" data-name="Email Form" method="get" class="form" onSubmit={handleAddProposal}>
          <div class="div-block">
            <div class="div-block-2">
              <label for="text" class="sub-form-label">Project to be funded</label>
              <input type="text" class="sub-input-field w-input nftname" maxlength="256" name="projaddress" data-name="Name 2" placeholder="NFT Address" id="projaddress" required=""></input>
              <label for="text" class="sub-form-label">Amount to be funded</label>
              <input type="text" class="sub-input-field w-input nftsymbol" maxlength="256" name="projamount" data-name="Email 2" placeholder="TokenID of NFT" id="projamount" required=""></input>
              
            </div>
            
          </div>
          
          <input type="submit" onClick={() => (state.button = 2)} value="ADD PROPOSAL" data-wait="Please wait..." class="submit-button w-button"></input>
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
  <div class="sub-app-wrapper-1">
      <h2 class="sub-h2">Vote on Proposal</h2>
      <div class="w-form">
        <form id="email-form" name="email-form" data-name="Email Form" method="get" class="form" onSubmit={handlePropVote}>
          <div class="div-block">
            <div class="div-block-2">
              <label for="text" class="sub-form-label">Project ID to vote</label>
              <input type="text" class="sub-input-field w-input nftname" maxlength="256" name="propvote" data-name="Name 2" placeholder="NFT Address" id="propvote" required=""></input>
             
              
            </div>
            
          </div>
          
          <input type="submit" onClick={() => (state.button = 2)} value="VOTE PROPOSAL" data-wait="Please wait..." class="submit-button w-button"></input>
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
  <div id="app" class="sub-app-section wf-section">
  <div class="sub-app-wrapper-1">
      <h2 class="sub-h2">Execute Proposal(only for owner)</h2>
      <div class="w-form">
        <form id="email-form" name="email-form" data-name="Email Form" method="get" class="form" onSubmit={handleExecuteVote}>
          <div class="div-block">
            <div class="div-block-2">
              <label for="text" class="sub-form-label">Project ID to execute</label>
              <input type="text" class="sub-input-field w-input nftname" maxlength="256" name="propvote" data-name="Name 2" placeholder="NFT Address" id="propvote" required=""></input>
             
              
            </div>
            
          </div>
          
          <input type="submit" onClick={() => (state.button = 2)} value="EXECUTE PROPOSAL" data-wait="Please wait..." class="submit-button w-button"></input>
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
  <div id="app" class="sub-recent wf-section">
    <div class="sub-app-wrapper-3">
      <h2 class="sub-h2">Voting Power</h2>
      <div id="w-node-_5c0edcd0-be75-3544-4a1a-61ea9d6c71eb-08db29d9" class="info-card">
        {console.log(tableData)}
        <TxList3 txs={tableData} />
        
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
