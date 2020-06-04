// npm init -y para iniciar o projeto NodeJS (vai criar o package.json)
// Instalar Express (modulo ou dependencia ou package para ajudar a criar um server): npm install express
// Executar o server, no terminal: node src/server.js ou npm start (atalho no package.json). Instalar nodemon (npm install nodemon -D) para reiniciar server automaticamente.
// npm install nunjucks: template engine para deixar o html inteligente (repetir estruturas, usar ifs e fors, etc)

// Importando express dentro da variavel express
const express = require('express')

// Executando a funcao express no server
const server = express()

// Configurando pasta publica
server.use(express.static('public'))

// Utilizando o Nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

//-------------- ROTAS --------------
server.get('/', (req, res) => {
    return res.render('index.html')   // nunjucks envia variaveis para o html atraves do render
})

server.get('/create-point', (req, res) => {
    return res.render('create-point.html')   
})

server.get('/search', (req, res) => {
    return res.render('search-results.html')   
})
//-------------- END ROTAS --------------


// Ligar o server na porta 3000
server.listen(3000)

