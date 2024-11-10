import { sequelize, DataTypes } from "./model.js";
const Admin = sequelize.define('admin', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
});
(async() =>{
    await sequelize.sync();
})
export default Admin;