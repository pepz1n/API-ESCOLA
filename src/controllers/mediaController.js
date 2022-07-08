const service = require('../services/mediaService');

const media = async (req, res) => {
    try {
        const response = await service.media(req.body);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
}



module.exports.media = media;
