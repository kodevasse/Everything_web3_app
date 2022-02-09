<script setup>
import ButtonRepo from "@/components/ButtonRepo.vue";
import { useCryptoStore } from "../store/cryptoB.js";
import { watch, onMounted } from "vue";
import { ref, computed } from "vue";
const { connectWallet, account, accountCount, loading, accountBlock } =
  useCryptoStore();

onMounted(() => {
  console.log(account);
  if (account) {
    connectWallet();
  }
});
// detect Metamask account change
window.ethereum.on("accountsChanged", function (accounts) {
  connectWallet();
});
// detect Network account change
window.ethereum.on("networkChanged", function (networkId) {
  console.log("networkChanged", networkId);
});
</script>

<template>
  <!-- <div
    class="absolute left-72 h-20 w-36 animate-spin rounded-tl-xl bg-red-300"
  ></div> -->
  <!-- <div class="bg-warning absolute left-72 h-20 w-20 rounded-b-full"></div> -->
  <div class="">
    <div
      class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8"
    >
      <h2
        class="bg-gradient-to-br from-yellow-100 via-amber-500 to-fuchsia-50 bg-clip-text text-3xl font-extrabold leading-9 tracking-tight text-transparent sm:text-5xl sm:leading-10"
      >
        Ethereum adventure
        <br />

        <h2
          class="bg-gradient-to-br from-violet-500 via-amber-100 to-amber-200 bg-clip-text text-lg text-transparent hover:animate-pulse"
        >
          Connect your Web3 wallet
        </h2>
      </h2>
      <div
        class="mt-8 flex flex-col items-center justify-center sm:mr-48 lg:mt-0 lg:flex-shrink-0"
      >
        <!-- <div class="inline-flex rounded-md shadow">
          <router-link
            to="/about"
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-indigo-500 focus:outline-none"
            >Next Page</router-link
          >
        </div> -->
        <div class="flex h-32 w-72 flex-col items-center justify-center">
          <div>
            <button
              v-if="!account"
              class="btn btn-primary relative w-44 rounded p-4 sm:ml-4"
              @click="connectWallet"
            >
              Connect Wallet
            </button>
            <button
              v-if="account"
              class="btn btn-primary relative w-44 rounded p-4 sm:ml-4"
            >
              Connected
            </button>
          </div>
          <div>
            <p class="text-xs sm:text-sm" :v-model="account">{{ account }}</p>
            <p v-if="account" class="text-xs sm:text-sm">
              Transaction Count:{{ accountCount }}
            </p>
            <p v-if="account" class="text-xs sm:text-sm">
              Current Block: {{ accountBlock }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <button @click="setaccount">ACCOUNT</button> -->
</template>

<style>
.btn {
  @apply rounded-sm;
}
</style>
