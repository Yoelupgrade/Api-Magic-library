const malletRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { postNewmallets, getAllmallets, getmallets, patchmallets, deletemallet } = require('./mallet.controller')


malletRoutes.get('/', getAllmallets)
malletRoutes.get('/:id', getmallets)
malletRoutes.post('/', [isAuth], postNewmallets)
malletRoutes.patch('/userId/:uid/malletId/:mallid', [isAuth], patchmallets)
// malletRoutes.patch('/:id', [isAuth], upload.single('img'), patchmallets)
//malletRoutes.delete('/:id', [isAuth], upload.single('img'), deletemallet )

module.exports = malletRoutes