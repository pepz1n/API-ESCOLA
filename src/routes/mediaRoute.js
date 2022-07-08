
const controller = require('../controllers/mediaController');

module.exports = (app) => {
    app.post('/media', controller.media)
};