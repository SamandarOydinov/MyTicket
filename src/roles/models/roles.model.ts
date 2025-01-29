import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { UserRole } from "src/users/models/user-role.model";
import { User } from "src/users/models/user.model";

interface IRolesCreationAttr {
    value: string
    description: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, IRolesCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
    unique: true,
  })
  value: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @BelongsToMany(() => User, () => UserRole)
    users: User[];
}