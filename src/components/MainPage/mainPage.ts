import axios from "axios";
import events from "events";

export function getExcursion(str1: string, event: events): string {
    console.log('event', event)
    return str1
}

export interface ICity {
    id?: number,
    country_id?: number,
    name: string,
    region_id?: number
}

export interface IExcursion {
    id: number,
    activity_type: string,
    title: string,
    updated_at: string,
    netto_price: string,
    order_options: Array<IOrderOptions>,
    begin_place: {
        address: string,
        address_comment: string,
        address_existing: boolean
    },
    categories: Array<ICategories>,
    city_id: number,
    city_slug: string,
    country_id: number,
    country_slug: string,
    cover_photo: IPhoto,
    customers_review_rating: number,
    deposit_amount: unknown,
    escription: string,
    duration: string,
    finish_point: string,
    host: {
        id: string,
        link: string,
        name: string,
        photo: string,
        review_rating: number
    },
    image_big: string,
    image_small: string,
    languages: Array<string>,
    main_photo: IPhoto,
    minimum_book_period: number,
    pay_type: string,
    pay_type_in_text: string,
    places_to_see: string,
    price: string,
    product_type: string,
    short_info: string,
    what_included: string,
    url: string,
    what_not_included: string,
    rating: number,
    recommendation: number,
    region_id: number,
    reviews: number,
    reviews_with_text: number,
}

export interface ICurrency {
    RUB: number,
    UAH: number,
    USD: number,
    EUR: number,
    GBP: number,
    KZT: number,
    BYN: number,
    THB: number
}

export interface IOrderOptions {
    id: number,
        title: string,
    ticket_type: string,
    is_base: boolean,
    duration: {
    value: number,
        type: string,
        name: string
    },
    order_lines: [
        {
            id: number,
            price: string,
            discount: Array<unknown>,
            all_prices: ICurrency,
            netto_all_prices: ICurrency,
            all_amounts_to_pay: ICurrency,
            price_per: string,
            title: string,
            offer_type: string,
            countable: boolean,
            start_date: number,
            from_quantity: number,
            to_quantity: number
        }
    ],
        schedule: {
            id: number,
            name: string
        }
}

export interface ICategories {
    description: unknown,
    id: number,
    language: string,
    name: string,
    short_name: string,
    slug: string
}

export interface IPhoto {
    big: string,
    id: unknown,
    name: string,
    original: string,
    small: string,
    wide?: string
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