module.exports = (sequelize, DataTypes) => {
    return (
        sequelize.define('JobPost', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            requirements: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            salary_range_start: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            },
            salary_range_end: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            },
            job_type: {
                type: DataTypes.ENUM('full-time', 'part-time', 'contract', 'internship'),
                allowNull: false
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false
            },
            is_remote: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            experience_level: {
                type: DataTypes.ENUM('entry', 'mid', 'senior', 'lead'),
                allowNull: false
            },
            skills_required: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: []
            },
            benefits: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: []
            },
            application_deadline: {
                type: DataTypes.DATE,
                allowNull: true
            },
            status: {
                type: DataTypes.ENUM('draft', 'published', 'closed', 'archived'),
                defaultValue: 'draft'
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
                beforeCreate: async (jobPost, options) => {
                    const creator = await Users.findByPk(jobPost.created_by);
                    if (!creator || creator.role !== 'company') {
                        throw new Error('Only company users can create job posts');
                    }
                },
                beforeUpdate: (jobPost) => {
                    jobPost.updated_at = new Date();
                }
            }
        })
    )
};