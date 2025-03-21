import { Product } from "../interfaces/products-interface";

export class ProductAdapter{
    static productAdapterFromApi(api_json : any) : Product {
        return {
            id: api_json.id,
            name: api_json.name,
            descripcion: api_json.descripcion,
            proovedor: api_json.proovedor,
            imageurl: api_json.imageurl
        }
    }
}