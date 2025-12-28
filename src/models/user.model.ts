import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class User extends Model {
    public id!: string;
    public password!: string;
}

User.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    unique: true
},
password: {
    type: DataTypes.STRING,
        allowNull: false
}
}, {
    sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false
});
