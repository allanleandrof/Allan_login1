const cadastroServices = require('../services/cadastroServices');
const cadatroService = require('../services/cadastroServices');

module.exports = {
    inserir: async(req, res) => {
        let json = {error:'', result:{}};

        let nomeSobrenome = req.body.nomeSobrenome;
        let nomeUsuario = req.body.nomeUsuario;
        let email = req.body.email;
        let senha = req.body.senha;

        if (nomeSobrenome && nomeUsuario && email && senha){
            let cadastroCodigo = await cadastroServices.inserir(nomeSobrenome, nomeUsuario, email, senha);
            json.result = {
                codigo: cadastroCodigo,
                nomeSobrenome,
                nomeUsuario,
                email,
                senha
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

}