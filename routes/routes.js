const express = require('express')
const router = express.Router()
const game = require('../controllers/gameController')
const config = require('../controllers/configController')
const login = require('../controllers/loginController')
const auth = require('../config/auth')

router.get('/login', login.login)

router.get('/games', game.getGames)

router.get('/game/:id', game.getGame)
router.post('/game', auth, game.createGame)
router.put('/game/:id', auth, game.editGame)
router.delete('/game/:id', auth, game.deleteGame)

router.get('/categories', config.getCategories)
router.get('/platforms', config.getPlatforms)

module.exports = router