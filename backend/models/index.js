const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

const db = {};
db.sequelize = sequelize;
db.JobPost = require('./jobPost')(sequelize, DataTypes);
db.Users = require('./user')(sequelize, DataTypes);



db.JobPost.belongsTo(db.Users, {
    as: 'creator',
    foreignKey: {
        name: 'created_by',
        allowNull: false
    }
});

db.Users.hasMany(db.JobPost, {
    foreignKey: 'created_by',
    as: 'jobPosts'
});


module.exports = db;
