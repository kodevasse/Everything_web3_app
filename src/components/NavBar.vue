<template>
  <div class="bg-base-200 drawer h-96 rounded-lg shadow">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <div class="navbar bg-base-300 w-full">
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
          class="from-primary mx-2 flex-1 rounded-md bg-gradient-to-l from-teal-300 px-2 md:from-yellow-500"
        >
          <span class="animate-pulse text-gray-400">
            PDPkrypto Web3.0 Portofolio</span
          >
        </div>
        <div class="hidden flex-none lg:block">
          <ul class="menu horizontal">
            <li>
              <a @click="router.push('Mood')" class="rounded-btn">Mood dApp</a>
            </li>
            <li>
              <a @click="router.push('Whitelist')" class="rounded-btn"
                >Whitelist dApp</a
              >
            </li>
            <li>
              <a class="rounded-btn">NFT App</a>
            </li>
            <li>
              <a class="rounded-btn">ICO dApp</a>
            </li>
            <li>
              <a class="rounded-btn">DAO</a>
            </li>
            <li>
              <a class="rounded-btn">DeFi Exchange</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" class="drawer-overlay"></label>
      <ul class="menu bg-base-100 w-80 overflow-y-auto p-4">
        <li>
          <a @click="$router.push('Mood')">Mood dApp</a>
        </li>
        <li>
          <a @click="router.push('Whitelist')">Whitelist dApp</a>
        </li>
        <li>
          <a>NFT mint dApp</a>
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
<script setup></script>
