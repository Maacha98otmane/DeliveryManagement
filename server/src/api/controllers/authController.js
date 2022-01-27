import User from "../models/user.js"
import { createToken } from "../helpers";
const logger = require('../../config/winston');

const login = (req, res) => {
    const {
        email,
        password
    } = req.body;

    User.findOne({
        email
    }, (err, result) => {
        if (err || !result) {
            return res.status(400).json({
                isLogged: false,
                error: 'User not Found with this email@'
            })
        }
        if (!result.authenticate(password)) {
            return res.status(401).json({
                isLogged: false,
                error: 'Email and Password dont Match !'
            })
        }
        logger.info(`login: ${result.email} logged!`);
        const token = createToken({ result }, result.role);
        res.cookie('token', token, {
            expires: new Date(Date.now() + 4 * 3600000)
        })
        return token
            ? res.status(200).json({ isLogged: true, token })
            : res.status(500).json({ isLogged: false, error: "cant create token" });
    })

}
const logout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: "Logout"
    })
}
export { login, logout }