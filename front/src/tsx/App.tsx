import './../css/App.css';
import { Menu } from './Menu';
import { ShoppingList } from './ShoppingList';
import imgPlaceholder from "./../ressources/placeholder.svg"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { Api, getCookie } from '../services/Api';
import { CommandCard } from './CommandCard';
import { ProductType } from '../services/type';

type User={
  login?:string,
  password?:string
  isAdmin?:boolean
}

export var user:User = {}

var _login = getCookie("login")
var _password = getCookie("password")
if(_login && _password){
  Api.login(_login,_password)
}

var navbar = (
  <nav>
    <button onClick={() => {
      window.location.href = "/login"
    }}>administration</button>
    <button onClick={() => {
      document.location.href = "/"
    }}>accueil</button>
    <img></img>
    <button onClick={() => {
      document.location.href = "/"
    }}>carte</button>
    <button>panier</button>
    <button onClick={() => {
      if(user.login && user.password){
      }else{
        document.location.href = "/register"
      }
    }}>s'enregistrer</button>
        <button onClick={() => {
      if(user.login && user.password){
      }else{
        document.location.href = "/login"
      }
    }}>se connecter</button>
        <button onClick={async () => {
      if(user.login && user.password){
      }else{
        await Api.disconnect();
        document.location.href = "/"
      }
    }}>déconnection</button>
  </nav>
)

var home = (
  <div className="App">
    {navbar}
    <Menu></Menu>
  </div>
)

var login = (
  <div>
  {navbar}
    <div>
      <form>
        <h1>Se connecter</h1>
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
      <img src={imgPlaceholder}></img>
    </div>
  </div>
)

var register = (
  <div>
  {navbar}
    <div>
      <form>
        <h1>S'enregistrer</h1>
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
          document.location.href = "/login"
        }}></input>
      </form>
      <img src={imgPlaceholder}></img>
    </div>
  </div>
)

var commands = (
  <div>
  {navbar}
    <div>
      <div>
        <div>Commandes en cours</div><div>50</div>
        <CommandCard commands={{
          product: [],
          user: {
            login: '',
            firstname: '',
            lastname: ''
          }
        }}></CommandCard>
      </div>
      <div>
        <div>Commandes passées</div><div>50</div>
        <CommandCard commands={{
          product: [],
          user: {
            login: '',
            firstname: '',
            lastname: ''
          }
        }}></CommandCard>
      </div>
    </div>
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

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
