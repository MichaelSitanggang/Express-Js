import { sequelize, DataTypes } from "./model.js";
const User = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    nama: DataTypes.STRING,
    no_telepon: DataTypes.STRING
});

(async() =>{
    await sequelize.sync();
})
export default User;