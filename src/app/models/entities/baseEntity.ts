import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './User';
import {  EntityType } from '../../enum/EntityType';
import { IsEnum } from 'class-validator';
import { IBaseEntity } from '../baseEntity';
import { serialize, Serializer } from 'v8';
import { Exclude } from 'class-transformer';

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

  @Column({ type: 'varchar', nullable: true })
  arabicLabel!: string | null;

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
  protected fillEntityFromModel(modal:IBaseEntity){
   this.arabicLabel = modal.arabicLabel;
   this.isActive = modal.isActive;
   this.dsc = modal.dsc;
   this.note = modal.note;
   this.createdBy = modal.createdBy;
   this.modifiedBy = modal.modifiedBy;
   this.deletedBy = modal.deletedBy;
  }
  public abstract fillFromModel(model:IBaseEntity):void; 

}