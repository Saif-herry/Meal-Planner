<template>
  <section className="w-full, h-full flex flex-col  bg-gray-200">
    <Header />
    <main>
      <router-view></router-view>
    </main>
    <Footer />
  </section>
</template>

<script>
import Header from './layout/Header.vue';
import Footer from './layout/Footer.vue';
export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
};
</script>

<style></style>
