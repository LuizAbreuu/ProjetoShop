# Projeto Shop (E-commerce Simples)

Este é um projeto front-end de um e-commerce desenvolvido com **React.js**, **TypeScript**, e **Vite**. A aplicação simula uma loja onde os usuários podem visualizar uma lista de produtos, ver os detalhes de um produto específico e adicionar itens a um carrinho de compras, com o valor global sendo atualizado dinamicamente.

A aplicação consome uma API simulada (mock) utilizando o `json-server`.

---

## 🛠️ Tecnologias e Bibliotecas Utilizadas

- **React.js (v19)**: Biblioteca principal para construção das interfaces.
- **TypeScript**: Adiciona tipagem estática e segurança ao código.
- **Vite**: Ferramenta de build super-rápida e ambiente de desenvolvimento.
- **Tailwind CSS**: Framework CSS utility-first para estilização rápida e responsiva.
- **React Router Dom**: Gerenciamento de rotas e navegação entre a Home, Detalhes e Carrinho.
- **React Hot Toast**: Biblioteca para exibir notificações (toasts) agradáveis para o usuário.
- **React Icons**: Utilização fácil de ícones vetoriais.
- **Axios**: Cliente HTTP para realizar requisições à API.
- **json-server**: Ferramenta para criar uma Fake REST API de testes.

---

## 📂 Estrutura do Projeto

Abaixo segue a divisão dos principais diretórios inseridos em `src/`:

- **components/**: Componentes reutilizáveis da aplicação (Ex: `Header`, `Footer`, `Layout`).
- **contexts/**: Gerenciamento de estados globais utilizando a Context API. Nele encontra-se o `CartContext.tsx` que gerencia toda a lógica do carrinho (adição, remoção e cálculo de totais).
- **pages/**: Representam as páginas/rotas da nossa aplicação.
  - `home/`: Página principal que lista os produtos em alta.
  - `details/`: Página de detalhes de um produto específico.
  - `cart/`: Página de visualização dos itens adicionados ao carrinho.
- **services/**: Configurações e conexões relacionadas com APIs externas. (Onde fica a configuração base do Axios instanciando a `api`).

---

## 🚀 Como Rodar o Projeto

Para rodar este projeto em sua máquina localmente, é necessário executar e manter dois terminais abertos: um para a inicialização da Fake API e outro para o projeto React Front-end.

### Passo 1: Instale as dependências
Abra seu terminal na raiz do projeto e execute:
```bash
npm install
```

### Passo 2: Rodar a API Fake (json-server)
Você precisará iniciar o servidor mock baseado no arquivo `db.json`. No terminal, rode o seguinte comando:
```bash
npx json-server --watch db.json
```
_Por padrão, o json-server roda na porta 3000._

### Passo 3: Rodar o Front-end
Abra uma nova aba/janela no terminal e inicie a aplicação Vite:
```bash
npm run dev
```

Abra em seu navegador o link fornecido pelo Vite (Geralmente `http://localhost:5173`) e teste a aplicação!

---

## 🔍 Análise de Boas Práticas e Pontos de Melhoria

Abaixo estão as observações feitas através da análise da atual estrutura de código. O projeto em si está muito bem organizado, apresentando componentização clara, uso coerente nos Hooks do React e boa gestão de estado global com a Context API. Porém, existem alguns pontos que podem ser ajustados com o tempo:

### 1. Quebra da Imutabilidade de Estado (`CartContext.tsx`)
**O que acontece:** Nos métodos `addItemCart` e `removeItemCart`, uma vez que os itens do carrinho são encontrados, o estado do item é diretamente modificado através de chaves do array original (Ex: `let cartList = cart; cartList[itemIndex].amount = ...; setCart(cartList)`).
**Por que melhorar:** No React, o estado deve ser tratado como completamente _imutável_. Ao referenciar o array via `let cartList = cart`, qualquer modificação em `cartList` será aplicada diretamente na referência de estado principal sem avisar o React.
**Como melhorar:** Use o método `.map()` já que ele retorna um novo array ou crie um clone explícito `let cartList = [...cart]`. O código antigo que está hoje comentado em formato `.map` seria a solução mais encorajada e segura para re-renderizar adequadamente.

### 2. Duplicação Lógica das Notificações (Toasts)
**O que acontece:** O código e a customização dos alertas de "Produto adicionado ao carrinho!" usando o `toast` se repete quase que idêntico tanto no arquivo `Home.tsx` quanto no `index.tsx` de Details.
**Por que melhorar:** A necessidade de manutenção se torna custosa. Se desejar alterar o visual ou mensagem deste alerta de adição de produto, precisará alterar em vários arquivos.
**Como melhorar:** Envie o disparo padrão do alerta de adição diretamente para centralizar o `toast.success` debaixo da função `addItemCart` dentro do próprio **arquivo de Contexto** (`CartContext.tsx`). Dessa forma sempre que um item for adicionado em qualquer lugar do app, a notificação sairá por lá.

### 3. Acoplamento Lógico do Total a Strings e Interface (`CartContext.tsx`)
**O que acontece:** O valor numérico e primitivo do total que é somado está sendo convertido para String com máscara monetária (`toLocaleString('pt-BR')`) antes de ser injetado para uso global nos demais componentes. 
**Como melhorar:** O estado guardado pelo Contexto seria melhor definido com o valor total simplesmente numérico (apenas as contas e lógica). E, na ponta (no visual de `Home.tsx`, `Cart.tsx`), o componente ficaria responsável pela formatação para a moeda local. Isso previne que a exibição de String engesse a possível utilização deste total futuramente no Backend onde precisaria obrigatoriamente estar com tipo *Number*.

### 4. Scripts e Configurações Facilitadoras
**O que acontece:** Há um comentário no arquivo `services/api.ts` instruindo como rodar a base mock `// json-server --watch db.json`.
**Como melhorar:** Transforme este comando em um `script` automatizado diretamente no `package.json` de sua aplicação. Por exemplo: `"backend": "json-server --watch db.json -p 3000"`. Assim o desenvolvedor apenas precisará rodar `npm run backend`.

### 5. Tipagem da Variável de Ambiente (`.env`)
**O que acontece:** É acessado livremente o `import.meta.env.VITE_API_URL` dentro da instância da `api`.
**Como melhorar:** É uma boa prática do TypeScript em projetos em Vite adicionar em um arquivo `.d.ts` o módulo de augmentation apontando as variáveis ambientes contidas (`interface ImportMetaEnv`).

### 6. Loading global e Error Handlings genéricos
**Como melhorar:** Existem chamadas para carregamentos simples `<div>Carregando...</div>` nas páginas. Criar um componente de `<Spinner />` padronizado seria ideal. E, ao tratar os `catch(error)`, checar o tipo de retorno HTTP (como 500, 404, etc) forneceria um erro mais detalhado do que a atual mensagem de fallback.
