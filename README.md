# PLANEJ.AI

Olá. Me chamo Arthur e esse é o meu repositório do Planej.ai, aplicação de ajuda financeira desenvolvida como prática de conhecimento da bootcamp de React e I.A generativa do Santander Academy em parceria com a DIO.me utilizando [React](https://react.dev/) com [TypeScript](https://www.typescriptlang.org/), a API Gemni Flash generative e as bibliotecas [Tailwindcss](https://tailwindcss.com/docs/installation/using-vite), [Lucide Icons](https://lucide.dev/) e [React Loading Skeleton](https://github.com/dvtng/react-loading-skeleton).

# Como rodar

- Instale o [Node.js](https://nodejs.org/pt-br) para seu sistema operacional (de preferência, a versão mais recente);
- Clone o repositório em um diretório da sua preferência;
- No prompt de comando, no diretório onde você colocou o projeto, rode o seguinte comando:
  ```
  npm install
  ```
  ou:
  ```
  npm i
  ```
  para baixar as dependências necessárias;

Após a instalação das pedendências, use o comando:

```
npm run dev
```

para executar o projeto, copie o endereço gerado do terminal e cole na barra de pesquisa do navegador.

# Sobre o projeto

O Planej.ai possui quatro funcionalidades principais: simulações financeiras, diagnósticos financeiros, uma conversa com inteligência artificial e um histórico de simulações.

Primeiro é feita a simulação onde o usuário informa sua renda, gastos e dívidas, a meta que deseja alcançar, o valor da meta e o prazo para alcançá-la.

Depois, é feito um diagnóstico através do Google Gemni em relação às informações passadas para saber se a meta é viável e o que é possível fazer caso não seja.

Após, o usuário pode conversar com o Gemni para tirar dúvidas ou ter mais informações a respeito do plano financeiro apresentado.

Essas informações ficam salvas na localstorage do navegador e podem ser acessadas na aba de histórico da aplicação. Caso o usuário desejar, ele pode excluir uma simulação.

# Melhorias em relação ao original

Como melhorias, há:

- O componente `FinancialSummary.tsx` que elimina o a necessidade de passar componentes `Card.tsx` separados para cada informação do resumo financeiro do usuário.
- A ref "messagesEndRef" usada para fazer a rolagem automática para o fim do chat ao enviar uma mensagem e quando chega a resposta do Gemni.
- Um método separado para envio de mensagens que salva a mensagem do usuário na localstorage antes de enviar para o Gemni.
- Um método separado para requisição de resposta do Gemni com base na última mensagem enviada, no histórico de interações, na simulação e no diagnóstico já provido pelo Gemni.

Tendo em mente que esses últimos dois pontos foi mais uma questão estética para retornar na tela primeiro a mensagem do usuário e, depois de salva na localstorage, a resposta do Gemni.

# Aprendizado

Ao longo do projeto, aprendi a fazer as configurações iniciais de um projeto React, a usar de fato o React no front-end de uma aplicação, como fazer integração com APIs, a integrar o Gemni Flash em um projeto, a estruturar um prompt de i.a e o retorno das informações, e a usar o Tailwind desde a instalação e configuração até o uso das classes em elementos HTML.

# Contato

Caso desejar, pode me contatar através do LinkedIn ou ver meu perfil na DIO.

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=30A3DC)](https://www.linkedin.com/in/arthur-silva-42aa33197)
[![Perfil DIO](https://img.shields.io/badge/-Meu%20Perfil%20na%20DIO-30A3DC?style=for-the-badge)](https://web.dio.me/users/arthur1601_ssilva/)
