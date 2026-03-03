import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { ProductProps } from '../pages/home/Home';

interface CartContextData{
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductProps) => void;
    removeItemCart: (product: CartProps) => void;
    total: string;
}

interface CartProps{
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
    amount: number;
    total: number;
}

interface CartProviderProps{
    children: ReactNode;
}

export const CartContext = createContext({} as CartContextData)

function CartProvider({ children }: CartProviderProps){

    const [cart, setCart] = useState<CartProps[]>([])
    const [total, setTotal] = useState("")

    function addItemCart(newItem: ProductProps){
        const itemIndex = cart.findIndex(item => item.id === newItem.id)

        if(itemIndex !== -1){
           let cartList = cart;
           
           cartList[itemIndex].amount = cartList[itemIndex].amount + 1;
           cartList[itemIndex].total = cartList[itemIndex].amount * cartList[itemIndex].price;
           setCart(cartList)
           totalResultCart(cartList)
           return;
        }
                
        let data = {
                ...newItem,
                amount: 1,
                total: newItem.price
        }

        setCart(products => [...products, data])
        totalResultCart([...cart, data])
    }

    function removeItemCart(product: CartProps){
        const indexItem = cart.findIndex(item => item.id === product.id)

        if(cart[indexItem]?.amount > 1){
            let cartList = cart;
            
            cartList[indexItem].amount = cartList[indexItem].amount - 1;
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;

            setCart(cartList)
            totalResultCart(cartList)
            return;
        }

        const removeItem = cart.filter(item => item.id !== product.id)
        setCart(removeItem)
        totalResultCart(removeItem)
    }

    function totalResultCart(items: CartProps[]){
        let myCart = items;
        let result = myCart.reduce((acc, obj) => { return acc + obj.total}, 0)
        const format = result.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })
        setTotal(format)
    }

    return(
        <CartContext.Provider 
        value={{ 
            cart,
            cartAmount: cart.length,
            addItemCart,
            removeItemCart,
            total
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

