export class CreateVenueDto {
    name: string;
    address: string;
    location: string
    site: string
    phone: string
    schema: string[]
    regionId: string | number
    districtId: string | number
}