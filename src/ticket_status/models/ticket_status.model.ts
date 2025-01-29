import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Ticket } from "../../ticket/models/ticket.model";

interface ITicketStatusCreationAttr {
    name: string
}

@Table({ tableName: "ticket_status", timestamps: false })
export class TicketStatus extends Model<TicketStatus, ITicketStatusCreationAttr>{
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

      @HasMany(() => Ticket)
      ticket: Ticket
}