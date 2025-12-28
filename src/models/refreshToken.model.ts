import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class RefreshToken extends Model {
    public token!: string;
    public userId!: string;
}

RefreshToken.init({
    token: {
        type: DataTypes.TEXT, // Refresh токен длинный, лучше использовать TEXT
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'RefreshToken',
    tableName: 'refresh_tokens',
    timestamps: true // Поможет отслеживать дату создания сессии
});
