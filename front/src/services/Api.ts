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

        for (const [type, subMenu] of Object.entries<any>(json)) {
            subMenu.forEach((food: Product) => {
                jsonMapped.push({
                    id: food.id,
                    name: food.name,
                    price: food.price,
                    type: type as ProductType
                })
            });
     
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