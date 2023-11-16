<template>
  <header class="w-full bg-zinc-900">
    <div class="flex justify-between items-center h-[50px]">
      <div @click="clickHamburger" :class="['p-3 cursor-pointer border-rounded text-white', 'hover:bg-zinc-800']">
        <font-awesome-icon :icon="['fas', dataOpenSideBar ? 'bars-staggered' : 'bars']" />
      </div>

      <div class="p-3 h-[50px] w-[50px] bg-yellow-400 text-center hover:bg-yellow-500">
        <font-awesome-icon :icon="['fas', 'user']" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    dataOpenSideBar: Boolean,
    clickHamburger: Function,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss"></style>
