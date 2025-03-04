module.exports = (sequelize, DataTypes) => {
    return (
        sequelize.define('Users', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true
            },
            auth0_id: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            role: {
                type: DataTypes.ENUM('user', 'company', 'admin'),
                allowNull: false,
                defaultValue: 'user'
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone_number: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    is: /^\+?[\d\s-()]+$/
                }
            },
            profession: {
                type: DataTypes.STRING,
                allowNull: true
            },
            expertise: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
                defaultValue: []
            },
            profile_picture: {
                type: DataTypes.STRING,
                allowNull: true
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: sequelize.NOW
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: sequelize.NOW
            }
        }, {
            timestamps: true,
            updatedAt: 'updated_at',
            createdAt: 'created_at',
            hooks: {
                beforeUpdate: (user) => {
                    user.updated_at = new Date();
                }
            }
        })
    )
};