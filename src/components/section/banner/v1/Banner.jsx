import { useModal } from "../../../../utils/ModalContext";
import Counter from "../../../../common/counter";
import Button from "../../../../common/button";
import BannerV1Wrapper from "./Banner.style";
import characterThumb from "../../../../assets/images/nft/ringobingoGIF.gif";
import mintLiveDownArrow from "../../../../assets/images/nft/mint_live_down_arrow.svg";
import mintLiveText from "../../../../assets/images/nft/mint_not_live_text.png";
import homeImageBG from "../../../../assets/images/nft/home_img_bg.png";
import { useEffect, useState } from "react";
import { totalMintCount } from '../../../../utils/web3mint';
import { isMetaMaskInstalled } from "../../../../config";

const Banner = () => {
  const { mintModalHandle, connectWalletModalHanlde, account, walletModalHandle, } = useModal();
  const [remaining, setRemaining] = useState(0);
    let count;
  if (window.ethereum) {
    count = <Counter end={remaining} duration={remaining} />;
  } else {
    count = "???";
  }
  let chainId;
  if (window.ethereum) {
    chainId = Number(window.ethereum.chainId);
  }
console.log(count);

function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

function openTelegramGroup() {
  window.open('https://t.me/RingoNFT', '_blank');
}

  useEffect(() =>{
    const calculateRemainingItems = async () => {
      let totaltMintedItems = await totalMintCount();
      console.log(totaltMintedItems);
      setRemaining(totaltMintedItems);
    }

    calculateRemainingItems();
  },[])
  return (
  <BannerV1Wrapper id="home">
  <div className="container">
    <div className="row">
      { /* Move right-side div to top for mobile devices */ }
      <div className="col-lg-6 order-lg-2 order-md-1">
        <div className="bithu_v1_baner_right">
          <div className="bithu_v1_baner_right_img_sect">
            <div className="mint_live_circle_sect">
              <div className="mint_live_circle">
                <span>
                  <img src={mintLiveDownArrow} alt="" />
                </span>
                <span className="mint_live_text rotated-style">
                  <img src={mintLiveText} alt="" />
                </span>
              </div>
            </div>
            <div className="bithu_v1_baner_right_img_bg">
              <img src={homeImageBG} alt="" />
            </div>
<div className={`bithu_v1_baner_right_img ${isMobileDevice() ? 'mobile mobile-img' : ''}`}>
  <img src={characterThumb} alt="avater" />
</div>


          </div>
        </div>
      </div>
      <div className="col-lg-6 order-lg-1 order-md-2">
        <div className="bithu_v1_baner_left">

<h2>Ringo Bingo 🐶 NFT collections</h2>
{isMetaMaskInstalled() && (
  <p style={{ color: chainId === 44 || chainId === 46 ? 'yellow' : 'inherit', fontStyle: 'italic', fontSize: '20px' }}>
    {chainId === 44 ? 'Crab Smart Chain' : chainId === 46 ? 'Darwinia Smart Chain' : ''}
  </p>
)}




    <h3>
      <span className="count">{count}</span> / 1000 Minted
    </h3>
          <div className="banner_buttons">
            {
              account ? 
              <Button lg variant="mint" onClick={() => mintModalHandle()}>
                {" "}
                Mint now
              </Button> :
              <Button lg variant="mint" onClick={() => walletModalHandle()}>
                {" "}
                Mint now
              </Button>
            }


    <Button lg variant="outline" onClick={openTelegramGroup}>
      Whitelist now
    </Button>

          </div>
          <div className="coin-info">
          <span>Max 1 NFTs per mint transaction.</span>
<span>
  <img src={require('../../../../assets/images/crab-parachain-button-mobile.8959b37e.png')} alt="CRAB" style={{ width: '30px', height: '30px', display: 'inline-block' }} />
  <span style={{ display: 'inline-block' }}> Price: <span className="highlighted">20,000 CRAB</span></span>
<div></div>
<span>
  <img src={require('../../../../assets/images/darwinia-button-mobile.9b80a5e7.png')} alt="RING" style={{ width: '30px', height: '30px', display: 'inline-block' }} />
  <span style={{ display: 'inline-block' }}> Price: <span className="highlighted">2,000 RING</span></span>
</span>
<div></div>

              MINT IS{" "}
              <span className="highlighted">LIVE</span>
                          </span>
            <span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</BannerV1Wrapper>

  );
};

export default Banner;
