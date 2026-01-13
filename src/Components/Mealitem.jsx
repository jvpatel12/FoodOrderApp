import { useContext } from "react";
import { formatting } from "../assets/formatting";
import Button from "./UI/Button";
import cartContext from "../Hooks/CartContext";
export default function Mealitem({ meal }) {
     const  crtContext=  useContext(cartContext);
    function handleMeal(){
        crtContext.addItem(meal);
    }

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />

        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{formatting.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>

        <p className="meal-item-actions">
          <Button onClick={handleMeal}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
