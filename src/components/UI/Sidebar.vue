<template>
  <div
    class="h-screen bg-zinc-800"
    id="side-bar"
    :class="dataOpenSideBar == true ? 'side-bar-visible' : 'side-bar-close'"
  >
    <div class="bg-zinc-950 h-[50px] flex justify-center items-center">
      <div class="text-xl font-bold text-center flex items-center justify-center text-white h-full">
        <img
          src="@/assets/images/logo.png"
          v-show="!dataOpenSideBar"
          class="p-1 w-8 h-8 rounded-full ring-2 ring-yellow-400"
          alt="Avatar"
        />
        <img v-show="dataOpenSideBar" src="@/assets/images/logo-full.png" class="p-1 w-full h-10" alt="Avatar" />
      </div>
    </div>
    <div class="flex flex-col justify-between items-start h-[calc(100vh-3rem)] bg-zinc-900">
      <div class="menu-man text-left px-1 whitespace-nowrap justify-center">
        <div class="profile flex justify-center items-center text-center p-5"></div>
        <div class="py-4 leading-none rounded-md cursor-pointer text-zinc-300 hover:text-yellow-400 hover:bg-zinc-800">
          <router-link to="/clientes" class="px-2 flex space-x-2">
            <font-awesome-icon :icon="['fas', 'users']" />
            <span v-show="dataOpenSideBar">Clientes</span></router-link
          >
        </div>
        <div class="py-4 leading-none rounded-md cursor-pointer text-zinc-300 hover:bg-zinc-800 hover:text-yellow-400">
          <router-link to="/produtos" class="px-2 flex space-x-2">
            <font-awesome-icon :icon="['fas', 'store']" />
            <span v-show="dataOpenSideBar">Produtos</span></router-link
          >
        </div>
        <div class="py-4 leading-none rounded-md cursor-pointer text-zinc-300 hover:text-yellow-400 hover:bg-zinc-800">
          <router-link to="/pedidos" class="px-2 flex space-x-2">
            <font-awesome-icon :icon="['fas', 'file']" />
            <span v-show="dataOpenSideBar">Pedidos</span></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataOpenSideBar: Boolean,
  },
};
</script>

<style>
.p-tooltip-text {
  font-size: 10px !important;
}

#side-bar {
  overflow: hidden;
  transition: 300ms;
}

.side-bar-visible {
  width: 250px !important;
}

.side-bar-close {
  width: 50px !important;
}
</style>
