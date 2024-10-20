import axios from "axios";

//Использую proxy, потому что локально появлились CORS ошибки
const proxy = `https://thingproxy.freeboard.io/fetch/`;
const baseUrl = proxy + `https://api.sputnik8.com/v1/`;

export function getExcursionFromServer() {
    const requestUrl = new URL(baseUrl);

    requestUrl.pathname += `products`;
    appendDefaultQueryParams(requestUrl);

    return axios.get(requestUrl.toString());
}

export function getCitiesFromServer() {
    const requestUrl = new URL(baseUrl);

    requestUrl.pathname += `cities`;
    appendDefaultQueryParams(requestUrl);

    return axios.get(requestUrl.toString());
}

function appendDefaultQueryParams(requestUrl: URL) {
    requestUrl.searchParams.append(`api_key`, `873fa71c061b0c36d9ad7e47ec3635d9`);
    requestUrl.searchParams.append(`username`, `frontend@sputnik8.com`);
}