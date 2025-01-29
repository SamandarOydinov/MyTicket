import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript"
import { Role } from "src/roles/models/roles.model";
import { UserRole } from "./user-role.model";

interface IUserCreationAttr {
    name: string
    email: string
    password: string
    value: string
}

@Table({ tableName: 'user'})
export class User extends Model<User, IUserCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(50),
  })
  name: string;

  @Column({
    type: DataType.STRING(50),
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  is_active: boolean;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}
