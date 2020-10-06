# Desafio_Zhealth

## 1) Execução

### 1.1) Clonar repositório do projeto e instalar suas dependências

```
$ git clone https://github.com/brunnooliver7/Desafio_Zhealth
$ cd Desafio_Zhealth
$ npm i
```
### 1.2) Iniciar o servidor

```
$ npm start
```

ou:

```
$ npm run dev
```

Se o banco de dados estabelecer a conexão a aplicação executar de forma correta, você deve receber a seguinte resposta:

```
Mongo connected!
Server is running on Port 4000
```

### 1.3) Docker

Também é possível executar a API através de containers.

```
$ docker-compose up --build
```

## 2) Consumo da API

Com a API em funcionamento, o primeiro passo é registrar um ou mais médicos, onde será retornado o objeto<sup>*</sup> salvo juntamento com um token de acesso.

*<i>A senha salva é criptografada e não é retornada nas requisições GET</i>

Com o(s) médico(s) cadastrado(s), é possível verificar sua autenticidade na forma de login com o email e a senha. O objeto salvo será retornado juntamente com um novo token. 

Com o token, é possível registrar prescrições para os médicos cadastrados. Podemos também obter as prescrições de um determinado médico desde que tenhamos o seu ID.

## 3) Testes

### 3.1) Realizar testes

Foram realizados testes com os controllers de médicos, de prescrições e de autenticação de usuários. Os testes podem ser realizados através do comando:

```
$ npm run test
```

### 3.2) Verificar a cobertura dos testes

Em seguida, é possível gerar arquivos de relatório a respeito dos testes realizados. Execute o comando a seguir e a pasta `coverage` será criada. 

```
$ npm run coverage
```

Acesse `coverage/lcov-report/index.html` no browser para visualizar o relatório.