import { DataTypes, Model, Sequelize } from "sequelize";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  balance: number;
  // ... other attributes
}

interface UserCreationAttributes extends Omit<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public password!: string;
  public balance!: number;
  // ... other attributes
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initUser = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
    },
    {
      sequelize,
      tableName: "users",
    }
  );
};

export default User;
