const cardRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { postNewcards, getAllcards, getcards, patchcard, deletecard } = require('./cards.controller')


cardRoutes.get('/', getAllcards)
cardRoutes.get('/:id', getcards)

//solo los admins pueden hacer esto
//cardRoutes.post('/', upload.single('img'), postNewcards)
/* cardRoutes.patch('/:id', [isAuth], upload.single('img'), patchcard) */
/* cardRoutes.delete('/:id', [isAuth], upload.single('img'), deletecard) */

module.exports = cardRoutes