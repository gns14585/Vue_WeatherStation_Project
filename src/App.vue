<script setup>
import Navbar from "./components/Navbar.vue";
import MainComp from "./components/MainComp.vue";
import { onMounted, ref } from "vue";

// 날씨 데이터 상태변수
const weatherData = ref({
  icon: "icon",
  temp: 0,
  text: "text",
  location: "location",
  city: "Seoul",
});

// 환경 변수에서 API 키 가져오기
const apiKey = import.meta.env.VITE_API_KEY;

// 날씨 데이터 가져오기
function getWeather() {
  // 오픈웨더의 온도는 켈빈온도라서 변경해야하는데, lang=kr&untis=metric 로 변경해줘도 되고, 또는 -273.15 해주면됨
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${weatherData.value.city}&appid=${apiKey}`;
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      weatherData.value.icon = data.weather[0].icon;
      weatherData.value.temp = data.main.temp;
      weatherData.value.text = data.weather[0].description;
      weatherData.value.location = data.sys.country;
      weatherData.value.city = data.name;
      console.log(weatherData.value);
    })
    .catch((err) => {
      alert("잠시 후 다시 시도해주세요.");
    });
}

// 사이트가 실행되면 날씨 데이터 가져오기
onMounted(() => {
  getWeather();
});

const onSearchCity = (city) => {
  weatherData.value.city = city;
  getWeather();
};
</script>

<template>
  <button @click="$store.dispatch('getWeather')">getWeather</button>
  <Navbar />
  <MainComp :weatherData="weatherData" @onSearchCity="onSearchCity" />
</template>

<style lang="scss" scoped></style>
