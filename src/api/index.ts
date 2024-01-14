const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

function queryStringify(data) {
	const results = [];
	for (const item in data) {
		results.push(`${item}=${data[item].toString()}`);
	}
	return `?${results.join('&')}`;
}

interface IOptions {
  data: {
    [key: string]: number | string | object,
  },
  method: keyof typeof METHODS,
  timeout: number,
}

export default class HTTPTransport {
		get = (url: string, options: IOptions) => {
				return this.request(`${url}${queryStringify(options.data)}`, {...options, method: METHODS.GET}, options.timeout);
		};

		put = (url: string, options: IOptions) => {
				return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
		};

		post = (url: string, options: IOptions) => {
				return this.request(url, {...options, method: METHODS.POST}, options.timeout);
		};

		delete = (url: string, options: IOptions) => {
				return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
		};

		request = (url: string, options, timeout = 5000) => {
				const {method, data, headers} = options;
				console.log(headers);

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
