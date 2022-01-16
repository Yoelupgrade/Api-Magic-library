const User = require('./user.model')
const bcrypt = require('bcrypt')
const { setError } = require('../../utils/error/error')
const { generateSign, verifyJwt } = require('../../utils/jwt/jwtUtils')

const postNewUser = async (req, res, next) => {
    try {
        const newUser = new User(req.body)
        const userDuplicate = await User.findOne({ email: newUser.email })
        if (userDuplicate) {
            return next(setError(404, 'Email existente'))
        }
        const userDB = await newUser.save()
        return res.status(201).json({ name: userDB.name, email: userDB.email, nickname: userDB.nickname, emoji: userDB.emoji })

    } catch (error) {
        return next(error)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const userDB = await User.findOne({ email: req.body.email })
        if (!userDB) {
            return next(setError(404, 'User not found'))
        }
        if (bcrypt.compareSync(req.body.password, userDB.password)) {
            const token = generateSign(userDB._id, userDB.email)
            return res.status(200).json({token: token, userId: userDB._id})
        }
    } catch (error) {
        error.message = 'error Login'
        return next(error)
    }
}

const logoutUser = (req, res, next) => {
    try {
        const token = null;
        return res.status(200).json(token)
    } catch (error) {
        return next(error)
    }
}

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params
        // Esto es si solamamente el mismo usuario puede ver su perfil
        // if(id != req.params.id) {
        //     return next(setError (403, 'Forbidden'))
        // }
        const populatecard = {path: 'mallets', populate: {path:'card'}}
        const populatedock = {path: 'mallets', populate: {path:'dock'}}
        const userDB = await User.findById(id).populate(populatecard).populate(populatedock)
            if (!userDB) {
            return next(setError(404, 'User not found'))
        }
        return res.status(200).json({ 
            name: userDB.name, 
            email: userDB.email,
            nickname: userDB.nickname, 
            emoji: userDB.emoji,
            mallets: userDB.mallets,
             })

    } catch (error) {
        return next(setError(404, 'User server fail'))
    }
}

const patchUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchUser = new User(req.body)
        patchUser._id = id
        const userDB = await User.findByIdAndUpdate(id, patchUser)
        if (!userDB) {
            return next(setError(404, 'User not found'))
        }
        return res.status(200).json({ new: patchUser, old: userDB })
    } catch (error) {
        return next(setError(500, 'User Patch server error'))
    }
}

module.exports = {
    postNewUser, loginUser, logoutUser, getUser, patchUser,
}