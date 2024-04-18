import { createStore } from "vuex";

// store 만들기
export default createStore({
  // state: 상태 저장소
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
    toggle: false, // true일때 about 보여주기
  },

  // 상태 변경하는곳 (commit)
  mutations: {
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

    onSearchCity(state, payload) {
      state.weatherData.city = payload;
    },

    toggleButton(state) {
      state.toggle = !state.toggle;
    },
  },

  // actions: mutations과 유사하지만 비동기 작업 처리하는곳 그 결과를 mutations에 커밋하여 상태변경
  // ex) api호출 등
  actions: {
    // 날씨 데이터 가져오기
    // context : 전역객체 , 해당하는 변수를 가져와서 스테이트를 참조할 수 있음
    getWeather(context) {
      // OpenWeather API 키 가져오기
      const apiKey = import.meta.env.VITE_API_KEY;

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
