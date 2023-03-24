import contract from '../contracts/bithuabi.json';
import { ethers } from 'ethers';
import { isMetaMaskInstalled, ethereum } from '../config';



export const mint = async (mint_amount) => {
    if (isMetaMaskInstalled()) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contractAddress = "0x3aC22795304A27edb04Cfe2475DCEf0c5C8B5539";
        const nftContract = new ethers.Contract(contractAddress, contract, signer);

        let mintPrice = 20000 * mint_amount;
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
        const contractAddress = "0x3aC22795304A27edb04Cfe2475DCEf0c5C8B5539";
        const nftContract = new ethers.Contract(contractAddress, contract, signer);

        let totalMint = await nftContract.totalSupply();

        return totalMint;
    }
}
