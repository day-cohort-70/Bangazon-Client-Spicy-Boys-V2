import { createContext, useContext } from "react";
import { removeProductFromOrder } from "../data/products.js";

/*
Changes Made 
1. Imported createContext and created removeProductContext
2. Added "<removeProductContext.Provider>" to wrap the return in cart.js

*/

const RemoveProductContext = createContext(null)

export const useRemoveProduct = () => useContext(RemoveProductContext);

export const RemoveProductProvider = ({ children, refresh }) => {
    const removeProduct = (productId) => {
        removeProductFromOrder(productId).then(() => {
            console.log(`Product with ID: ${productId} removed`);
            refresh();
        });
    };

    return (
        <RemoveProductContext.Provider value={{ removeProduct }}>
            {children}
        </RemoveProductContext.Provider>
    );
};