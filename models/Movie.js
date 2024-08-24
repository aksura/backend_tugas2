const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Movie = sequelize.define('Movie', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    synopsis: {
        type: DataTypes.TEXT,
    },
    trailerUrl: {
        type: DataTypes.STRING,
    },
    imgUrl: {
        type: DataTypes.STRING,
    },
    rating: {
        type: DataTypes.FLOAT,
    },
    status: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: true, // Enable timestamps
});

module.exports = Movie;
