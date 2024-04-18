// store 만들기
import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => ({
    // 상태변수 정의
    weatherData: {
      icon: "icon",
      temp: 0,
      text: "text",
      location: "location",
      city: "Seoul",
    },
    toggle: false, // true일때 about 보여주기
  }),
  actions: {
    // 함수
    addCount(palyload) {
      this.count += 1 + palyload;
    },

    updateWeather(payload) {
      this.weatherData.icon = payload.weather[0].icon;
      this.weatherData.temp = payload.main.temp;
      this.weatherData.text = payload.weather[0].description;
      this.weatherData.location = payload.sys.country;
      this.weatherData.city = payload.name;
    },

    onSearchCity(payload) {
      this.weatherData.city = payload;
    },

    toggleButton() {
      this.toggle = !this.toggle;
    },

    // 비동기 함수 async 사용
    async getWeather() {
      // OpenWeather API 키 가져오기
      const apiKey = import.meta.env.VITE_API_KEY;

      // 오픈웨더의 온도는 켈빈온도라서 변경해야하는데, lang=kr&untis=metric 로 변경해줘도 되고, 또는 -273.15 해주면됨
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.weatherData.city}&appid=${apiKey}`;
      await fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // mutation 함수로 날씨 정보 업데이트
          // context.commit("updateWeather", data);
          this.updateWeather(data);
        })
        .catch((err) => {
          alert("잠시 후 다시 시도해주세요.");
        });
    },
  },
});
