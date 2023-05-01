import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Establishment } from './establishment.model';

@Table({ tableName: 'reviews', timestamps: true })
export class Review extends Model<Review> {
  @Column({
    type: DataType.NUMBER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  review_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  check: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @BelongsTo(() => User, { foreignKey: 'user_id', as: 'user' })
  user: User;

  @ForeignKey(() => Establishment)
  @Column({ type: DataType.INTEGER, allowNull: false })
  establishment_id: number;

  @BelongsTo(() => Establishment, {
    as: 'establishment',
    foreignKey: 'establishment_id',
  })
  establishment: Establishment;

  @Column({ type: DataType.FLOAT, allowNull: false })
  rating: number;

  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: string;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: string;
}
