// Instalar SQLite3: npm install sqlite3
// Importar a dependencia do SQLite3

const sqlite3 = require('sqlite3').verbose()    // Configura o sqlite para mostrar infromarcoes no terminal

// Criar objeto que ira fazer operacoes no banco de dados
const db = new sqlite3.Database('./src/database/database.db')   // new funciona com constructor ou classe e cria um objeto que esta sendo armazenada na variavel db

module.exports = db

// Utilizar o objeto de banco de dados para as nossas operacoes
// Obs: funcao atrelada a um objeto chama metodo
// db.serialize(() => {
    // Criar uma tabela com comandos SQL
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT, 
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `)

    // Inserir dados na tabela
    // VALUES fica com interrogacoes para serem trocadas de forma dinamica mais tarde
    // const query = `
    //     INSERT INTO places (
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?, ?, ?, ?, ?, ?, ?);
    // `
    
    // const values = [
    //     "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
    //     "Papaersider",
    //     "Guilherme Gemballa, Jardim Ana Maria",
    //     "N 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Resíduos Eletrônicos, Lâmpadas"
    // ]

    // function afterInsertData(err) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log('Cadastrado com sucesso!')
    //     console.log(this)
    // }

    // db.run(query, values, afterInsertData)

    // Consultar os dados da tabela
    // db.all(`SELECT name FROM places`, function(err, rows) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log('Aqui estao seus registros')
    //     console.log(rows)
    // })

    // Deletar um dado da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [3], function(err) {  // Deletar da tabela places o id que eh igual a 1
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log('Registro deletado com sucesso')
    // }) 
// })