import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../Hooks/CartContext";
import UserProgressContext from "../Hooks/UserProgressContext";



export default function Header() {
   const crtCtxlength  = useContext(CartContext);
   const userProgressctx = useContext(UserProgressContext);


     const totallength  = crtCtxlength.items.reduce((totalLengthNumers,item)=>{
        return totalLengthNumers + item.quantity;
     },0)

     function  handleShowCart(){
        console.log("hello");
        
        userProgressctx.showCart();
     }

     
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="A restaurant" />
        <h1>Food Order App</h1>
      </div>
      <p></p>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totallength})</Button>
      </nav>
    </header>
  );
}
