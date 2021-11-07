const Mensagem = require('../models/mensagem.model');

exports.sendMessage = async (req, res) => {
    try {
        const { conversaId, destinatario, texto } = req.body;
        const novaMensagem = await Mensagem.create({
            conversaId,
            destinatario,
            texto,
        });

        res.status(200).send({
            mensagem: {
                id: novaMensagem.id,
                conversaId,
                destinatario,
                texto
            },
        });
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

exports.getMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const mensagem = await Mensagem.findByPk(id);

        res.status(200).send(mensagem || {});
    } catch (error) {
        res.status(500).send({
            message: error.message
          });
    }
}