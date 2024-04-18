<script setup>
import Navbar from "./components/Navbar.vue";
import MainComp from "./components/MainComp.vue";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import About from "./components/About.vue";

// 환경 변수에서 API 키 가져오기
const apiKey = import.meta.env.VITE_API_KEY;

const store = useStore();

const weatherData = computed(() => store.state.weatherData);

// 사이트가 실행되면 날씨 데이터 가져오기
onMounted(() => {
  store.dispatch("getWeather");
});
</script>

<template>
  <button @click="$store.dispatch('getWeather')">getWeather</button>
  <Navbar />
  <div v-if="!$store.state.toggle"><MainComp /></div>
  <div v-else>
    <About />
  </div>
</template>

<style lang="scss" scoped></style>
