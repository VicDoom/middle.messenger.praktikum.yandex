const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};

function queryStringify(data?: Document | XMLHttpRequestBodyInit | null) {
  const results: string[] = [];
  Object.entries(data as object).forEach(entry => {
    const [key, value] = entry;
    results.push(`${key}=${value.toString()}`);
  });
  return `?${results.join("&")}`;
}

interface IOptions {
  data?: Document | XMLHttpRequestBodyInit | null,
  method: string,
  timeout: number,
}

export default class HTTPTransport {
  get = (url: string, options: IOptions) => {
    return this.request(
      `${url}${queryStringify(options.data)}`, 
      { ...options, method: METHODS.GET },
      options.timeout,
    );
  };

  put = (url: string, options: IOptions) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  post = (url: string, options: IOptions) => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  delete = (url: string, options: IOptions) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = (url: string, options: IOptions, timeout = 5000) => {
    const { method, data } = options;

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
      if (method === METHODS.GET || !data) {
			  xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
