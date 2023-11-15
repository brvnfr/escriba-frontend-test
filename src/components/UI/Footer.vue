<template>
  <footer class="w-full bg-zinc-100">
    <div class="flex flex-row justify-center items-center text-center text-xs h-[25px]">
      <p class="text-center">{{ companyName }} &copy; {{ currentYear }} Criado por <b>Bruno Onofre</b></p>
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
