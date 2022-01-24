const cards = require('./cards.model')
const { setError } = require('../../utils/error/error')
const { deleteFile } = require('../../middlewares/deleteFile')


const postNewcards = async (req, res, next) => {
    try {
        const newcards = new cards()
        newcards.name = req.body.name
        newcards.manna_cost = req.body.manna_cost
        newcards.types = req.body.types
        newcards.abilities = req.body.abilities
        newcards.forceAndResistance = req.body.forceAndResistance
        if (req.file) {
            newcards.img = req.file.path
            newcards.img_card = req.file.path
        }
        const cardsDB = await newcards.save()
        return res.status(201).json(cardsDB)
    } catch (error) {
        return next(setError(500, 'card not saved'))
    }
}

const getAllcards = async (req, res, next) => {
    try {
        const cardssDB = await cards.find()
        res.status(200).json(cardssDB)
    } catch (error) {
        return next(setError(500, 'card failed server'))
    }
}

const getcards = async (req, res, next) => {
    try {
        const { id } = req.params
        const cardsDB = await cards.findById(id)
        if (!cardsDB) {
            return next(setError(404, 'card not found'))
        }
        return res.status(200).json(cardsDB)
    } catch (error) {
        return next(setError(500, 'card server error'))
    }
}

const patchcards = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchcards = new cards(req.body)
        patchcards._id = id
        if (req.file) {
            patchcards.img = req.file.path
        }
        const cardsDB = await cards.findByIdAndUpdate(id, patchcards)
        if (!cardsDB) {
            return next(setError(404, 'card not found'))
        }
        if (cardsDB.img) {deleteFile(cardsDB.img)}
        return res.status(200).json({ new: patchcards, old: cardsDB })
    } catch (error) {
        return next(setError(500, 'card Patch server error'))
    }
}

const deletecards = async (req, res, next) => {
    try {
        const { id } = req.params
        const cardsDB = await cards.findByIdAndDelete(id)
        if (!cardsDB) {
            return next(setError(404, 'card not found'))
        }
        if (cardsDB.img) {deleteFile(cardsDB.img)}
        return res.status(200).json(cardsDB)
    } catch (error) {
        return next(setError(500, 'card removed server error'))
    }
}

module.exports = {
    postNewcards,
    getAllcards,
    getcards,
    patchcards,
    deletecards
}
