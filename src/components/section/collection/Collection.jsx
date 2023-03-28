import { useState, useEffect, useMemo } from "react";
import CollectionStyleWrapper from "./Collection.style";
import { ethers } from "ethers";
import { isMetaMaskInstalled } from "../../../config";
import contract from "../../../contracts/bithuabi.json";
import { totalMintCount } from "../../../utils/web3mint";
import { getNftBalance, getNftsByUser } from "../../../utils/web3mint";
import Counter from "../../../common/counter";

const Collection = () => {
  const chainId = Number(window.ethereum.chainId);
  console.log("Chain ID:", chainId);
    const contractAddress = useMemo(() => {
    if (chainId === 46) {
      return "0x4dFc074698A1975a40df6F50971037013a596348";
    } else {
      return "0x3ac22795304a27edb04cfe2475dcef0c5c8b5539";
    }
  }, []);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  console.log("Using contract address:", contractAddress);
  const nftContract = new ethers.Contract(contractAddress, contract, signer);
  const [userAddress, setUserAddress] = useState("");
  const [remaining, setRemaining] = useState(0);
  const [nftIds, setNftIds] = useState([]);
  const [nftBalance, setNftBalance] = useState(0);

  useEffect(() => {
    const calculateRemainingItems = async () => {
      let totalMintedItems = await totalMintCount();
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
      setNftBalance(balance);
    };
    fetchNftBalance();
  }, [signer, nftContract]);

  useEffect(() => {
    const fetchNftsByUser = async () => {
      let nfts = await getNftsByUser(signer, nftContract);
      setNftIds(nfts);
    };
    fetchNftsByUser();
  }, [signer, nftContract]);

  return (
    <CollectionStyleWrapper>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontWeight: "bold", fontSize: "44px", color: "#FFFFFF" }}>
          Total Ringo's: <Counter end={nftBalance} duration={nftBalance} />
        </h2>
      </div>

      <div></div>

<div className="nft-container">
  {nftIds.length > 0 &&
    nftIds.map((tokenId) => (
      <img
        key={tokenId}
        src={
          chainId === 46
            ? `https://bafybeia5g6dg4ncpobc6rqaoaw5kk6gjk3wt56r7jehpkx3r4oxln6mlw4.ipfs.w3s.link/${tokenId}.png`
            : `https://bafybeianqc6hbhbjejh2dvww6bb2srbu37kyf5uuzs7ztflsfpiwkz5vha.ipfs.w3s.link/${tokenId}.png`
        }
        className="nft-image"
        alt={`NFT with id ${tokenId}`}
      />
    ))}
</div>

    </CollectionStyleWrapper>
  );
};

export default Collection;
