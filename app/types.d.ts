export interface Location {
    ip: string;
    location: LocationClass;
    as: As;
    isp: string;
}

export interface As {
    asn: number;
    name: string;
    route: string;
    domain: string;
    type: string;
}

export interface LocationClass {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
    geonameId: number;
}
