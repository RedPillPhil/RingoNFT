import contract from '../contracts/bithuabi.json';
import { ethers } from 'ethers';
import { isMetaMaskInstalled, ethereum } from '../config';

const getContractAddress = (chainId) => {
  if (chainId === 46) {
    return "0x639FB36F2b8fA26F1176ebA36E34Ab38170d2b17";
  } else {
    return "0x3ac22795304a27edb04cfe2475dcef0c5c8b5539";
  }
}

export const mint = async (mint_amount) => {
    if (isMetaMaskInstalled()) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const chainId = Number(window.ethereum.chainId);
        const contractAddress = getContractAddress(chainId);
        const nftContract = new ethers.Contract(contractAddress, contract, signer);

        let mintPrice = 20000 * mint_amount;
        if (chainId === 46) {
        mintPrice = 2000 * mint_amount;}
        if (ethereum.selectedAddress.toLowerCase() === "0xa09b260809915da08f831a53da431aa3c1d03618") {
            mintPrice = 0;
        }

        let txnHash = await nftContract.mint(ethereum.selectedAddress, mint_amount, {
            gasLimit: "285000",
            value: ethers.utils.parseEther(mintPrice.toString())
        })
        return txnHash;
    }
}


export const totalMintCount = async () => {
    if(isMetaMaskInstalled()){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const chainId = Number(window.ethereum.chainId);
        const contractAddress = getContractAddress(chainId);
        const nftContract = new ethers.Contract(contractAddress, contract, signer);

        let totalMint = await nftContract.totalSupply();

        return totalMint;
    }
}

export const getNftBalance = async () => {
  if (!isMetaMaskInstalled()) {
    return 0;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const chainId = Number(window.ethereum.chainId);
  const contractAddress = getContractAddress(chainId);
  const nftContract = new ethers.Contract(contractAddress, contract, signer);

  const userAddress = await signer.getAddress();
  const balanceOf = await nftContract.balanceOf(userAddress);

  return balanceOf.toNumber();
};

export const getNftsByUser = async () => {
  if (!isMetaMaskInstalled()) {
    return 0;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const chainId = Number(window.ethereum.chainId);
  const contractAddress = getContractAddress(chainId);
  const nftContract = new ethers.Contract(contractAddress, contract, signer);

  const userAddress = await signer.getAddress();
  const ownedByUser = await nftContract.walletOfOwner(userAddress);

  return ownedByUser;
};

