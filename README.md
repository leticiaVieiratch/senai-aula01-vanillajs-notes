# DevTask & Notes — Aplicação Web em Vanilla JS

> **SENAI — Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas**  
> **Unidade Curricular:** Frameworks Front-end  
> **Docente:** Prof. Me. Deivison S. Takatu  
> **Atividade 01:** Projeto em Vanilla JS (HTML5, CSS3 e JavaScript Puro), Conexão com GitHub e Deploy na Vercel.

---

## 📌 Sobre o Projeto

O **DevTask & Notes** é uma aplicação web interativa desenvolvida com o objetivo de demonstrar os fundamentos essenciais do desenvolvimento front-end moderno sem a utilização de bibliotecas ou frameworks externos (*Vanilla JavaScript*).

A aplicação implementa um gerenciador completo de tarefas e anotações técnicas, abordando:
- Manipulação dinâmica do **DOM** (*Document Object Model*);
- Escuta e tratamento de eventos (`click`, `submit`, `input`, `change`);
- Validação dinâmica de dados com mensagens de erro contextualizadas;
- Persistência no navegador utilizando **LocalStorage** (CRUD local no client-side);
- Sistema reativo de métricas e contadores em tempo real;
- Alternância de tema claro/escuro (*Dark/Light Mode*) persistido no navegador;
- Filtragem por categorias e pesquisa textual instantânea;
- Relógio com atualização em tempo real;
- Design responsivo baseado em CSS Grid e Flexbox com abordagem *Mobile-First*.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **CSS3 Moderno**: Variáveis CSS (Custom Properties), Flexbox, CSS Grid, animações e Media Queries responsivas.
- **JavaScript (ES6+)**: Funções de alta ordem (`filter`, `forEach`), manipulação de strings/arrays, eventos assíncronos (`setInterval`, `setTimeout`), JSON e API `localStorage`.

---

## 📂 Estrutura de Arquivos

```text
atividade-01-vanillajs/
├── index.html      # Estrutura HTML5 da página
├── style.css       # Estilização completa, variáveis e responsividade
├── app.js          # Lógica da aplicação em Vanilla JS
└── README.md       # Documentação do projeto e instruções de deploy
```

---

## 🚀 Como Executar Localmente

Como o projeto é construído em Vanilla JS, não há necessidade de instalação de dependências ou comandos de build.

1. Clone o repositório ou navegue até a pasta:
   ```bash
   cd 01-Apresentacao-e-Configuracao-Ambiente/atividade-01-vanillajs
   ```
2. Abra o arquivo `index.html` em qualquer navegador moderno:
   - Dê dois cliques em `index.html`, ou
   - Utilize a extensão **Live Server** no VS Code (`Alt + L, Alt + O`).

---

## 🌐 Instruções de Deploy na Vercel

Conforme solicitado no Slide 12 da aula:

1. **Subir o projeto para o GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: projeto inicial DevTask em Vanilla JS"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   git push -u origin main
   ```

2. **Deploy na Vercel**:
   - Acesse [vercel.com](https://vercel.com) e faça login com sua conta do GitHub.
   - Clique em **"Add New..."** > **"Project"**.
   - Selecione o repositório criado.
   - Na configuração do projeto:
     - **Framework Preset**: *Other* (ou selecione a pasta raiz caso esteja num monorepo).
     - **Build and Output Settings**: Deixe em branco (Vanilla HTML/CSS/JS não requer etapa de compilação).
   - Clique em **"Deploy"**.
   - Em poucos segundos, sua aplicação estará acessível através de uma URL pública do tipo `https://seu-projeto.vercel.app`.

---

## 👨‍💻 Autor

- **Disciplina:** Frameworks Front-end — SENAI
- **Professor:** Prof. Me. Deivison S. Takatu
