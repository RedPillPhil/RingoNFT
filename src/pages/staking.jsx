import { useModal } from "../utils/ModalContext";
import GlobalStyles from "../assets/styles/GlobalStyles";
import Layout from "../common/layout";
import Header from "../components/section/header/v1";
import MetamaskModal from "../common/modal/metamaskModal/MetamaskModal";
import Staking from "../components/section/mint/v2";
import MintNowModal from "../common/modal/mintNowModal";
import WalletModal from "../common/modal/walletModal/WalletModal";

const StakingPage = () => {
  const { visibility, metamaskModal, walletModalvisibility } = useModal();

  return (
    <>
      <Layout>
        <GlobalStyles />
        {metamaskModal && <MetamaskModal />}
        {visibility && <MintNowModal />}
        {walletModalvisibility && <WalletModal />}
        <Header />
        <Staking />

      </Layout>
    </>
  );
};

export default StakingPage;
