// npm init -y para iniciar o projeto NodeJS (vai criar o package.json)
// Instalar Express (modulo ou dependencia ou package para ajudar a criar um server): npm install express
// Executar o server, no terminal: node src/server.js ou npm start (atalho no package.json). Instalar nodemon (npm install nodemon -D) para reiniciar server automaticamente.
// npm install nunjucks: template engine para deixar o html inteligente (repetir estruturas, usar ifs e fors, etc)

// Importando express dentro da variavel express
const express = require('express')

// Executando a funcao express no server
const server = express()

// Pegar o banco de dados
const db = require('./database/db')

// Configurando pasta publica
server.use(express.static('public'))

// Habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

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
    // req.query: Query Strings da url
    console.log(req.query)


    return res.render('create-point.html')   
})

server.post('/savepoint', (req, res) => {

    // req.body: Corpo do formulario
     // Inserir dados na tabela
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `
    // Colocando os valores do req.body nos values da query
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send('Erro no cadastro')
        }

        console.log('Cadastrado com sucesso!')
        console.log(this)

        return res.render('create-point.html', { saved: true })
    }

    db.run(query, values, afterInsertData)
})

server.get('/search', (req, res) => {

    const search = req.query.search

    if(search == '') {
        return res.render('search-results.html', { total: 0 })
    }

    // Consultar os dados da tabela
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        // Mostrar a pagina html com os dados do banco de dados
        return res.render('search-results.html', { places: rows, total })   // Era pra ser total: total, mas como eh igual da pra simplificar   
    })

})
//-------------- END ROTAS --------------




// Ligar o server na porta 3000
server.listen(3000)

