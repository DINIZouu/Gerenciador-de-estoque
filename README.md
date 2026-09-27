<div align="center">

# 📦 Gerenciador de Estoque

<p align="center">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" alt="HTML5" width="40" height="40"/>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" alt="CSS3" width="40" height="40"/>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="JavaScript" width="40" height="40"/>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" alt="NodeJS" width="40" height="40"/>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" alt="Express" width="40" height="40"/>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sqlite/sqlite-original.svg" alt="SQLite" width="40" height="40"/>
</p>

*Uma aplicação Full Stack completa, intuitiva e responsiva para controle, monitoramento e gestão inteligente de inventários em tempo real.*

<p align="center">
  <a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" /></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" /></a>
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" /></a>
  <a href="https://www.sqlite.org/"><img src="https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" /></a>
</p>

</div>

---

## 📌 Sobre o Projeto

O **Gerenciador de Estoque** é uma solução **Full Stack** desenvolvida para simplificar e otimizar o controle de inventários de produtos. A aplicação combina um backend dinâmico com persistência de dados em banco relacional e uma interface frontend reativa construída com JavaScript puro (*Vanilla JS*).

O sistema oferece cálculo em tempo real de métricas financeiras e de volume, alertas automáticos para produtos com estoque crítico e recursos de busca avançada para navegação rápida entre itens.

---

## 🚀 Funcionalidades Principais

- 🔄 **CRUD Completo de Produtos:** Gestão total do ciclo de vida dos produtos (criação, leitura, atualização e remoção).
- 📊 **Dashboard de Métricas em Tempo Real:** Acompanhamento instantâneo da quantidade total de itens e do valor financeiro acumulado no estoque.
- ⚠️ **Alertas Visuais de Estoque Baixo:** Identificação e destaque automático para itens que atingem o limite mínimo predefinido.
- 🔍 **Filtro e Busca Dinâmica:** Pesquisa instantânea por nome ou categoria sem recarregar a página.
- 📱 **Interface Responsiva & Flutuante:** Design moderno, limpo e adaptável para computadores, tablets e smartphones.

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **HTML5 & CSS3:** Estruturação semântica e estilização moderna e responsiva.
- **JavaScript (Vanilla JS):** Manipulação dinâmica do DOM, consumo de API via Fetch e tratamento de eventos.

### **Backend**
- **Node.js:** Ambiente de execução assíncrono e de alto desempenho no lado do servidor.
- **Express.js:** Framework web para gerenciamento de rotas e middlewares.
- **SQLite3:** Banco de dados relacional leve e embutido para persistência local.
- **CORS & Body-Parser:** Middlewares para segurança no compartilhamento de recursos entre origens e parse de dados das requisições.

---

## 🔍 Estrutura do Projeto

<details>
<summary><b>📂 Clique para expandir a estrutura de diretórios</b></summary>

```text
Gerenciador-de-estoque/
├── public/              # Arquivos estáticos do Frontend
│   ├── css/             # Estilização da aplicação
│   ├── js/              # Lógica do frontend e consumo de API
│   └── index.html       # Interface principal
├── src/                 # Código-fonte do Backend
│   ├── controllers/     # Regras de negócio e operações do banco
│   ├── routes/          # Definição das rotas REST
│   ├── database/        # Configuração do banco SQLite
│   └── server.js        # Inicialização do servidor Express
├── package.json         # Gerenciamento de dependências e scripts
└── README.md            # Documentação do projeto
