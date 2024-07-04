import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './User';
import {  EntityType } from '../type/EntityType';
import { IsEnum } from 'class-validator';

@Entity()
export abstract class BaseEntity {
  @PrimaryColumn({ type: 'int', generated: 'increment' })
  id!: number;

  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  uuid!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt!: Date | null;

  @VersionColumn({ type: 'int', nullable: true })
  version!: number | null;

  @Column({ type: 'varchar', nullable: true })
  dsc!: string | null;

  @Column({
    type: "enum",
    enum: Object.values(EntityType),
  })
  type!: EntityType|null;

  @Column({ type: 'boolean', nullable: true,default:true })
  isActive!: boolean | null;

  @Column({ type: 'varchar', nullable: true })
  note!: string | null;

  @ManyToOne(() => User, (user) => user.createdBy)
  createdBy!: User | null;

  @ManyToOne(() => User, (user) => user.modifiedBy)
  modifiedBy!: User | null;

  @ManyToOne(() => User, (user) => user.deletedBy)
  deletedBy!: User | null;

  constructor() {
    this.uuid = uuidv4();
  }


}