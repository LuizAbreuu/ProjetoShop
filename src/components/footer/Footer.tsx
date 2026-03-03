
export function Footer(){
    const anoAtual = new Date().getFullYear();

    return(
        <footer className="bg-slate-950 text-center text-orange-500 py-3 mt-auto">
            <div className="container mx-auto text-center">
                <p>&copy; {anoAtual} E-commerce/LuizShop. Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}