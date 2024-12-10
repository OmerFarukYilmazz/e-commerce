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
  params = {},
}) => {
  const instance = axios.create({
    baseURL: "https://workintech-fe-ecommerce.onrender.com",
    timeout: 5000,
    params,
  });

  return instance[method](url, data)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};