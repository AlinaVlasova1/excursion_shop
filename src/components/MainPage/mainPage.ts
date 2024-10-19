import axios from "axios";
import events from "events";

export function getExcursion(str1: string, event: events): string {
    console.log('event', event)
    return str1
}

export interface ICity {
    id : number,
    country_id : number,
    name : string,
    region_id : number
}
export async function getCities(citysArr: Array<ICity>) {

    const response = await axios.get(
        `https://thingproxy.freeboard.io/fetch/https://api.sputnik8.com/v1/cities?api_key=873fa71c061b0c36d9ad7e47ec3635d9&username=frontend@sputnik8.com`,
        {
            headers: {
                'Accept': 'application/json'
            }
        })
    citysArr = await response.data ;
    console.log('this.citysArr',citysArr )
    //    .then(response => response.json()).then((res) => {
    //   console.log("res", res)
    //  this.citysArr = res;
    // })


}