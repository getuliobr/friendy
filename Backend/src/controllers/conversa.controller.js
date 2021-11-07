const Conversa = require('../models/conversa.model');

exports.createConversation = async (req, res) => {
    try {
        const { destinatarioId, remetenteId } = req.body;
        const novaConversa = await Conversa.create({
            destinatario: destinatarioId,
            remetente: remetenteId,
        });

        res.status(200).send({
            conversa: {
                id: novaConversa.id,
                destinatario: destinatarioId,
                remetente: remetenteId,
            },
        });
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

exports.getConversation = async (req, res) => {
    try {
        const { id } = req.params;
        const conversa = await Conversa.findByPk(id);

        res.status(200).send(conversa || {});
    } catch (error) {
        res.status(500).send({
            message: error.message
          });
    }
}