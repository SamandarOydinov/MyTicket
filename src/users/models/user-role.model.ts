import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Role } from "src/roles/models/roles.model";
import { User } from "./user.model";

interface IUserRoleCreationAttr {
  userId: number
  roleId: number
}

@Table({ tableName: 'user_role' })
export class UserRole extends Model<UserRole, IUserRoleCreationAttr> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'Restrict',
  })
  userId: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'Restrict',
  })
  roleId: number;
}
