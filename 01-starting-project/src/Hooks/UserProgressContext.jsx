import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress :'',  //'cart' ,'checkout'
    showCart:() =>{},
    hideCart:() =>{},
    showCheckout:() =>{},
    hideCheckout:() =>{}
});

export function UserProgressContextProvider({children}){
   
    const [userprocess,setUserprocess] = useState('');

    function showCart(){
        setUserprocess('cart')
    }

      function hideCart(){
        setUserprocess('')
    }


      function showCheckout(){
        setUserprocess('checkout')
    }


      function hideCheckout(){
        setUserprocess('')
    }

    const userProcessctx ={
         progress:userprocess,
         showCart,
         hideCart,
         showCheckout,
         hideCheckout
    }


    return <UserProgressContext.Provider value={userProcessctx}>
        {children}
    </UserProgressContext.Provider>
}

export default UserProgressContext;