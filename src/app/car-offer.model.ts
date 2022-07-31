export interface CarOffer {
    id: number
    type: string
    from: string
    brand: string
    model: string
    generation: number
    mileage: number
    capacity: number
    fuel: string
    power: string
    transmission: number
    drive: number
    vin: string
    bodytype: string
    doorcount: number
    color: string
    colortype: string
    country: string
    vat: number
    firstRegistration: string
    notcrashed: number
    conditioncar: number
    leasing: number
}

export interface CarOfferRequest {
    type: string
    from: string
    brand: string
    model: string
    generation: number
    mileage: number
    capacity: number
    fuel: string
    power: string
    transmission: number
    drive: number
    vin: string
    bodytype: string
    doorcount: number
    color: string
    colortype: string
    country: string
    vat: number
    firstRegistration: string
    notcrashed: number
    conditioncar: number
    leasing: number
}

export interface CarOfferResponse {
    message: string
    offer_id: number
}