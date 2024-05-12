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
<p> O desenvolvimento do sistema começa com o levantamento de requisitos, que são transformados em diagramas para facilitar a compreensão e implementação do sistema. Abaixo podemos observar os diagramas de Caso de Uso (Figura 1), de Classe (Figura 2) e um fluxo de como a arquitetura do sistema funciona (Figura 3).
</p>

Figura 1: Diagrama de Caso de Uso
<img src"/Imagens_do_projeto/Caso de Uso Base.png" >
Figura 2: Diagrama de Classe
Figura 3: Demonstração do fluxo da arquitetura


## Arquitetura
<p>A Arquitetura Limpa, também conhecida como “Clean Architecture”, é um modelo de design de software proposto por Robert C. Martin, também conhecido como Uncle Bob. Ela é organizada em camadas concêntricas, onde cada camada depende da camada imediatamente interna a ela. Vamos explorar as quatro camadas mencionadas: Domain, Infrastructure, API e Client realizadas por meio do ASP.NET Core 8.
*  Domain: Esta biblioteca contém as regras de negócio da aplicação. Ela é independente de qualquer estrutura externa e é onde residem as entidades, que são os objetos que incorporam as regras de negócio. Como é uma biblioteca, ela pode ser facilmente reutilizada em diferentes partes da aplicação ou em diferentes aplicações.
* Infrastructure: Esta biblioteca fornece suporte técnico para as outras camadas. Ela contém tudo o que é necessário para fazer a aplicação funcionar, mas que não está diretamente relacionado com as regras de negócio, como a integração com bancos de dados, servidores, frameworks, etc. No caso do .NET Core, esta biblioteca pode conter a configuração e a implementação dos serviços do .NET Core, como o Entity Framework Core para o acesso a dados.
* API: A camada de API é uma aplicação ASP.NET Core que expõe as funcionalidades do domínio através de uma API REST. Esta camada recebe as requisições dos clientes, as processa e retorna as respostas. Ela usa as bibliotecas de domínio e infraestrutura para realizar seu trabalho
* Client: Esta é a camada mais externa e é onde os usuários interagem com a aplicação. Pode ser uma interface de usuário web, um aplicativo móvel, um script, etc. Esta camada faz requisições para a API REST para acessar as funcionalidades da aplicação.
</p>
<p>
A Arquitetura Limpa permite que as regras de negócio sejam facilmente testadas e que a aplicação seja facilmente mantida e estendida, pois as dependências são direcionadas para o interior. Isso significa que as camadas mais externas podem ser alteradas sem afetar as camadas mais internas
</p>

## Sistema funcional e código fonte
<p>
A seguir, apresentamos a demonstração da arquitetura planejada através do código fonte e sua organização do código (Figura 4 e Figura 5).
</p>

Figura 4: Código Fonte Geral
Figura 5: Código Fonte Front-End 

<p>
Todo sistema deve ter um meio de login e registro de usuários, portanto iniciamos demonstrando suas telas (Figuras 6 e Figura 7).
</p>

Figura 6: Tela de login
Figura 7: Tela de registro

<p>
A principal funcionalidade do software é permitir que os clientes comprem produtos. A a seguir demonstro o fluxo de compra (Figura 8 a Figura 18).
</p>

Figura 8: Tela inicial do sistema
Figura 9: Loja  Listagem de produtos
Figura 10: Loja - Adicionar produtos pela tela de listagem, filtrar, grifado em vermelho a funcionalidade após escolher o tamanho do produto.
Figura 11: Loja - Detalhes do produto, grifado em vermelho a funcionalidade um slide contendo as imagens do produto.
Figura 12: Loja - Carrinho
Figura 13: Loja - Finalização Pedido - Conferir de Endereço
Figura 14: Loja - Finalização Pedido - Método de entrega
Fonte: Elaborado pelo autor
Figura 15: Loja - Finalização Pedido - Revisar
Figura 16: Loja - Finalização Pedido - Pagamento
Figura 17: Loja - Pedido realizado
Figura 18: Loja - Listagem de pedidos

<p>
A venda é validada pela provedora de pagamentos, a Stripe. Primeiro, é criada uma intenção de pagamento (Figura 19). Após a finalização do pedido com cartão de crédito, a Stripe confirma e notifica o sistema através de um webhook que informa a aceitação do pagamento via um endpoint da API do sistema (Figura 20 e Figura 21) sendo assim possível a atualização do status do pedido (Figura 22). O sistema não armazena informações do cartão do cliente, e o processamento é realizado por componentes da Stripe.
</p>

Figura 19: Loja - Criação da Intenção de pagamento
Figura 20: Confirmação Stripe
Figura 22: Pagamento recebido - Stripe
Figura 22: Confirmação Stripe

## Area do administrador

Figura 24: Listagem de marcas
Figura 25: Cadastro de marcas
Figura 26: Edição de marcas
Figura 27: Listagem de tipos
Figura 28: Cadastro de tipos
Figura 29: Edição de tipos
Figura 30: Listagem de unidades
Figura 31: Cadastro de unidades
Figura 32: Edição de unidades
Figura 33: Listagem de tamanhos
Figura 34: Cadastro de tamanhos
Figura 35: Edição de tamanhos
Figura 36: Listagem de produtos
Figura 37: Cadastro de produtos
Figura 38: Edição de produtos
Figura 39: Listagem de metodos de entrega
Figura 40: Cadastro de metodos de entrega
Figura 41: Edição de metodos de entrega
Figura 42: Listagem de movimentações de estoque
Figura 43: Cadastro de movimentações de estoque
Figura 44: Edição de movimentações de estoque

## CONSIDERAÇÕES FINAIS 
<p>
  
Embora o sistema execute operações de venda e recebimento de pagamentos, ele deve ser visto como um protótipo, necessitando de melhorias, como a inclusão de mais meios de pagamento. A funcionalidade de movimentação de estoque ainda está em desenvolvimento. 
</p>
<p>
Todas as funcionalidades inicialmente propóstas foram implementadas com sucesso, seguindo a arquitetura e metodologia propostas. Para cumprir os prazos, optou-se por uma versão simplificada do processo, omitindo etapas como as Sprint Reviews.
</p>
## REFERÊNCIAS BIBLIOGRÁFICAS

CASTRO, ANA PAULA. Com pandemia, comercio eletrônico cresce e movimenta R$ 450 bilhões em três anos no país. G1, maio 2023. Disponível em: <https://g1.globo.com/economia/noticia/2023/05/11/com-pandemia-comercio-eletronico-cresce-e-movimenta-r-450-bilhoes-em-tres-anos-no-pais.ghtml>. Acesso em: 07 set. 2023.

Martin, Robert  Cecil. Arquitetura Limpa: O Guia do Artesão para Estrutura e Design de Software. Alta Books Editora, 2019.

Microsoft. ASP.NET Documentation. Microsoft Corporation. Disponível em: <https://learn.microsoft.com/en-us/aspnet/core/?view=aspnetcore-8.0>. Acesso em: 11 mai. 2024.

Stripe. ASP.NET Documentation. Stripe. Disponível em: <https://docs.stripe.com/?locale=pt-BR>. Acesso em: 12 mai. 2024.



