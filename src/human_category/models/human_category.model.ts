import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Event } from "../../event/models/event.model";

interface IHumanCategoryCreationAttr {
  name: string;
  start_age: number;
  finish_age: number;
  gender: string;
}


@Table({ tableName: 'human_category', timestamps: false })
export class HumanCategory extends Model<
  HumanCategory,
  IHumanCategoryCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: Number;

  @Column({
    type: DataType.STRING(50),
  })
  name: String;

  @Column({
    type: DataType.INTEGER,
  })
  start_age: Number;

  @Column({
    type: DataType.INTEGER,
  })
  finish_age: Number;

  @Column({
    type: DataType.STRING(10),
  })
  gender: String;

  @HasMany(() => Event)
  event: Event
}
