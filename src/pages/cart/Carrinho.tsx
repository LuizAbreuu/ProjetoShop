


export function Carrinho(){
    return (
        <div className="w-full max-w-7xl mx-auto">
            <h1 className="font-medium text-2xl text-center my-4">Meus pedidos</h1>

            <section className="flex items-center justify-between border-b-2 border-gray-300">
                <img 
                    src="data:image/jpeg;base64,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" 
                    alt="Logo do produto"
                    className="w-28" 
                />

                <strong>
                    preço: R$ 1299,00
                </strong>

                <div className="flex items-center justify-center gap-3">
                    <button className="bg-slate-500 px-2 rounded text-white font-medium flex items-center justify-center">
                        -
                    </button>
                    2
                    <button className="bg-slate-500 px-2 rounded text-white font-medium flex items-center justify-center">
                        +
                    </button>
            
                </div>

                <strong className="float-right">
                    Subtotal: R$ 2598,00
                </strong>
            </section>

            <p className="font-bold mt-4">SubTotal: R$ 2598,00</p>
        </div>
    )
}