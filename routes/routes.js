const express = require('express')
const router = express.Router()
const game = require('../controllers/gameController')


router.get('/game', game.getGame)
router.post('/game', game.createGame)
router.put('/game', game.editGame)
router.delete('/game', game.deleteGame)

module.exports = router