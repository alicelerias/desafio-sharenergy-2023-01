import axios from "axios";


const HTTP_FORBIDDEN_STATUS = 403

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  
  if (error.response?.status === HTTP_FORBIDDEN_STATUS) {
    
    // window.location.assign(configs.HOST)
  }
  return Promise.reject(error);
});

export default axios