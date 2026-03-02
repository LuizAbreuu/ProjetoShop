import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";


export function Header(){
    return (
        <header className="w-full px-1 bg-slate-950">
            <nav className="w-full max-w-7xl h-14 flex items-center justify-between px-5 mx-auto">
                <Link className="font-bold text-2xl text-orange-500" to="/">LuizShop</Link>

                <Link className="relative" to="/cart">
                    <FiShoppingCart size={24} color="#fff"/>
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        2
                    </span>
                </Link>
            </nav>
        </header>
    )
}