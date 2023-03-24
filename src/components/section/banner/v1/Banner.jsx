import { useModal } from "../../../../utils/ModalContext";
import Counter from "../../../../common/counter";
import Button from "../../../../common/button";
import BannerV1Wrapper from "./Banner.style";

import characterThumb from "../../../../assets/images/nft/ringobingoGIF.gif";
import mintLiveDownArrow from "../../../../assets/images/nft/mint_live_down_arrow.svg";
import mintLiveText from "../../../../assets/images/nft/mint_live_text.png";
import homeImageBG from "../../../../assets/images/nft/home_img_bg.png";
import { useEffect, useState } from "react";
import { totalMintCount } from '../../../../utils/web3mint';

const Banner = () => {
  const { mintModalHandle, connectWalletModalHanlde, account } = useModal();
  const [remaining, setRemaining] = useState(0);

function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

function openTelegramGroup() {
  window.open('https://t.me/your_telegram_group', '_blank');
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
          <h3>
            <span className="count">
              <Counter end={remaining} duration={remaining} />
            </span>{" "}
            / 1000 Minted
          </h3>
          <div className="banner_buttons">
            {
              account ? 
              <Button lg variant="mint" onClick={() => mintModalHandle()}>
                {" "}
                Mint now
              </Button> :
              <Button lg variant="mint" onClick={() => connectWalletModalHanlde()}>
                {" "}
                Mint now
              </Button>
            }


    <Button lg variant="outline" onClick={openTelegramGroup}>
      Whitelist now
    </Button>

          </div>
          <div className="coin-info">
            <span>Max 1 NFTs per mint transaction. Price<span className="highlighted"> 20,000 CRAB</span></span>
            <span>
              MINT IS{" "}
              <span className="highlighted">LIVE</span>
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
