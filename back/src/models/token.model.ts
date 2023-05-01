import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'tokens', timestamps: true })
export class Token extends Model<Token> {
  @Column({
    type: DataType.NUMBER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  token_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  refresh_token: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.NUMBER, allowNull: false })
  user_id: number;

  @BelongsTo(() => User, { foreignKey: 'user_id', as: 'user' })
  user: User;

  @Column({ type: DataType.DATE, field: 'created_at' })
  createdAt: string;

  @Column({ type: DataType.DATE, field: 'updated_at' })
  updatedAt: string;
}
