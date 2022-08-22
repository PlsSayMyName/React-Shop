import React, { useEffect, useReducer, useState } from "react";

export const Context = React.createContext();

const initialState = {
  cart: [],
}

export const ContextProvider = (props) => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const getLogged = () => {
      setLogged(false);
      if (sessionStorage.getItem("user")) {
        setLogged(true);
      }
    };
    getLogged();
  }, []);

  const Reducers = (state, action) => {
    const { id, price } = action.payload;
    switch (action.type) {
      case "ADD_TO_CART":
        const cartItem = state.cart.find(item => item.id === id);
        if (cartItem) {
          return {
            ...state,
            cart: state.cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item),
          }
        } else {
          return {
            ...state,
            cart: [...state.cart, { id, price, quantity: 1 }],
          }
        }
      case "DEL_ITEM":
        const cartItem1 = state.cart.find(item => item.id === id);
        if (cartItem1) {
          return {
            ...state,
            cart: state.cart.map(item => item.id === id ? { ...item, quantity: item.quantity < 1 ? item.quantity = 0 : item.quantity - 1, price: item.price } : item),
          }
        } else {
          return {
            ...state,
            cart: [...state.cart, { id, price, quantity: null }],
          }
        }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(Reducers, initialState);

  return (
    <Context.Provider value={{ logged, setLogged, state, dispatch }}>
      {props.children}
    </Context.Provider>
  )
}