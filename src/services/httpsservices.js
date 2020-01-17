import axios from "axios";
export const instance = axios.create({
  baseURL: "https://next.json-generator.com/api/json/get/"
});

export const getData = url => {
  return new Promise((resolve, reject) => {
    return instance
      .get(url)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};
