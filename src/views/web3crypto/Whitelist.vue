<script setup>
// import { smash, testV } from "../../store/Whitelist.js";
import { useCryptoStoreTwo } from "../../store/Whitelist.js";
import { useCryptoStore } from "../../store/cryptoB.js";
const {
  addAddressToWhitelist,
  setNumberOfWhitelisted,
  getNumberOfWhitelisted,
  checkIfAddressInWhitelist,
  setJoinedWhitelist,
} = useCryptoStoreTwo();
const { account, connectWallet } = useCryptoStore();
import { ref, onMounted } from "vue";
onMounted(() => {
  console.log(account);
  if (account) {
    connectWallet();
    checkIfAddressInWhitelist();
    getNumberOfWhitelisted();
  }
});
// detect Metamask account change
window.ethereum.on("accountsChanged", function (accounts) {
  connectWallet();
  checkIfAddressInWhitelist();
  getNumberOfWhitelisted();
});
// detect Network account change
window.ethereum.on("networkChanged", function (networkId) {
  console.log("networkChanged", networkId);
});
</script>
<template>
  <div class="text-primary flex flex-col items-center justify-center gap-y-2">
    <button
      v-if="account && !setJoinedWhitelist"
      class="btn btn-warning"
      @click="addAddressToWhitelist"
    >
      Whitelist NOW!
    </button>
    <button v-if="setJoinedWhitelist" class="btn btn-success">
      <span class="text-2xl">🎉 </span> YOUR WHITELISTED
      <span class="text-2xl"> 🎉</span>
    </button>
    <button v-if="!account" class="btn btn-outline" @click="connectWallet">
      Connect your wallet
    </button>

    <p>Whitelist status : {{ setNumberOfWhitelisted }}/10</p>
  </div>
</template>
