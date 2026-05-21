# São João de Arcoverde API 🔥

![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

Uma API RESTful robusta desenvolvida com **Fastify** e **Firebase/Firestore**, projetada para servir como o back-end principal do aplicativo oficial do São João de Arcoverde. Este sistema permite gerenciar toda a programação, atrações, pontos de interesse, patrocinadores e categorias da maior e mais tradicional festa de rua da cidade.

---

## 📋 Funcionalidades / Módulos

A API está dividida de forma modular, permitindo gerenciar:

- **🎭 Artistas (Artists)**: Cadastro de bandas, cantores, gêneros musicais, biografias e redes sociais oficiais.
- **📅 Eventos (Events)**: Gerenciamento dos shows, horários, palcos, vinculando artistas e patrocinadores.
- **📍 Pontos de Interesse (POIs)**: Monitoramento e informações sobre locais chave (Polícia, Hospitais, Praça de Alimentação, Monumentos históricos).
- **🤝 Patrocinadores (Sponsors)**: Gestão dos parceiros e patrocinadores da festa com acesso às logos oficiais.
- **🏷️ Categorias (Categories)**: Classificações customizadas para agrupar eventos e locais.

## 🚀 Como iniciar o projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão compatível atual, recomendada v18+)
- Credenciais e conta de serviço Firebase configurada no projeto (o arquivo `firebase-service-account.json` deve estar na raiz).

### Instalação

1. Clone o repositório ou obtenha os fontes.
2. Na pasta do projeto, instale as dependências:
   ```bash
   npm install
   ```

### Executando em Ambiente de Desenvolvimento

Para rodar a API de forma contínua com hot-reload ativo (ideal para desenvolvimento):
```bash
npm run dev
```

### Executando em Produção

Para iniciar a API em modo de produção:
```bash
npm start
```
O servidor estará ativo em [http://localhost:3000](http://localhost:3000).

## 📖 Documentação da API (Swagger)

A documentação interativa e completa dos endpoints está gerada utilizando Swagger. Após iniciar a API, você pode visualizá-la e testá-la diretamente do seu navegador. 

Acesse a rota de documentação em:  
👉 **[http://localhost:3000/docs](http://localhost:3000/docs)**

Lá você encontrará os schemas de todas as entidades, exemplos de request/response e detalhes do funcionamento de todas as rotas de gerenciamento (`GET`, `POST`, `PUT`, `DELETE`).

## 🧪 Rodando os Testes

Para garantir que os recursos estão operando corretamente e validar regressões:
```bash
npm test
```

## 🛠️ Tecnologias Utilizadas
- **Fastify**: Servidor web rápido e de baixo overhead.
- **Firebase Admin SDK**: Banco de dados NoSQL (Firestore) com agilidade e tempo real.
- **Fastify Swagger & UI**: Autogeração de especificação OpenAPI profissional com design customizável.
- **Zod**: Validação rigorosa de esquemas e segurança de tipagem de dados nas integrações.
