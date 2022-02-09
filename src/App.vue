<script setup>
import { ref } from "vue";
import NavBar from "@/components/NavBar.vue";

let counter = ref(0);

setInterval(() => {
  counter.value++;
}, 1000);
</script>

<template>
  <div class="bg-base-200 drawer min-h-screen rounded-lg shadow">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <div class="navbar bg-base-300 w-full justify-between">
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-6 w-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div
          class="from-primary from-warning mx-2 max-w-md flex-1 rounded-md bg-gradient-to-l px-2 md:from-yellow-500"
        >
          <span class="text-base text-gray-200 hover:animate-pulse">
            Don't dApp
          </span>
        </div>
        <div class="hidden flex-none lg:block">
          <ul class="menu horizontal">
            <li>
              <a
                @click="$router.push('/')"
                class="rounded-btn hover:animate-pulse"
                >Home</a
              >
            </li>
            <li>
              <a
                @click="$router.push('Mood')"
                class="rounded-btn hover:animate-pulse"
                >Mood dApp</a
              >
            </li>
            <li>
              <a
                @click="$router.push('Whitelist')"
                class="rounded-btn hover:animate-pulse"
                >Whitelist dApp</a
              >
            </li>
            <li>
              <a
                @click="$router.push('NftMint')"
                class="rounded-btn hover:animate-pulse"
                >NFT App</a
              >
            </li>
            <li>
              <a class="rounded-btn hover:animate-pulse">ICO dApp</a>
            </li>
            <li>
              <a class="rounded-btn hover:animate-pulse">DAO</a>
            </li>
            <li>
              <a class="rounded-btn hover:animate-pulse">DeFi Exchange</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="">
        <header class="shadow" v-if="$route.meta.title">
          <div class="w-full px-4 py-6">
            <h1
              @click="counter = 0"
              class="text-3xl font-bold leading-tight transition-all"
            >
              {{ $route.meta.title }} / {{ counter }}
            </h1>
          </div>
        </header>
        <main>
          <router-view />
        </main>
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" class="drawer-overlay"></label>

      <ul class="menu bg-base-100 w-80 overflow-y-auto p-4">
        <img src="./resources/logoround.png" alt="" class="ml-4 mb-2 w-14" />
        <li>
          <a @click="$router.push('/')">Home</a>
        </li>
        <li>
          <a @click="$router.push('Mood')">Mood dApp</a>
        </li>
        <li>
          <a @click="$router.push('Whitelist')">Whitelist dApp</a>
        </li>
        <li>
          <a @click="$router.push('NftMint')">NFT mint dApp</a>
        </li>
        <li>
          <a>ICO dApp</a>
        </li>
        <li>
          <a>DAO</a>
        </li>
        <li>
          <a>DeFi Exchange</a>
        </li>
      </ul>
    </div>
  </div>
</template>
