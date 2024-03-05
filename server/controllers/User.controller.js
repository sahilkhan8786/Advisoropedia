const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken')




const jwtSecret = process.env.JWT_SCRET


const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const bcryptSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, bcryptSalt)

        await User.create({ username, password: hashedPassword })

        res.json({ status: true, message: 'User successfully created' })
    } catch (error) {
        throw error
    }
}
const findUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const foundUser = await User.findOne({ username });

        const passOk = await bcrypt.compare(password, foundUser.password)
        if (!passOk) return res.status(401).json({ status: false, message: 'Invalid Credentials' })

        await jwt.sign({ id: foundUser._id }, jwtSecret, {}, (err, token) => {
            if (err) return res.status(500).json({ status: false, message: 'Internal server Error Try again Later' })
            res.cookie('token', token)
            return res.json({ status: true, token })
        })


    } catch (error) {
        throw error
    }
}
const profile = async (req, res) => {
    try {
        const token = req.cookies?.token

        if (!token) return

        await jwt.verify(token, jwtSecret, {}, async (err, data) => {
            if (err) return res.status(500).json({ status: false, message: 'Invalid token Try again Later' })

            const { id } = data

            const user = await User.findOne({ _id: id })
            return res.status(200).json({ status: true, name: user.username })
        })

    } catch (error) {
        throw error
    }
}
const logout = async (req, res) => {
    try {


        res.cookie('token', 'token').json({ status: true, message: "logout" })

    } catch (error) {
        throw error
    }
}



module.exports = { createUser, findUser, profile, logout }