import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingIndex > -1) {
      const existingItem = state.items[existingIndex];
      updatedItems[existingIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    return {
      items: state.items.filter((item) => item.id !== action.id),
    };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCart] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCart({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCart({ type: "REMOVE_ITEM", id });
  }

  const contextValue = {
    items: cart.items,
    addItem,
    removeItem,
  };

  console.log(contextValue);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartContext;
