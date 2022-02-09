import { ethers } from "ethers";
import { ref } from "vue";
import { abi_nft } from "../constants/index.js";
const WHITELIST_CONTRACT_ADDRESS = "0xB2fc3759e0943f0b17Ca4d4c33296206C5488538";

export const useCryptoStoreTwo = () => {
  const setJoinedWhitelist = ref(false);
  const setNumberOfWhitelisted = ref(null);
  const loading = ref(false);

  /**
   * publicMint: Mint an NFT after the presale
   */
  const publicMint = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const whitelistContract = new ethers.Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi_nft,
        signer
      );
      const tx = await whitelistContract.mint({
        // value signifies the cost of one crypto dev which is "0.01" eth.
        // We are parsing `0.01` string to ether using the utils library from ethers.js
        value: utils.parseEther("0.01"),
      });
      setLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);
      window.alert("You successfully minted a Crypto Dev!");
    } catch (err) {
      console.error(err);
    }
  };
  /**
   * presaleMint: Mint an NFT during the presale
   */
  const presaleMint = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const whitelistContract = new ethers.Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi_nft,
        signer
      );
      // update methods
      const whitelistContract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        abi_nft,
        signer
      );
      // call the presaleMint from the contract, only whitelisted addresses would be able to mint
      const tx = await whitelistContract.presaleMint({
        // value signifies the cost of one crypto dev which is "0.01" eth.
        // We are parsing `0.01` string to ether using the utils library from ethers.js
        value: utils.parseEther("0.01"),
      });
      setLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);
      window.alert("You successfully minted a Crypto Dev!");
    } catch (err) {
      console.error(err);
    }
  };
  /**
   * startPresale: starts the presale for the NFT Collection
   */
  const startPresale = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const whitelistContract = new ethers.Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi_nft,
        signer
      );
      // call the startPresale from the contract
      const tx = await whitelistContract.startPresale();
      setLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);
      // set the presale started to true
      await checkIfPresaleStarted();
    } catch (err) {
      console.error(err);
    }
  };
  /**
   * checkIfPresaleStarted: checks if the presale has started by quering the `presaleStarted`
   * variable in the contract
   */
  const checkIfPresaleStarted = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);

      const whitelistContract = new ethers.Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi_nft,
        signer
      );
      // call the presaleStarted from the contract
      const _presaleStarted = await nftContract.presaleStarted();
      if (!_presaleStarted) {
        await getOwner();
      }
      setPresaleStarted(_presaleStarted);
      return _presaleStarted;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  /**
   * checkIfPresaleEnded: checks if the presale has ended by quering the `presaleEnded`
   * variable in the contract
   */
  const checkIfPresaleEnded = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);

      const whitelistContract = new ethers.Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi_nft,
        signer
      );
      // call the presaleEnded from the contract
      const _presaleEnded = await ethers.nftContract.presaleEnded();
      // _presaleEnded is a Big Number, so we are using the lt(less than function) insteal of `<`
      // Date.now()/1000 returns the current time in seconds
      // We compare if the _presaleEnded timestamp is less than the current time
      // which means presale has ended
      const hasEnded = _presaleEnded.lt(Math.floor(Date.now() / 1000));
      if (hasEnded) {
        setPresaleEnded(true);
      } else {
        setPresaleEnded(false);
      }
      return hasEnded;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  /**
   * getOwner: calls the contract to retrieve the owner
   */
  const getOwner = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const whitelistContract = new ethers.Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi_nft,
        signer
      );
      // call the owner function from the contract
      const _owner = await nftContract.owner();
      // We will get the signer now to extract the address of the currently connected MetaMask account
      // Get the address associated to the signer which is connected to  MetaMask
      const address = await signer.getAddress();
      if (address.toLowerCase() === _owner.toLowerCase()) {
        setIsOwner(true);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  /**
   * getTokenIdsMinted: gets the number of tokenIds that have been minted
   */
  const getTokenIdsMinted = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const whitelistContract = new ethers.Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi_nft,
        signer
      );
      // call the tokenIds from the contract
      const _tokenIds = await nftContract.tokenIds();
      //_tokenIds is a `Big Number`. We need to convert the Big Number to a string
      setTokenIdsMinted(_tokenIds.toString());
    } catch (err) {
      console.error(err);
    }
  };
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
        abi_nft,
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
        abi_nft,
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
          abi_nft,
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
