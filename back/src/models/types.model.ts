import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'type_establishments', timestamps: true })
export class Types extends Model<Types> {
  @Column({
    type: DataType.NUMBER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  type_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: string;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: string;
}
