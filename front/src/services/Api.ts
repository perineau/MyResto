import { Product, ProductType } from "./type";


export abstract class Api{
    static url = "http://localhost:8082/api"

    static async getMenu(id?:number){
        let headers = new Headers();

        const res = await fetch(`${this.url}/card`,{
            headers:headers,
        })
        
        const json:any = await res.json();

        var jsonMapped:Product[] = []

        for (const [key, value] of Object.entries<any>(json)) {
            jsonMapped.push({
                id: value.id,
                name: value.name,
                price: value.price,
                type: key as ProductType
            })
        }

        return jsonMapped;
    }

    static async getShoppingList(){
        let res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
        let json = await res.json()

        return json;
    }

    static async register(login:string, password:string, email:string){

    }

    static async login(login:string, password:string){

    }

}