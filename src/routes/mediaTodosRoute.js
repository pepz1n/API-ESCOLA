
const controller = require('../controllers/mediaTodosController');

module.exports = (app) => {
    app.post('/media-todos', controller.media)
};