import { formatting } from "../assets/formatting";

export default function CartItem({name,quantity,price,onIncrese,onDecrese}){

    return(
        <li className="cart-item">
             <p>
                {name} - {quantity} * {formatting.format(price)}
             </p>
             <p className="cart-item-actions">
                <button  onClick={onDecrese}>-</button>
                <span>{quantity}</span>
                <button onClick={onIncrese}>+</button>
             </p>
        </li>
    )
}