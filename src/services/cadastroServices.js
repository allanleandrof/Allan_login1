const db = require('../db');

module.exports = {
    inserir: (nomeSobrenome, nomeUsuario, email, senha)=> {
        return new Promise((aceito, rejeitado)=> {

            db.query('INSERT INTO cadastros (nomeSobrenome, nomeUsuario, email, senha) VALUES (?, ?, ?, ?)',
                [nomeSobrenome, nomeUsuario, email, senha],
                (error, results)=>{
                    if(error){ rejeitado(error); return; }
                    aceito(results.insertCodigo); //insertId
                }
            );
        });
    },
};