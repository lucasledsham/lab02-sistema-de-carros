# Sistema de Aluguel de Carros

## Visão Geral
Este projeto consiste no desenvolvimento de um sistema robusto para a gestão de aluguéis de automóveis, permitindo que usuários realizem, modifiquem e cancelem pedidos de aluguel de forma online. A plataforma foi desenvolvida para atender tanto clientes individuais quanto agentes (empresas e bancos), cada um com seus respectivos níveis de acesso e funcionalidades.

- Link para acessar o projeto: https://calycate-candie-uncurved.ngrok-free.dev/

## Funcionalidades Principais

### 1. Gestão de Usuários e Acessos
- **Cadastro Obrigatório:** O acesso ao sistema é restrito a usuários previamente cadastrados.  
- **Perfis de Usuário:**
  - **Clientes (Usuários Individuais):** Podem criar, modificar, consultar e cancelar seus próprios pedidos de aluguel.  
  - **Agentes (Empresas e Bancos):** Possuem permissão para modificar e avaliar os pedidos de aluguel submetidos pelos clientes.  

### 2. Ciclo de Vida do Pedido de Aluguel
- **Criação do Pedido:** Clientes podem iniciar um novo pedido de aluguel através da plataforma.  
- **Análise Financeira:** Os pedidos submetidos são analisados financeiramente pelos agentes cadastrados no sistema.  
- **Aprovação e Contrato:** Após um parecer financeiro positivo, o pedido fica disponível para a efetivação do contrato de aluguel.  

### 3. Gerenciamento de Dados
O sistema foi projetado para armazenar de forma segura e organizada as seguintes informações:

- **Dados dos Contratantes:**
  - Identificação: RG, CPF, Nome, Endereço.  
  - Informações Profissionais: Profissão, entidades empregadoras e até 3 fontes de rendimento.  

- **Dados dos Automóveis:**
  - Matrícula, Ano, Marca, Modelo e Placa.  

- **Propriedade do Veículo:**  
  O sistema permite registrar o automóvel como propriedade do cliente, da empresa locadora ou do banco financiador, dependendo da modalidade do contrato.  

- **Contratos de Crédito:**  
  Possibilidade de associar um aluguel a um contrato de crédito concedido por um dos bancos parceiros cadastrados como agentes.  

## Arquitetura do Sistema
O sistema é baseado em uma arquitetura cliente-servidor, com o servidor central conectado aos computadores locais dos clientes e aos sistemas dos agentes através da Internet.

Ele é dividido em dois subsistemas principais:

- **Subsistema de Gestão de Pedidos e Contratos:** Responsável por toda a lógica de negócio, incluindo o processamento de pedidos, validações, análises financeiras e gerenciamento de contratos.  
- **Subsistema de Construção de Páginas Web:** Responsável pela renderização dinâmica das interfaces com o usuário.

## Tecnologias
- Spring boot, React, Typescript, Tailwind e mongoDB.

