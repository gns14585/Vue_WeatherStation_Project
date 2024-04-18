<template>
  <div class="container">
    <SearchBar @onSearchCity="onSearchCity" />
    <WeatherInfo :weatherData="weatherData" />
  </div>
</template>

<script setup>
import WeatherInfo from "./WeatherInfo.vue";
import SearchBar from "./SearchBar.vue";

// 이벤트 정의 후 함수로 반환
const emits = defineEmits(["onSearchCity"]);

// 날씨데이터 상태변수
const props = defineProps({
  weatherData: Object,
});
console.log(props.weatherData);

// 검색어 이벤트 함수
const onSearchCity = (city) => {
  console.log(city);
  emits("onSearchCity", city);
};
</script>

<style lang="scss" scoped></style>
