const express = require('express')
const router = express.Router()
const game = require('../controllers/gamecontroller')
const config = require('../controllers/configController')
const login = require('../controllers/loginController')
const multer = require('multer')
const auth = require('../config/auth')

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, `src/assets/img/`)
    },
    filename: (req, file, cb) =>{
        console.log(file);
        cb(null, Date.now() + "_" + file.originalname)
    }
})

const uploadFile = multer({storage})

router.post('/login', login.login)

router.get('/games', game.getGames)

router.get('/game/:id', game.getGame)
router.post('/game', auth, uploadFile.single('image'), game.createGame)
router.put('/game/:id', auth, game.editGame)
router.delete('/game/:id', auth, game.deleteGame)

router.get('/categories', config.getCategories)
router.get('/platforms', config.getPlatforms)

module.exports = router