import axios from "axios";

export const METHODS = {
  POST: "post",
  GET: "get",
  PUT: "put",
  DELETE: "delete",
};

export const sendRequest = ({
  url,
  method,
  data = null,
  callbackSuccess = null,
  callbackError = null,
  params = {} // URL parametreleri için
}) => {
  const instance = axios.create({
    baseURL: "https://workintech-fe-ecommerce.onrender.com",
    timeout: 30000,
    params // URL parametrelerini buraya ekliyoruz
  });

  instance[method](url, data)
    .then((response) => {
      callbackSuccess && callbackSuccess(response.data);
    })
    .catch((error) => {
      callbackError && callbackError(error);
    });
};