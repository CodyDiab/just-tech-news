const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

//create user model
class User extends Model{}

//define table comumns and config 

User.init (
    {
    id: {// use the special Sequelize DataTypes object provide what type of data it is
        type: DataTypes.INTEGER,
        // this is the equivalent of SQL's `NOT NULL` option
        allowNull: false,
        // instruct that this is the Primary Key
        primaryKey: true,
        // turn on auto increment
        autoIncrement: true

    },
    username: {
        type: DataTypes.STRING,
      allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        ///prevents duplicate
        unique:true,
        // if allowNull is set to false, we can run our data through validators before creating the table data
        validate: {
        isEmail: true
      }

    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
    // this means the password must be at least four characters long
        len: [4]
        }
    }
}, 
{
      // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user'  
    }
);

module.exports = User;