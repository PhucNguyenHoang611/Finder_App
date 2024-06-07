import { OpenAPI } from "@/services/api";
import { ApiRequestOptions } from "@/services/api/core/ApiRequestOptions";

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export function setAPIBaseUrl() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  if (OpenAPI.BASE !== baseUrl) {
    OpenAPI.BASE = baseUrl ? baseUrl : "";
  }
}

export function setJWT(jwt: string | Resolver<string> | undefined) {
  OpenAPI.TOKEN = jwt;
}
