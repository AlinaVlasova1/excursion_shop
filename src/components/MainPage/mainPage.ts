export interface ICity {
    id?: number,
    country_id?: number,
    name?: string,
    region_id?: number
}

export interface IExcursion {
    id: number,
    activity_type: string,
    title: string,
    city_id: number,
    country_id: number,
    image_big: string,
    image_small: string,
    price: string,
    rating: number,
    recommendation: number,
    region_id: number,
    reviews: number,
    reviews_with_text: number,
}
