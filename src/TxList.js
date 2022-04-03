
import { Link } from 'react-router-dom';
import BigNumber from "big-number";

export default function TxList({ txs }) {
  if (txs.length === 0) return null;
  return (
    <>
      {txs
        .map((item, idx) => (

          <div key={idx} class="info-card"><div id="w-node-_5f9e2abd-4801-26ba-696e-77b214c9096f-08db29d9">
          <p class="contract-info">Contract Address: {item.contractAddress}</p>
          <p class="contract-info">Project Owner: {item.contractInitialOwner}</p>
          <p class="contract-info">NFT Name: {item.tokenName}</p>
          <p class="contract-info">NFT Ticker: {item.tokenSymbol}</p>
          <p class="contract-info">Total Supply: {item.limit}</p>
          <p class="contract-info">Mint Amount: {(Number(item.mintAmount)/(10**18)).toString()} ETH</p>
          {/* <p class="contract-info">Mint Amount: {BigNumber(item.mintAmount).toString()}</p> */}
          <p class="contract-info">Preveal Feature: {item.dynamic ? "true" : "false"}</p>
          <Link variant="body2" class="mint w-inline-block"
              to={{
                pathname: `/blogs/${item.id}`,
                state: {
                  nftcontractdata: item,
                }}}
                >
            <div class="text-block">Mint NFTs from this Project</div>
            </Link></div>
        </div>
          
        ))}
    </>
  );
}
