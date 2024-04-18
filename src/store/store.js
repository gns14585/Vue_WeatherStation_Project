import { createStore } from "vuex";

const apiKey = import.meta.env.VITE_API_KEY;

// store 만들기
export default createStore({
  state: {
    // initial state
    count: 0,
    weatherData: {
      icon: "icon",
      temp: 0,
      text: "text",
      location: "location",
      city: "Seoul",
    },
  },
  mutations: {
    // mutations(데이터 변경)
    addCount(state, palyload) {
      state.count += 1 + palyload;
    },

    updateWeather(state, payload) {
      state.weatherData.icon = payload.weather[0].icon;
      state.weatherData.temp = payload.main.temp;
      state.weatherData.text = payload.weather[0].description;
      state.weatherData.location = payload.sys.country;
      state.weatherData.city = payload.name;
    },
  },

  actions: {
    // 날씨 데이터 가져오기
    // context : 전역객체 , 해당하는 변수를 가져와서 스테이트를 참조할 수 있음
    getWeather(context) {
      // 오픈웨더의 온도는 켈빈온도라서 변경해야하는데, lang=kr&untis=metric 로 변경해줘도 되고, 또는 -273.15 해주면됨
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${context.state.weatherData.city}&appid=${apiKey}`;
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // mutation 함수로 날씨 정보 업데이트
          context.commit("updateWeather", data);
        })
        .catch((err) => {
          alert("잠시 후 다시 시도해주세요.");
        });
    },
  },
});
