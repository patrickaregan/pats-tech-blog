// Define global variables
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// Define class variable
class User extends Model {
    checkPW(loginPassword) {
      return bcrypt.compareSync(loginPassword, this.password);
    }
}

// Initialize class variable
User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8]
        }
      }
    },
    {
      hooks: {
        // beforeCreate hook
        async beforeCreate(data) {
          data.password = await bcrypt.hash(data.password, 10);
          return data;
        },
        // beforeUpdate hook
        async beforeUpdate(data) {
          data.password = await bcrypt.hash(data.password, 10);
          return data;
        }
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user'
    }
);
  
 // Export class variable
 module.exports = User;
