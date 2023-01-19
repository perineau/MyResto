import './../css/App.css';
import { Menu } from './Menu';
import { ShoppingList } from './ShoppingList';
import imgPlaceholder from "./../ressources/placeholder.svg"
import imgLogin from "./../ressources/Image.png"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Api, getCookie } from '../services/Api';
import { CommandCard } from './CommandCard';
import { ProductType } from '../services/type';
import { CommandPage } from './CommandPage';
import React from 'react';
import logo from "./../ressources/Logo.png"
import panier from "./../ressources/Panier.png"
import "./../css/loginRegister.css"
import "./../css/admin.css"

type User={
  login?:string,
  password?:string
  isAdmin?:boolean
}

export var user:User = {}

var navbar = (
  <nav>
    <div>
      <button id='btnAdmin' onClick={() => {
        window.location.href = "/admin"
      }}>administration</button>
    </div>

    <div className='centered'>
      <button id='home' onClick={() => {
        if(document.location.pathname != "/") document.location.href = "/"
        document.location.href = "#"
      }}>accueil</button>
      <img id='logo' src={logo}></img>
      <button id='home' onClick={() => {
        if(document.location.pathname != "/") document.location.href = "/"
        document.location.href = "#menu"
      }}>Carte</button>
    </div>

    <div>
      <button id='panier' onClick={()=>{
        function toggle() {
          const elem = document.querySelector(".shopping-list")
          if(elem?.classList.contains("hide")){
            elem?.classList.remove("hide")
          }else{
            elem?.classList.add("hide")
          }
        }
        toggle()
      }}><img src={panier}></img></button>
      <button id='register' onClick={() => {
          document.location.href = "/register"
      }}>s'enregistrer</button>
      <button id='login' onClick={() => {
            document.location.href = "/login"
      }}>se connecter</button>
        <button id='disconnect' onClick={async () => {
          await Api.disconnect();
          document.location.href = "/"
    }}>déconnection</button>
    </div>

  </nav>
)

var home = (
  <div className="App">
    {navbar}
    <div id='header'></div>
    <div id='salade'></div>
    <a id='menu'></a>
    <Menu></Menu>
  </div>
)

var login = (
  <div id='loginPage'>
  {navbar}
    <div>
      <form>
        <div className='titlelogo'><h1>Se connecter</h1><img src={logo}></img></div>
        <div>
          <div>Nom d'utilisateur</div>
          <input id='login' type='text'></input>
        </div>
        <div>
          <div>Mot de passe</div>
          <input id='password' type='password'></input>
        </div>
        <input type='button' value='Valider' onClick={async ()=>{
          await Api.login(document.querySelectorAll("input")[0].value!!,document.querySelectorAll("input")[1].value!!)
          document.location.href = "/"
        }}></input>
      </form>
      <img id='imgLogin' src={imgLogin}></img>
      <div className='onBackground'></div>
    </div>
  </div>
)

var register = (
  <div id='loginPage'>
  {navbar}
    <div>
      <form>
        <div className='titlelogo'><h1>S'enregistrer</h1><img src={logo}></img></div>
        <div>
          <div>Nom prénom</div>
          <input type='text'></input>
        </div>
        <div>
          <div>Nom d'utilisateur</div>
          <input type='text'></input>
        </div>
        <div>
          <div>Mot de passe</div>
          <input type='password'></input>
        </div>
        <div>
          <div>mail</div>
          <input type='text'></input>
        </div>
        <div>
          <div>adresse</div>
          <input type='text'></input>
        </div>
        <input type='button' value='Valider' onClick={()=>{
          Api.register(
            document.querySelectorAll("input")[1].value!!,
            document.querySelectorAll("input")[2].value!!,
            document.querySelectorAll("input")[3].value!!,
            document.querySelectorAll("input")[4].value!!,
            document.querySelectorAll("input")[0].value!!.split(" ")[0],
            document.querySelectorAll("input")[0].value!!.split(" ")[1],
          )
          document.location.href = "/login"
        }}></input>
      </form>
      <img src={imgLogin}></img>
      <div className='onBackground'></div>
    </div>
  </div>
)

var commands = (
  <div>
  {navbar}
    <CommandPage></CommandPage>
  </div>
)

const router = createBrowserRouter([
  {
    path: "/",
    element: home,
  },
  {
    path: "/login",
    element: login,
  },
  {
    path: "/register",
    element: register,
  },
  {
    path: "/admin",
    element: commands,
  },
]);

class App extends React.Component {
  render(): React.ReactNode {  
    return (
      <RouterProvider router={router} />
    );
  }

  componentDidMount() {
    const btnRegister = document.querySelector("#register") as HTMLElement
    const btnAdmin = document.querySelector("#btnAdmin") as HTMLElement
    const btnLogin = document.querySelector("#login") as HTMLElement
    const btnDisconnect = document.querySelector("#disconnect") as HTMLElement
  
    var _login = getCookie("login")
    var _password = getCookie("password")
    if(_login && _password){
      Api.login(_login,_password).then(()=>{
        if(user.isAdmin){
          btnAdmin.style.display = "block"
        }else{
          btnAdmin.style.display = "none"
        }
        btnRegister.style.display = "none"
        btnLogin.style.display = "none"
        btnDisconnect.style.display = "block"
      })
    }else{
      btnAdmin.style.display = "none"
      btnRegister.style.display = "block"
      btnLogin.style.display = "block"
      btnDisconnect.style.display = "none"
    }
  }
}

export default App;
