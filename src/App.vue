<script setup>
import Navbar from "./components/Navbar.vue";
import MainComp from "./components/MainComp.vue";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

// 환경 변수에서 API 키 가져오기
const apiKey = import.meta.env.VITE_API_KEY;

const store = useStore();

const weatherData = computed(() => store.state.weatherData);

// 사이트가 실행되면 날씨 데이터 가져오기
onMounted(() => {
  store.dispatch("getWeather");
});

const onSearchCity = (city) => {
  store.commit("updateCity", city); // 도시 이름을 업데이트하는 mutation을 호출해야 함
  store.dispatch("getWeather");
};
</script>

<template>
  <button @click="$store.dispatch('getWeather')">getWeather</button>
  <Navbar />
  <MainComp />
</template>

<style lang="scss" scoped></style>
