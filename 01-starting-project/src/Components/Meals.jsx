import { useEffect, useState } from "react";
import Mealitem from "./Mealitem";
export default function Meals() {
  const [state, setState] = useState([]);

  useEffect(() => {
    async function Fetch() {
      const response = await fetch("http://localhost:3000/meals");
    //   console.log(response);

      if (!response.ok) {
        //logic
      }

      const meals = await response.json();
    //   console.log(meals);

      setState(meals);
    }
    Fetch();
  }, []);

  return (
    <ul id="meals">
      {state.map((meal) => (
        <Mealitem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
