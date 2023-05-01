import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Establishment } from './establishment.model';

@Table({ tableName: 'favorites', timestamps: true })
export class Favorite extends Model<Favorite> {
  @Column({
    type: DataType.NUMBER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  favorite_id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @ForeignKey(() => Establishment)
  @Column({ type: DataType.INTEGER, allowNull: false })
  establishment_id: number;

  @BelongsTo(() => Establishment, {
    foreignKey: 'establishment_id',
    as: 'establishment',
  })
  establishment: Establishment;

  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: string;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: string;
}
