# E-Shop: Uma Plataforma de Comércio Eletrônico em .NET e Angular

<p> Este projeto é um e-commerce desenvolvido em .Net usando ASP.NET Core, Entity Framework, Identity Framework e outras ferramentas e Angular usando NGX-Bootstrap, Angular Material entre outros. </p>
<p>
Sua finalizade é estudar diversos pontos da engenharia de software, o principal arquitetura de software.
</p>
<p>
Este projeto visa implementar de uma forma simples a Clean Architecture, sendo o mais simples possível, portanto utilizo 4 camadas, Domain, Infrastruture, API e Client.
O meio de pagamento deste projeto é o STRIPE, não sendo guardado dados do cartão de crédito do cliente em nenhuma forma no sistema.
Este projeto ainda está em desenvolvimento.
</p>

## Introdução
<p>  
O comércio eletrônico é uma área de crescente importância na sociedade atual, sendo este avanço ainda maior nos anos pós pandemia onde ocorreu o aumento do consumo online e mudança de hábitos de compras dos consumidores (CASTRO, 2023). O desenvolvimento de um aplicativo de e-commerce permitirá explorar e entender melhor os desafios e oportunidades desse mercado em constante expansão, agregando assim relevância ao TCC.</p>
<p>
A escolha das tecnologias .NET e Angular se dá pois ambas são ferramentas amplamente utilizadas no desenvolvimento web e oferecem ferramentas poderosas para a criação de aplicações modernas e escaláveis, sendo assim aprofundar se nessas tecnologias permitirá adquirir habilidades técnicas valiosas em alinhamento com o mercado de trabalho atual.
A escolha da arquitetura limpa para o desenvolvimento do aplicativo se dá por sua manutenibilidade do código, através de sua divisão em várias camadas como por exemplo as camadas de Apresentação, Aplicação, Infraestrutura e Domínio. Esta arquitetura comumente aplica conceitos de design de software como Inversão de dependência, código limpo, onde temos uma aplicação robusta, flexível e adaptável para futuras mudanças. Com isso será possível demonstrar competências em design de software e organização de projetos e código.
</p>
<p>
	O objetivo geral é desenvolver um aplicativo de e-commerce utilizando as tecnologias .NET e Angular seguindo os princípios da Clean Architecture, para oferecer aos usuários uma plataforma eficiente, segura e intuitiva para realização de compras online, contribuindo para modernização do comércio eletrônico e a comunidade de desenvolvedores.
Para atingir o objetivo geral proposto, faz-se necessário atingir os objetivos específicos:
</p>
<p>
Análise de Requisitos e Definição de Escopo;
* Escolha de Tecnologias e Arquitetura;
* Desenvolvimento do Back End em Asp.NET implementando os requisitos e arquitetura definida;
* Desenvolvimento do Front End utilizando o framework Angular;
* Integração com a plataforma de pagamentos Stripe;
* Documentação e Entrega;
* Apresentação e Conclusão;
</p>
<p>
	A escolha por desenvolver este aplicativo com a plataforma .NET e Angular integrando com a ferramenta de pagamentos Stripe e seguindo a arquitetura limpa, é justificável por sua relevância no contexto e mercado atual, através da contribuição potencial para a comunidade e a aplicação das habilidades técnicas, estes fatores transformam o projeto em um desafio estimulante e valioso para o TCC.
</p>


## Diagramas
O desenvolvimento do sistema começa com o levantamento de requisitos, que são transformados em diagramas para facilitar a compreensão e implementação do sistema. Abaixo podemos observar os diagramas de Caso de Uso (Figura 1), de Classe (Figura 2) e um fluxo de como a arquitetura do sistema funciona (Figura 3).

Figura 1: Diagrama de Caso de Uso
![Diagrama de Caso de Uso](/Imagens_do_projeto/Caso_de_Uso_Base.png)

Figura 2: Diagrama de Classe
![Diagrama de Classe](/Imagens_do_projeto/Diagrama_de_Classe.png)

Figura 3: Demonstração do fluxo da arquitetura
![Demonstração do fluxo da arquitetura](/Imagens_do_projeto/Fluxo_da_Arquitetura.png)


## Arquitetura

A Arquitetura Limpa, também conhecida como “Clean Architecture”, é um modelo de design de software proposto por Robert C. Martin, também conhecido como Uncle Bob. Ela é organizada em camadas concêntricas, onde cada camada depende da camada imediatamente interna a ela. Vamos explorar as quatro camadas mencionadas: Domain, Infrastructure, API e Client realizadas por meio do ASP.NET Core 8.

- **Domain**: Esta biblioteca contém as regras de negócio da aplicação. Ela é independente de qualquer estrutura externa e é onde residem as entidades, que são os objetos que incorporam as regras de negócio. Como é uma biblioteca, ela pode ser facilmente reutilizada em diferentes partes da aplicação ou em diferentes aplicações.
- **Infrastructure**: Esta biblioteca fornece suporte técnico para as outras camadas. Ela contém tudo o que é necessário para fazer a aplicação funcionar, mas que não está diretamente relacionado com as regras de negócio, como a integração com bancos de dados, servidores, frameworks, etc. No caso do .NET Core, esta biblioteca pode conter a configuração e a implementação dos serviços do .NET Core, como o Entity Framework Core para o acesso a dados.
- **API**: A camada de API é uma aplicação ASP.NET Core que expõe as funcionalidades do domínio através de uma API REST. Esta camada recebe as requisições dos clientes, as processa e retorna as respostas. Ela usa as bibliotecas de domínio e infraestrutura para realizar seu trabalho.
- **Client**: Esta é a camada mais externa e é onde os usuários interagem com a aplicação. Pode ser uma interface de usuário web, um aplicativo móvel, um script, etc. Esta camada faz requisições para a API REST para acessar as funcionalidades da aplicação.

A Arquitetura Limpa permite que as regras de negócio sejam facilmente testadas e que a aplicação seja facilmente mantida e estendida, pois as dependências são direcionadas para o interior. Isso significa que as camadas mais externas podem ser alteradas sem afetar as camadas mais internas.

## Sistema funcional e código fonte

A seguir, apresentamos a demonstração da arquitetura planejada através do código fonte e sua organização do código.

Figura 4: Código Fonte Geral
![Código Fonte Geral](/Imagens_do_projeto/Codigo_Fonte_Geral.png)

Figura 5: Código Fonte Front-End 
![Código Fonte Front-End](/Imagens_do_projeto/Codigo_Fonte_Front_End.png)

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

Embora o sistema execute operações de venda e recebimento de pagamentos, ele deve ser visto como um protótipo, necessitando de melhorias, como a inclusão de mais meios de pagamento. A funcionalidade de movimentação de estoque ainda está em desenvolvimento.

Todas as funcionalidades inicialmente propostas foram implementadas com sucesso, seguindo a arquitetura e metodologia propostas. Para cumprir os prazos, optou-se por uma versão simplificada do processo, omitindo etapas como as Sprint Reviews.

## Referências Bibliográficas

CASTRO, ANA PAULA. Com pandemia, comercio eletrônico cresce e movimenta R$ 450 bilhões em três anos no país. G1, maio 2023. Disponível em: [Link](https://g1.globo.com/economia/noticia/2023/05/11/com-pandemia-comercio-eletronico-cresce-e-movimenta-r-450-bilhoes-em-tres-anos-no-pais.ghtml). Acesso em: 07 set. 2023.

Martin, Robert Cecil. Arquitetura Limpa: O Guia do Artesão para Estrutura e Design de Software. Alta Books Editora, 2019.

Microsoft. ASP.NET Documentation. Microsoft Corporation. Disponível em: [Link](https://learn.microsoft.com/en-us/aspnet/core/?view=aspnetcore-8.0). Acesso em: 11 mai. 2024.

Stripe. ASP.NET Documentation. Stripe. Disponível em: [Link](https://docs.stripe.com/?locale=pt-BR). Acesso em: 12 mai. 2024.

