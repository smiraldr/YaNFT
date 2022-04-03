
import { Link } from 'react-router-dom';
import BigNumber from "big-number";

export default function TxList3({ txs }) {
  if (txs.length === 0) return null;
  return (
    <>
      {txs
        .map((item, idx) => (

          <div key={idx} class="info-card"><div id="w-node-_5f9e2abd-4801-26ba-696e-77b214c9096f-08db29d9">
          <p class="contract-info">Proposal ID: {item.proposalID}</p>
          <p class="contract-info">Fund Address: {item.fundAddress}</p>
          <p class="contract-info">Fund Amount: {(Number(item.fundAmount)/(10**18)).toString()} ETH</p>
          <p class="contract-info">Proposal Status: {item.proposalStatus}</p>
          {console.log(item.voteCount)}
          <p class="contract-info">Vote Count: {(Number(item.voteCount)/(10**18)).toString()} Veth</p>
          
          </div>
        </div>
          
        ))}
    </>
  );
}
