import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class File extends Model {
    public id!: number;
    public name!: string;
    public extension!: string;
    public mimeType!: string;
    public size!: number;
    public uploadDate!: Date;
    public path!: string; // Путь к файлу в локальном хранилище
}

File.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    extension: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mimeType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    uploadDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'File',
    tableName: 'files',
    timestamps: false
});
