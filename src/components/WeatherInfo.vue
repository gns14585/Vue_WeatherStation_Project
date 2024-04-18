<template>
  <div class="weather-info">
    <div class="icon">
      <img
        :src="`https://openweathermap.org/img/wn/${$store.state.weatherData.icon}@2x.png`"
        :alt="$store.state.weatherData.icon"
      />
    </div>
    <!-- 오픈웨더의 온도는 켈빈온도라서 변경해야하는데, lang=kr&untis=metric 로 변경해줘도 되고, 또는 -273.15 해주면됨-->
    <div class="temp">
      {{ ($store.state.weatherData.temp - 273.15).toFixed(1) }}&deg;
    </div>
    <div class="text">{{ $store.state.weatherData.text }}</div>
    <div class="location">
      {{ $store.state.weatherData.city }},
      {{ $store.state.weatherData.location }}
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.weather-info {
  padding: 20px;
  //& 는 부모선택자 라고함 간단하게 설명하면 &:weather-info 를 가리킴
  & > div {
    margin-bottom: 20px;
    padding: 20px;
  }
  .icon img {
    width: 140px;
  }
  .temp {
    font-size: 4em;
  }
  .text {
    font-size: 2em;
  }
}
</style>
