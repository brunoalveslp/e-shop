# E-Shop: Uma Plataforma de Comércio Eletrônico em .NET e Angular

<p> Este trabalho foca no desenvolvimento de um aplicativo de e-commerce com .NET e Angular, considerando a importância crescente do e-commerce após a pandemia. O objetivo é criar uma plataforma eficiente, segura e intuitiva para compras online, seguindo a arquitetura limpa. A escolha das tecnologias e da arquitetura é justificada pela relevância no mercado e potencial de contribuição para a comunidade. A metodologia ágil SCRUM foi utilizada. Os resultados incluem um software bem projetado e organizado que pode servir como base para outros projetos, proporcionando uma experiência valiosa para o mercado de trabalho.
</p>

## Como Rodar o projeto
Primeiro, recomendo fortemente que utilize o Visual Studio 2022 Community Edition para este projeto.

Passo 1: Faça o donwload e instalação do .NET 8 SDK: Você pode encontrar neste <a href="https://dotnet.microsoft.com/pt-br/download/dotnet/8.0">link</a>.<br>
Passo 2: Baixe o código da aplicação: Você pode clonar o repositório ou baixar o código como um arquivo ZIP.<br>
Passo 3: Instale as dependências do projeto: Navegue até a pasta do projeto no terminal e execute o comando dotnet restore. Isso irá baixar e instalar todos os pacotes NuGet necessários para o projeto.<br>
```
dotnet restore
```
Passo 4: Instalar e configurar o PostgresSql: Você pode encontrar neste <a href="https://www.postgresql.org/download/">link</a>.<br>
Passo 5: Instalar o Docker: Você pode encontrar neste <a href="https://www.docker.com/products/docker-desktop/">link</a>.<br>
Passo 6: Realizar a configuração do Redis no Docker: Há um arquivo de configuração docker-compose.yml na pasta raiz do projeto, este arquivo tem o seguinte conteúdo.<br>
```
services:

  redis:
    image: redis:latest
    ports:
      - 6379:6379
    command: ["redis-server", "--appendonly", "yes"]
    volumes:
      - redis-data:/data

  redis-commander:
    image: rediscommander/redis-commander:latest
    environment:
      - REDIS_HOSTS=local:redis:6379
      - HTTP_USER=root
      - HTTP_PASSWORD=secret
    ports:
      - 8081:8081
    depends_on:
      - redis
    
volumes:
  redis-data:
```
<br>
Para facilitar, basta abrir o powershell na pasta com este arquivo e rodar o seguinte comando.

```
docker-compose up --detach
```
<br>
Passo 7: Alterar as configurações da conexão com o Postgres do projeto: Na pasta API no arquivo appsettings.json alterar as configurações do Host, Database, Username e Password.

```
 "ConnectionStrings": {
    "DefaultConnection": "Host=localhost; Database=eshop; Username=postgres; Password=master",
    "IdentityConnection": "Host=localhost; Database=eshop-users; Username=postgres; Password=master",
    "Redis": "localhost"
  }
```
<br>
Passo 8: Rodar os comandos para gerar os bancos de dados:
No Nuget Console

```
Update-Database -Context AppIdentityDbContext -Project Infrastructure
Update-Database -Context StoreDbContext -Project Infrastructure
```
No console
```
dotnet ef database update -c AppIdentityDbContext -p .\Infrastructure\Infrastructure.csproj
dotnet ef database update -c StoreDbContext -p .\Infrastructure\Infrastructure.csproj
```
<br>
Passo 9: Atualize os dados de integração com a Stripe: No arquivo appsettings.json e no controlador em API/Controllers/PaymentController.cs
No appsettings.json

```
"StripeSettings": {
    "PublishableKey": "pk_test_51Om2WKFYstaow4m6KfJj2wUSpP1bSN3tpmcODZ1VIhUBROorNrCJApeWZOmbelyop5RGgW6OxfRYGp2oenFIg7SN00CDM2mNSQ",
    "SecretKey": "sk_test_51Om2WKFYstaow4m6BaQSJBdsWn3eXD3NOhkvrsjhmBu0mdP9on3aCosHSUnCgZIc96UFstTyGXGAuhCi5gnr00Ym00x8cPCnmV"
  }
```
No controller
```
private const string WebhookSecret = "whsec_733c88e502c45981dd8a7a7880680e7f46cb6aa9481671634592ffc4481b737f";
```
<br>
Passo 10: Realize a insatalação do listener da stripe: no meu caso eu utilizo o arquivo stripe.exe rodando via terminal, no seu caso pode ser diferente, validar a documentação e configuração do listener para a seu caso, segue <a href="https://docs.stripe.com/webhooks?locale=pt-BR">link</a>.<br>

Passo 11: Instale o Angular CLI: segue <a href="https://angular.io/cli">link</a>

Passo  12: Construa e execute a aplicação backend: Ainda no terminal, você pode construir a aplicação com o comando dotnet build e depois executá-la com dotnet run, ou clicar no simbolo de play no VS2022.
Na pasta API abra o terminal ou execute o projeto API pelo VS2022

```
dotnet build
dotnet run
```

Passo 12: Execute o front end da aplicação: Com um console na pasta Client rode o seguinte comando.
```
ng s
OU
ng serve
```
<br>

## Diagramas
O desenvolvimento do sistema começa com o levantamento de requisitos, que são transformados em diagramas para facilitar a compreensão e implementação do sistema. Abaixo podemos observar os diagramas de Caso de Uso (Figura 1), de Classe (Figura 2) e um fluxo de como a arquitetura do sistema funciona (Figura 3).

Figura 1: Diagrama de Caso de Uso
![Diagrama de Caso de Uso](./Imagens_do_projeto/Caso_de_Uso_Base.png)

Figura 2: Diagrama de Classe
![Diagrama de Classe](./Imagens_do_projeto/Diagrama_de_Classe.png)

Figura 3: Demonstração do fluxo da arquitetura
![Demonstração do fluxo da arquitetura](./Imagens_do_projeto/Fluxo_da_Arquitetura.png)


## Arquitetura

A Arquitetura Limpa é um modelo de arquitetura de software proposto por Robert C. Martin, também conhecido como Uncle Bob ou “Tio Bob” em tradução livre, e é detalhada em seu livro “Arquitetura Limpa: O Guia do Artesão para Estrutura e Design de Software” (MARTIN, 2019).

A arquitetura é organizada em camadas concêntricas lembrando o formato de uma cebola que é outra nomenclatura comum para esta arquitetura, onde cada camada depende da camada interna de uma forma que encapsula o comportamento contido nas mais internas, não as expondo diretamente. O autor menciona quatro camadas em seu livro e abaixo explicamos como nesta aplicação ASP.NET Core como estão implementadas.
Entidades (Domain/Domínio): Esta camada correspondente à biblioteca de domínio contém as regras de negócio da aplicação. Ela é independente de qualquer estrutura externa e é onde residem as entidades, que são os objetos que incorporam as regras de negócio (MARTIN, 2019, p.204).
Casos de Uso (Infrastructure/Infraestrutura): Esta camada, correspondente à biblioteca de infraestrutura, fornece suporte técnico para as outras camadas. Ela contém tudo o que é necessário para fazer a aplicação funcionar, mas que não está diretamente relacionado com as regras de negócio, como a integração com bancos de dados, servidores, frameworks, etc. (MARTIN, 2019, p.204).
Adaptadores de Interface (API/Application Programing Interface): A camada de API é uma aplicação ASP.NET Core que expõe as funcionalidades do domínio através de uma API REST. Esta camada recebe as requisições dos clientes, as processa e retorna as respostas. Ela usa as bibliotecas de domínio e infraestrutura para realizar seu trabalho (MARTIN, 2019, p.205).
Frameworks e Drivers (Client/Cliente): Esta é a camada mais externa e é onde os usuários interagem com a aplicação. Pode ser uma interface de usuário web, um aplicativo móvel, um script, etc. Esta camada faz requisições para a API REST para acessar as funcionalidades da aplicação (MARTIN, 2019, p.205).


Neste projeto, a Arquitetura Limpa foi implementada em conjunto com os padrões de design Repository Pattern, Specification Pattern e Unit of Work para abstrair a complexidade da lógica de acesso a dados. O padrão Unit Of Work é utilizado para agrupar várias operações em uma única transação (FOWLER, 2006). O Repository Pattern faz abstração da lógica de acesso a dados do resto do código (EVANS, 2003. cap. 6 p. 90 - 99) também implementado através de um repositório genérico para uso geral da aplicação e um específico para ser utilizado no carrinho, pois este utiliza o Redis como banco de dados (MICROSOFT, 2020). O Specification Pattern é usado para encapsular a lógica de negócios complexa em uma especificação que pode ser reutilizada, fazendo por exemplo a união entre duas tabelas trazendo os dados relacionados. (EVANS, 2003. cap.14 p. 214 - 255).

A Arquitetura Limpa permite que as regras de negócio sejam facilmente testadas e que a aplicação seja facilmente mantida e estendida, pois as dependências são direcionadas para o interior. Isso significa que as camadas mais externas podem ser alteradas sem afetar as camadas mais internas (MARTIN, Robert C., 2019, p.206-209).


## Sistema funcional e código fonte

A seguir, apresentamos a demonstração da arquitetura planejada através do código fonte e sua organização do código.

Figura 4: Código Fonte Geral
![Código Fonte Geral](./Imagens_do_projeto/Codigo_Fonte_Geral.png)

Figura 5: Código Fonte Front-End 
![Código Fonte Front-End](./Imagens_do_projeto/Codigo_Fonte_Front_End.png)

Todo sistema deve ter um meio de login e registro de usuários, portanto iniciamos demonstrando suas telas.

Figura 6: Tela de login
![Tela de login](/Imagens_do_projeto/Tela_Login.png)

Figura 7: Tela de registro
![Tela de registro](/Imagens_do_projeto/Tela_Registro.png)

Figura 8: Tela de registro - Registrando
![Tela de registro](/Imagens_do_projeto/Tela_Registrando.png)

A principal funcionalidade do software é permitir que os clientes comprem produtos. A a seguir demonstro o fluxo de compra.

Figura 9: Tela inicial do sistema
![Tela inicial do sistema](/Imagens_do_projeto/Tela_Inicial.png)

Figura 10: Loja  Listagem de produtos
![Loja  Listagem de produtos](/Imagens_do_projeto/Loja_Listagem_Produtos.png)

Figura 11: Loja - Adicionar produtos pela tela de listagem, filtrar, grifado em vermelho a funcionalidade após escolher o tamanho do produto.
![Loja - Adicionar produtos pela tela de listagem, filtrar, grifado em vermelho a funcionalidade após escolher o tamanho do produto.](/Imagens_do_projeto/Loja_Adicionar_Produtos.png)
![Loja - Adicionar produtos pela tela de listagem, filtrar, grifado em vermelho a funcionalidade após escolher o tamanho do produto.](/Imagens_do_projeto/escolhendo-tamanho-e-adicionando.png)

Figura 12: Loja - Detalhes do produto, grifado em vermelho a funcionalidade um slide contendo as imagens do produto.
![Loja - Detalhes do produto, grifado em vermelho a funcionalidade um slide contendo as imagens do produto.](/Imagens_do_projeto/Loja_Detalhes_Produto.png)

Figura 13: Loja - Carrinho
![Loja - Carrinho](/Imagens_do_projeto/Loja_Carrinho.png)

Figura 14: Loja - Finalização Pedido - Conferir de Endereço
![Loja - Finalização Pedido - Conferir de Endereço](/Imagens_do_projeto/Loja_Finalizacao_Pedido_Conferir_Endereco.png)

Figura 15: Loja - Finalização Pedido - Método de entrega
![Loja - Finalização Pedido - Método de entrega](/Imagens_do_projeto/Loja_Finalizacao_Pedido_Metodo_Entrega.png)

Figura 16: Loja - Finalização Pedido - Revisar
![Loja - Finalização Pedido - Revisar](/Imagens_do_projeto/Loja_Finalizacao_Pedido_Revisar.png)

Figura 17: Loja - Finalização Pedido - Pagamento
![Loja - Finalização Pedido - Pagamento](/Imagens_do_projeto/Loja_Finalizacao_Pedido_Pagamento.png)

Figura 18: Loja - Pedido realizado
![Loja - Pedido realizado](/Imagens_do_projeto/Loja_Pedido_Realizado.png)

Figura 19: Loja - Listagem de pedidos
![Loja - Listagem de pedidos](/Imagens_do_projeto/Loja_Listagem_Pedidos.png)

Figura 20: Loja - Detalhes de pedido
![Loja - Listagem de pedidos](/Imagens_do_projeto/Loja_Detalhes_Pedido.png)

A venda é validada pela provedora de pagamentos, a Stripe. Primeiro, é criada uma intenção de pagamento.

Figura 21: Loja - Criação da Intenção de pagamento
![Loja - Criação da Intenção de pagamento](/Imagens_do_projeto/Loja_Criacao_Intencao_Pagamento.png)

Figura 22: Confirmação Stripe
![Confirmação Stripe](/Imagens_do_projeto/Confirmacao_Stripe.png)

Figura 23: Pagamento recebido - Stripe
![Pagamento recebido - Stripe](/Imagens_do_projeto/Pagamento_Recebido_Stripe.png)

Figura 24: Pagamento recebido - Stripe - Detalhes
![Confirmação Stripe](/Imagens_do_projeto/Pagamento_Recebido_Stripe_Detalhes.png)

## Area do administrador

Figura 25: Listagem de marcas
![Listagem de marcas](/Imagens_do_projeto/Listagem_Marcas.png)

Figura 26: Cadastro de marcas
![Cadastro de marcas](/Imagens_do_projeto/Cadastro_Marcas.png)

Figura 27: Edição de marcas
![Edição de marcas](/Imagens_do_projeto/Edicao_Marcas.png)

Figura 28: Listagem de tipos
![Listagem de tipos](/Imagens_do_projeto/Listagem_Tipos.png)

Figura 29: Cadastro de tipos
![Cadastro de tipos](/Imagens_do_projeto/Cadastro_Tipos.png)

Figura 30: Edição de tipos
![Edição de tipos](/Imagens_do_projeto/Edicao_Tipos.png)

Figura 31: Listagem de unidades
![Listagem de unidades](/Imagens_do_projeto/Listagem_Unidades.png)

Figura 32: Cadastro de unidades
![Cadastro de unidades](/Imagens_do_projeto/Cadastro_Unidades.png)

Figura 33: Edição de unidades
![Edição de unidades](/Imagens_do_projeto/Edicao_Unidades.png)

Figura 34: Listagem de tamanhos
![Listagem de tamanhos](/Imagens_do_projeto/Listagem_Tamanhos.png)

Figura 35: Cadastro de tamanhos
![Cadastro de tamanhos](/Imagens_do_projeto/Cadastro_Tamanhos.png)

Figura 36: Edição de tamanhos
![Edição de tamanhos](/Imagens_do_projeto/Edicao_Tamanhos.png)

Figura 37: Listagem de produtos
![Listagem de produtos](/Imagens_do_projeto/Listagem_Produtos.png)

Figura 38: Cadastro de produtos
![Cadastro de produtos](/Imagens_do_projeto/Cadastro_Produtos.png)

Figura 39: Edição de produtos
![Edição de produtos](/Imagens_do_projeto/Edicao_Produtos.png)

Figura 40: Listagem de metodos de entrega
![Listagem de metodos de entrega](/Imagens_do_projeto/Listagem_Metodos_Entrega.png)

Figura 41: Cadastro de metodos de entrega
![Cadastro de metodos de entrega](/Imagens_do_projeto/Cadastro_Metodos_Entrega.png)

Figura 42: Edição de metodos de entrega
![Edição de metodos de entrega](/Imagens_do_projeto/Edicao_Metodos_Entrega.png)

Figura 43: Listagem de movimentações de estoque
![Listagem de movimentações de estoque](/Imagens_do_projeto/Listagem_Movimentacoes_Estoque.png)

Figura 44: Cadastro de movimentações de estoque
![Cadastro de movimentações de estoque](/Imagens_do_projeto/Cadastro_Movimentacoes_Estoque.png)


## Considerações Finais 

O sistema de e-commerce desenvolvido, embora funcional, é um protótipo com espaço para melhorias e refinamentos. A inclusão de mais opções de pagamento e o desenvolvimento da funcionalidade de gerenciamento de estoque são áreas-chave para aprimoramento. Todas as funcionalidades propostas foram implementadas com sucesso, graças à metodologia Ágil Scrum e à arquitetura limpa. No entanto, a inclusão de etapas como as Sprint Reviews em futuros ciclos de desenvolvimento pode trazer insights valiosos. O projeto demonstrou a importância de uma arquitetura sólida, uma metodologia de desenvolvimento eficaz e a necessidade de flexibilidade no desenvolvimento de software. À medida que o sistema evolui, ele se aproxima de se tornar uma solução de e-commerce robusta e confiável.

## Referencias

MARTIN, ROBERT  C. Arquitetura Limpa: O Guia do Artesão para Estrutura e Design de Software. 1. ed, Tradução: Samantha Batista, Rio de Janeiro: ed. Alta Books Editora, 2019 cap. 22, p 201-209.

FOWLER, MARTIN. Padrões de Arquitetura de Aplicações Corporativas. 1. ed, Tradução: Acauan Fernandes, Porto Alegre: ed. Bookman Editora, 2006 cap.11 p 187-213.


EVANS, ERIC. Domain-Driven Design: Tackling Complexity in the Heart of Software. 1. ed, Boston: ed. Addison-Wesley, 2006 cap.6 p 90 - 99, cap.14 p 214 - 255 .

MICROSOFT. ASP.NET Documentation. Microsoft Corporation. Disponível em: <https://docs.microsoft.com/en-us/aspnet/core/>. Acesso em: 25 mai. 2024.

STRIPE. Stripe documentation. Stripe. Disponível em: <https://docs.stripe.com/?locale=pt-BR>. Acesso em: 12 mai. 2024.


