import axios from "axios";

const proxy = `https://thingproxy.freeboard.io/fetch/`;
const domainName = `https://api.sputnik8.com/`;

export async function getExcursionFromServer() {
   return  axios.get(
        `${proxy}${domainName}v1/products?api_key=873fa71c061b0c36d9ad7e47ec3635d9&username=frontend@sputnik8.com`,
        {
            headers: {
                'Accept': 'application/json'
            }
        })
}

export async function getCitiesFromServer() {
    return
}