
export function Footer(){
    const anoAtual = new Date().getFullYear();

    return(
        <footer className=" p-6 bg-slate-950 text-center text-orange-500 py-3 fixed-bottom-0">
            <div className="container mx-auto text-center">
                <p>&copy; {anoAtual} E-commerce/LuizShop. Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}