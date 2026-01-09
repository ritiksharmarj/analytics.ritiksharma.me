import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { getURL } from "@/lib/utils";

const BASE_URL = getURL();

const http = async (method: string, config: AxiosRequestConfig) => {
  return new Promise<AxiosResponse<Response>>((resolve, reject) => {
    axios({
      baseURL: BASE_URL,
      method,
      ...config,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error: AxiosError) => {
        if (error.response) reject(error.response.data);
        else reject(new Error("Something went wrong. Please try again."));
      });
  });
};

export const getRequest = (config: AxiosRequestConfig) => http("get", config);

export const postRequest = (config: AxiosRequestConfig) => http("post", config);

export const putRequest = (config: AxiosRequestConfig) => http("put", config);

export const patchRequest = (config: AxiosRequestConfig) =>
  http("patch", config);

export const deleteRequest = (config: AxiosRequestConfig) =>
  http("delete", config);
