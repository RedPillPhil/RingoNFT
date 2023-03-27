import { useState, useEffect } from "react";
import CollectionStyleWrapper from "./Collection.style";
import { ethers } from "ethers";
import { isMetaMaskInstalled } from "../../../config";
import contract from "../../../contracts/bithuabi.json";
import { totalMintCount } from "../../../utils/web3mint";
import { getNftBalance, getNftsByUser } from "../../../utils/web3mint";
import Counter from "../../../common/counter";

const Collection = () => {
  const contractAddress = "0x3ac22795304a27edb04cfe2475dcef0c5c8b5539";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const nftContract = new ethers.Contract(contractAddress, contract, signer);
  const [userAddress, setUserAddress] = useState("");
  const [remaining, setRemaining] = useState(0);
  const [nftIds, setNftIds] = useState([]);
  const [nftBalance, setNftBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculateRemainingItems = async () => {
      let totalMintedItems = await totalMintCount();
      console.log(totalMintedItems);
      setRemaining(totalMintedItems);
    };

    calculateRemainingItems();
  }, []);

  useEffect(() => {
    const fetchUserAddress = async () => {
      if (!isMetaMaskInstalled()) {
        return;
      }

      const address = await signer.getAddress();
      setUserAddress(address);
    };

    fetchUserAddress();
  }, [signer]);

  useEffect(() => {
    const fetchNftBalance = async () => {
      let balance = await getNftBalance(signer, nftContract);
      console.log(balance);
      setNftBalance(balance);
    };

    fetchNftBalance();
  }, [signer, nftContract]);

  useEffect(() => {
    const fetchNftsByUser = async () => {
      let nfts = await getNftsByUser(signer, nftContract);
      console.log(nfts);
      setNftIds(nfts);
    };

    fetchNftsByUser();
  }, [signer, nftContract]);

return (
<CollectionStyleWrapper>
<div style={{marginBottom: '20px'}}>
  <h2 style={{fontWeight: 'bold', fontSize: '44px', color: '#FFFFFF'}}>
    Total Ringo's: <Counter end={nftBalance} duration={nftBalance} />
  </h2>
</div>

<div></div>

  <div className="nft-container">
    {nftIds.length > 0 && nftIds.map((tokenId) => (
      <img
        key={tokenId}
        src={`https://bafybeianqc6hbhbjejh2dvww6bb2srbu37kyf5uuzs7ztflsfpiwkz5vha.ipfs.w3s.link/${tokenId}.png`}
        className="nft-image"
      />
    ))}
  </div>
</CollectionStyleWrapper>
);

};

export default Collection;
