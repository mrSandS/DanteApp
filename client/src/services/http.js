const DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

class HttpService {
  authToken = null;

  fetch(point, body, options = {}, testingToken) {
    const {path, method} = point;

    const {
      headers = DEFAULT_HEADERS,
    } = options;

    const requestOptions = {
      method,
      headers
    };

    if (this.authToken) {
      requestOptions.headers.Authorization = this.authToken;
    }
    if (testingToken) {
      requestOptions.headers.Authorization = testingToken;
    }
    if (body) {
      requestOptions.body = JSON.stringify(body);
    }
    console.log('HttpService Fetching Request: ', {path, requestOptions});
    return fetch(path, requestOptions)
      .then(response => {
        return response.json()
      })
      .then(response => {
        console.log('HttpService Fetching Response: ', response);
        if (response.errors) {
          return Propmise.reject(response);
        }
        return Promise.resolve(response);
      })
  }
  setSessionToken(token) {
    this.authToken = token;
  }
  cleanSessionToken() {
    this.authToken = null;
  }
}

const $http = new HttpService();

export default $http;
