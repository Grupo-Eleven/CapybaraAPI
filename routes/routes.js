const express = require('express')
const router = express.Router()
const game = require('../controllers/gameController')
const config = require('../controllers/configController')


router.get('/game', game.getGame)
router.post('/game', game.createGame)
router.put('/game', game.editGame)
router.delete('/game', game.deleteGame)

router.get('/categories', config.getCategories)
router.get('/platforms', config.getPlatforms)

module.exports = router