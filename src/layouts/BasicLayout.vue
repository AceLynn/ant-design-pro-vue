<template>
  <div>
    <div class="desc">Basic Page</div>
    <Header />
    <SiderMenu />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "@/layouts/Header";
import SiderMenu from "@/layouts/SiderMenu";
import Footer from "@/layouts/Footer";
export default {
  components: { Header, SiderMenu, Footer }
};
</script>

<style></style>
