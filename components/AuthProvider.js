import React from 'react';

export const AuthContext = React.createContext();
export const useCart = () => React.useContext(CartStateContext);
export const useDispatchCart = () => React.useContext(CartDispatchContext);


const CartStateContext = React.createContext();
const CartDispatchContext = React.createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.item];
    case 'REMOVE':
      const newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
    default:
      throw new Error(`unknown action ${action.type}`);
  }
};

export const AuthProvider = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, []);
    const [post, setPost] = React.useState([]);
    return (
        <AuthContext.Provider>
              <CartDispatchContext.Provider value={dispatch}>
        <CartStateContext.Provider value={state}>
          {children}
        </CartStateContext.Provider>
      </CartDispatchContext.Provider>
        </AuthContext.Provider>
          );
        };