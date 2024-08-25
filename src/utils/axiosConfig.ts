import axios, { AxiosError } from "axios";

axios.interceptors.response.use(
  (response) => {
    console.log(response);

    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401 || status === 403) {
        sessionStorage.removeItem("authState");
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
