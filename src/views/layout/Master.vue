<template>
  <div class="w-full h-[calc(100vh-25px)] flex">
    <Sidebar :dataOpenSideBar="openSidebar" />
    <div class="w-full h-full">
      <Header :dataOpenSideBar="openSidebar" :clickHamburger="toggleSidebar" />
      <div class="w-full h-[calc(100vh-50px)] bg-zinc-50">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from '@/components/UI/Header.vue';
import Sidebar from '@/components/UI/Sidebar.vue';
import Footer from '@/components/UI/Footer.vue';

export default {
  components: { Header, Sidebar, Footer },
  data() {
    return {
      openSidebar: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.openSidebar = !this.openSidebar;
    },
  },
};
</script>

<style></style>
