import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/v1", // 백엔드 주소
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        localStorage.removeItem("accessToken");

        const response = await api.post(
          "/member/reissue",
          {},
          {
            withCredentials: true,
          }
        );

        const accessToken = response.headers["authorization"];

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }

        const config = error.config;
        if (!config) {
          return Promise.reject(error);
        }

        return api.request(config);
      } catch (err) {
        console.log(err);
        window.location.href = "/login";
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
