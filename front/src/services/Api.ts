import { user } from "../tsx/App";
import { ProductShopping } from "../tsx/ShoppingList";
import { Product, ProductType } from "./type";

export abstract class Api{
    static url = "http://localhost:8082/api"

    static async getMenu(id?:number){
        const res = await fetch(`${this.url}/card`)
        
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

    //TODO: update data base to handle those completary datas
    static async register(login:string, password:string, mail:string, address:string, firstname:string, lastname:string){
        fetch(`${this.url}/user`, {
            method: "POST",
            body: JSON.stringify({
                login,password,lastname,mail,address,firstname
            })
        })
    }

    //TODO: can't login as user because no route
    static async login(login:string, password:string){
        try{
            const res = await fetch(`${this.url}/user/login`, {
                method: "POST",
                headers: {
                    'Authorization': `basic ${btoa(`${login}:${password}`)}`,
                },
            })
            user.login = login
            user.password = password
            setCookie('login', login, 1)
            setCookie('password', password, 1)
            setCookie('isAdmin', 'true', 1)
        }catch(error){

        }

    }

    static async disconnect(){
        deleteCookie('login')
        deleteCookie('password')
    }

    //TODO: get commands
    static async getCommand(){
        fetch(`${this.url}/commands`, {
            method: "GET",
        })
    }

    static async createCommand(command:ProductShopping){
        fetch(`${this.url}/command`, {
            method: "POST",
            headers: {
                'Authorization': `basic ${btoa('test:test')}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify(command)
        })
    }
}

function setCookie(cname: string, cvalue: string, exdays: number) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie(name: string) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}