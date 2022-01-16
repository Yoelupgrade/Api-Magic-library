const UserRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const { postNewUser, loginUser, logoutUser, getUser, patchUser, } = require('./user.controller')

UserRoutes.post('/', postNewUser)
UserRoutes.post('/login', loginUser)
UserRoutes.post('/logout', [isAuth], logoutUser)
UserRoutes.get('/:id', [isAuth], getUser)
UserRoutes.patch('/:id', [isAuth], patchUser)
//UserRoutes.patch('/:id/:id', [isAuth],)

module.exports = UserRoutes