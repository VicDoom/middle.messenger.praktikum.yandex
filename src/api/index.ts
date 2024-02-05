import { API_HOST } from "../utils/constants";

const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};

function queryStringify(data?: Document | XMLHttpRequestBodyInit | null) {
  const results: string[] = [];
  Object.entries(data ?? {}).forEach(entry => {
    const [key, value] = entry;
    results.push(`${key}=${value.toString()}`);
  });
  return `?${results.join("&")}`;
}

type TOptions = {
  data?: any,
  method: string,
  timeout?: number,
  isFormData?: boolean;
  responseType?: XMLHttpRequestResponseType;
}

type TOptionsWithoutMethod = Omit<TOptions, "method">;

type THTTPMethod = 
  <T>(url: string, options?: TOptionsWithoutMethod, timeout?: number) => Promise<XMLHttpRequest | T | any>
type THTTPRequest = (url: string, options: TOptions, timeout?: number) => Promise<XMLHttpRequest>

export default class HTTPTransport {
  private _apiUrl: string = "";
  constructor(apiPath: string) {
    this._apiUrl = `${API_HOST}${apiPath}`;
  };

  get: THTTPMethod = (url, options) => {
    return this.request(
      `${this._apiUrl}${url}${options?.data ? queryStringify(options?.data) : ""}`, 
      { ...options, method: METHODS.GET },
      options?.timeout,
    );
  };

  put: THTTPMethod = (url, options) => {
    return this.request(`${this._apiUrl}${url}`, { ...options, method: METHODS.PUT }, options?.timeout);
  };

  post: THTTPMethod = (url, options) => {
    return this.request(`${this._apiUrl}${url}`, { ...options, method: METHODS.POST }, options?.timeout);
  };

  delete: THTTPMethod = (url, options) => {
    return this.request(`${this._apiUrl}${url}`, { ...options, method: METHODS.DELETE }, options?.timeout);
  };

  request: THTTPRequest = (url, options, timeout = 5000) => {
    const { method, data, isFormData, responseType } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onload = function() {
      	resolve(xhr);
      };
					
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.timeout = timeout;
      xhr.withCredentials = true;
      xhr.responseType = responseType ?? "json";
      if (isFormData) {
        xhr.send(data);
        return;
      }
      xhr.setRequestHeader("Content-Type", "application/json");
      if (method === METHODS.GET || !data) {
			  xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
};
