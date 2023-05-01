import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Review } from './review.model';
import { User } from './user.model';

@Table({ tableName: 'establishments', timestamps: true })
export class Establishment extends Model<Establishment> {
  @Column({
    type: DataType.NUMBER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  establishment_id: number;

  @HasMany(() => Review, { as: 'review', foreignKey: 'establishment_id' })
  reviews: Review[];

  @BelongsTo(() => User, {
    foreignKey: 'user_id',
    as: 'user',
  })
  user: User;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: true })
  approved: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: true, allowNull: true })
  pending: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: true })
  rejected: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  avatar: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  photos: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  tags: string[];

  @Column({ type: DataType.TIME, allowNull: false })
  start_work: string;

  @Column({ type: DataType.TIME, allowNull: false })
  end_work: string;

  @Column({ type: DataType.STRING, allowNull: false })
  location: string;

  @Column({ type: DataType.NUMBER, allowNull: false })
  average_check: number;

  @Column({ type: DataType.NUMBER, allowNull: false })
  user_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;

  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: string;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: string;
}
