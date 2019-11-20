<template>
  <div style="text-align:center;">
    <img :src="logoUrl" alt="" />
    <br />
    <IconFont type="icon-browser-" style="font-size: 100px;" />

    <br />
    <!-- <Logo /> -->
  </div>
</template>

<script>
// import Logo from "@/assets/moon.svg";
import logoUrl from "@/assets/moon.svg";

export default {
  data() {
    return {
      logoUrl
    };
  }
  // components: {
  //   Logo
  // }
};
</script>

<style></style>
