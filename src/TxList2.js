
import { Link } from 'react-router-dom';
import BigNumber from "big-number";

export default function TxList2({ txs }) {
  if (txs === undefined || txs.length === 0) return null;
  return (
    <>
      {txs
        .map((item, idx) => (

          <div key={idx} class="info-card"><div id="w-node-_5f9e2abd-4801-26ba-696e-77b214c9096f-08db29d9">
          <p class="contract-info">User Address: {item.userAddress}</p>
          <p class="contract-info">Voting Powers: {(Number(item.votingPower)/(10**18)).toString()} YaETH</p>
          
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
