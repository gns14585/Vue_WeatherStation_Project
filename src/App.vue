<script setup>
import Navbar from "./components/Navbar.vue";
import MainComp from "./components/MainComp.vue";
import { computed, onMounted, ref } from "vue";
// import { useStore } from "vuex";
import { useStore } from "./store/store.js";
import About from "./components/About.vue";
import { storeToRefs } from "pinia";

const store = useStore();

const { toggle } = storeToRefs(store);

// 사이트가 실행되면 날씨 데이터 가져오기
onMounted(() => {
  // store.dispatch("getWeather");
  store.getWeather(); // pinia 문법
});
</script>

<template>
  <Navbar />
  <div v-if="!toggle"><MainComp /></div>
  <div v-else>
    <About />
  </div>
</template>

<style lang="scss" scoped></style>
