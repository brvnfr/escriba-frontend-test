<template>
  <footer class="w-full bg-zinc-100">
    <div class="flex justify-center items-center text-center text-xs h-[25px]">
      <p>&copy; {{ currentYear }} {{ companyName }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      companyName: 'Escriba Informática',
    };
  },
};
</script>

<style lang="scss"></style>
