const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Op } = require('sequelize');
const sequelize = require('../database/db')
const User = require('../Models/User')

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/search', async (req, res) => {
    const searchTerm = req.query.q;
    const results = await User.findAll({
        where: {
            [Op.or]: [
                { firstName: { [Op.like]: `%${searchTerm}%` } },
                { lastName: { [Op.like]: `%${searchTerm}%` } },
            ]
        }
    });
    res.status(200).json({ results });
});
module.exports = app;