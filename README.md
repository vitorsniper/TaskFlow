# TaskFlow - Cadastro/Listagem de Projetos e Atividades | Cadastro/Listagem de Tarefas

## Descrição

O TaskFlow é uma aplicação que permite aos usuários cadastrar e visualizar projetos e suas respectivas atividades. O
foco principal do desafio é a implementação das funcionalidades de cadastro e listagem, com uma interface simples e
intuitiva. A solução proposta conta com a possibilidade de adicionar novas funcionalidades, como edição e exclusão, para
ganhos de pontos extras.

Além da gestão de projetos, também há uma componente de Tarefas, configuráveis entre Pendente, Em Andamento e Concluída.

## Funcionalidades

- **Cadastro de Projetos**: O usuário pode cadastrar novos projetos, informando dados como o nome do projeto, a data de
  início e a data de término.
- **Cadastro de Atividades**: Cada projeto pode ter múltiplas atividades associadas, que também podem ser cadastradas
  com informações como título, descrição e status.
- **Listagem de Projetos e Atividades**: A aplicação exibe uma lista de projetos cadastrados com seus respectivos status
  de conclusão, e cada projeto pode ter várias atividades associadas que são listadas.
- **Cadastro de Tarefas**: O usuário pode criar tarefas em um quadro Kanban, para acompanhamento de atividades gerais.
- **Listagem das Tarefas**: A aplicação exibe uma lista de tarefas cadastras para acompanhamento.

## Tecnologias Utilizadas

- **Frontend**:
    - **React**: Biblioteca JavaScript para construção da interface de usuário.
    - **Chakra UI**: Biblioteca de componentes para estilização da interface, com foco em acessibilidade e design
      responsivo.
    - **React Router**: Biblioteca para navegação entre as páginas de cadastro e listagem.
    - **React Hooks**: Para gerenciar estados e efeitos na interface.

- **Backend**:
    - **Ruby on Rails**: Framework utilizado para a construção da API que gerencia as operações de cadastro e listagem
      dos projetos e atividades.
    - **PostgreSQL**: Banco de dados relacional utilizado para armazenar os dados de projetos e atividades.

- **Autenticação**:
    - **Devise**: Gem utilizada para autenticação de usuários no backend.

# TaskFlow API

Este é um projeto de API para gerenciamento de tarefas e projetos. Ele permite criar, listar, editar e excluir projetos
e atividades.

## Como Rodar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/vitorsniper/taskflow-api.git

## Fluxo de Funcionalidade

1. **Tela de Cadastro**: O usuário pode cadastrar um novo projeto e associar atividades a ele. O sistema realiza
   validações no frontend (como campos obrigatórios e verificação de formatos de e-mail) e no backend (como a existência
   do e-mail).

    - O formulário de cadastro de projeto inclui campos como:
        - Nome do projeto
        - Data de início e término
        - Atividades associadas (título, descrição e status)

2. **Tela de Listagem**: Os projetos cadastrados são exibidos em uma lista, com informações resumidas sobre o nome,
   status de conclusão e as atividades associadas.

3. **Validações de Cadastro**:
    - **E-mail**: O e-mail do usuário é validado no backend para garantir que não exista um cadastro duplicado.
    - **Senha**: A senha do usuário deve ter no mínimo 6 caracteres e ser confirmada corretamente.
    - **Campos obrigatórios**: O sistema valida que todos os campos necessários para o cadastro do projeto e da
      atividade sejam preenchidos.

4. **Design Responsivo**: O layout da aplicação é responsivo, adaptando-se a diferentes tamanhos de tela, proporcionando
   uma experiência agradável tanto em dispositivos móveis quanto em desktop.

## Exemplos de Telas

### Tela de Cadastro de Projeto e Atividades

- O formulário permite que o usuário preencha o nome do projeto, datas de início e término, além de adicionar atividades
  relacionadas.
- Os campos possuem validações e mensagens de erro são exibidas ao usuário caso algum dado obrigatório esteja ausente ou
  incorreto.

### Tela de Listagem de Projetos

- Exibe uma tabela ou lista com os projetos cadastrados, mostrando o nome do projeto e seu status de conclusão.
- Para cada projeto, é possível visualizar as atividades associadas, com a opção de adicionar novas atividades.

## Como Rodar o Projeto

### Backend

1. Clone o repositório:
   ```bash
   git clone https://github.com/usuario/taskflow.git
   cd taskflow

2. Instale as dependências:
   ```bash
   bundle install


3. Configure o banco de dados:
   ```bash
    rails db:create
    rails db:migrate

3. Inicie o servidor:
   ```bash
    rails db:create
    rails db:migrate