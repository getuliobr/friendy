const Mensagem = require('../models/mensagem.model');

exports.sendMessage = async (req, res) => {
    try {
        const { 
            conversaId, destinatarioId, remetenteId, remetenteNome, texto 
        } = req.body;
        const novaMensagem = await Mensagem.create({
            conversaId,
            destinatarioId,
            remetenteId,
            remetenteNome,
            texto,
        });

        res.status(200).send({
            mensagem: {
                id: novaMensagem.id,
                conversaId,
                destinatarioId,
                remetenteId,
                remetenteNome,
                texto,
                create_at: novaMensagem.createAt
            },
        });
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

exports.getMessages = async (req, res) => {
    try {
        const { id } = req.params;
        const mensagens = await Mensagem.findAll({
            where: { conversaId: id }
        });

        const mensagensOrdenadas = mensagens.sort((a,b) => {
           return new Date(a.createdAt) - new Date(b.createdAt);
        });

        res.status(200).send(mensagensOrdenadas || {});
    } catch (error) {
        res.status(500).send({
            message: error.message
          });
    }
}