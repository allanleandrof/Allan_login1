/**
 * @swagger
 * tags:
 *   name: Cadastro
 *   description: API para gerenciamento de cadastros
 */

/**
 * @swagger
 * /cadastro/inserir:
 *   post:
 *     summary: Inserir um novo cadastro
 *     tags: [Cadastro]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeSobrenome:
 *                 type: string
 *               nomeUsuario:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cadastro inserido com sucesso
 *         content:
 *           application/json:
 *             example:
 *               result:
 *                 codigo: 123
 *                 nomeSobrenome: John Doe
 *                 nomeUsuario: johndoe
 *                 email: johndoe@example.com
 *                 senha: ********
 *       400:
 *         description: Campos não enviados
 *         content:
 *           application/json:
 *             example:
 *               error: Campos não enviados
 */

const cadastroServices = require('../services/cadastroServices');

module.exports = {
    /**
     * @swagger
     * /cadastro/inserir:
     *   post:
     *     summary: Inserir um novo cadastro
     *     tags: [Cadastro]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nomeSobrenome:
     *                 type: string
     *               nomeUsuario:
     *                 type: string
     *               email:
     *                 type: string
     *               senha:
     *                 type: string
     *     responses:
     *       200:
     *         description: Cadastro inserido com sucesso
     *         content:
     *           application/json:
     *             example:
     *               result:
     *                 codigo: 123
     *                 nomeSobrenome: John Doe
     *                 nomeUsuario: johndoe
     *                 email: johndoe@example.com
     *                 senha: ********
     *       400:
     *         description: Campos não enviados
     *         content:
     *           application/json:
     *             example:
     *               error: Campos não enviados
     *     parameters:
     *       - in: body
     *         name: body
     *         required: true
     *         description: Objeto de dados do cadastro
     *         schema:
     *           type: object
     *           properties:
     *             nomeSobrenome:
     *               type: string
     *             nomeUsuario:
     *               type: string
     *             email:
     *               type: string
     *             senha:
     *               type: string
     */
    inserir: async (req, res) => {
        let json = { error: '', result: {} };

        let nomeSobrenome = req.body.nomeSobrenome;
        let nomeUsuario = req.body.nomeUsuario;
        let email = req.body.email;
        let senha = req.body.senha;

        if (nomeSobrenome && nomeUsuario && email && senha) {
            try {
                let cadastroCodigo = await cadastroServices.inserir(nomeSobrenome, nomeUsuario, email, senha);
                json.result = {
                    codigo: cadastroCodigo,
                    nomeSobrenome,
                    nomeUsuario,
                    email,
                    senha: '********' // Evitar mostrar senhas no exemplo de resposta
                };
                res.json(json);
            } catch (error) {
                json.error = 'Erro ao inserir cadastro';
                res.status(500).json(json);
            }
        } else {
            json.error = 'Campos não enviados';
            res.status(400).json(json);
        }
    },
};
