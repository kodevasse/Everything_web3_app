import { ethers } from "ethers";
import { ref } from "vue";
import { abi } from "../constants/index.js";
const WHITELIST_CONTRACT_ADDRESS = "0xF5b196435CA084F0BF9ceC1B2fdF44b21304574B";

export const useCryptoStoreTwo = () => {
  const setJoinedWhitelist = ref(false);
  const setNumberOfWhitelisted = ref(null);
  const loading = ref(false);

  //   const getProviderOrSigner = async (needSigner = false) => {
  //     // Connect to Metamask
  //     // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
  //     const provider = await web3ModalRef.current.connect();
  //     const web3Provider = new providers.Web3Provider(provider);

  //     // If user is not connected to the ropsten network, let them know and throw an error
  //     const { chainId } = await web3Provider.getNetwork();
  //     if (chainId !== 3) {
  //       window.alert("Change the network to ropsten");
  //       throw new Error("Change network to ropsten");
  //     }

  //     if (needSigner) {
  //       const signer = web3Provider.getSigner();
  //       return signer;
  //     }
  //     return web3Provider;
  //   };
  // Check if address is allready whitelisted
  const checkIfAddressInWhitelist = async () => {
    try {
      // We will need the signer later to get the user's address
      // Even though it is a read transaction, since Signers are just special kinds of Providers,
      // We can use it in it's place
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const whitelistContract = new ethers.Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      );
      // Get the address associated to the signer which is connected to  MetaMask
      const address = await signer.getAddress();
      // call the whitelistedAddresses from the contract
      const _joinedWhitelist = await whitelistContract.whitelistedAddresses(
        address
      );
      setJoinedWhitelist.value = _joinedWhitelist;
    } catch (err) {
      console.error(err);
    }
  };
  // Get number of whitelisted
  const getNumberOfWhitelisted = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // No need for the Signer here, as we are only reading state from the blockchain
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      // We connect to the Contract using a Provider, so we will only
      // have read-only access to the Contract
      const whitelistContract = new ethers.Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        provider
      );
      // call the numAddressesWhitelisted from the contract
      const _numberOfWhitelisted =
        await whitelistContract.numAddressesWhitelisted();
      setNumberOfWhitelisted.value = _numberOfWhitelisted;
    } catch (err) {
      console.error(err);
    }
  };
  // Sign up to whitelist
  const addAddressToWhitelist = async () => {
    console.log("setting loader for whitelist");
    setLoader(true);
    try {
      const { ethereum } = window;
      if (ethereum) {
        // create provider object from ethers library, using ethereum object injected by metamask
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const whitelistContract = new ethers.Contract(
          WHITELIST_CONTRACT_ADDRESS,
          abi,
          signer
        );
        // call the addAddressToWhitelist from the contract
        const tx = await whitelistContract.addAddressToWhitelist();
        setLoading(true);
        // wait for the transaction to get mined
        await tx.wait();
        setLoading(false);
        // get the updated number of addresses in the whitelist
        await getNumberOfWhitelisted();
        setJoinedWhitelist.value = true;
      }
    } catch (err) {
      console.error(err);
    }
  };
  const setLoader = (value) => {
    console.log("setloader");
    loading.value = value;
  };

  return {
    getNumberOfWhitelisted,
    addAddressToWhitelist,
    setJoinedWhitelist,
    setNumberOfWhitelisted,
    setLoader,
    loading,
    checkIfAddressInWhitelist,
  };
};
