import { Length } from 'class-validator';
import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
  } from 'typeorm';
  @Entity("Testy")
  export class Testy {

    @PrimaryColumn()
    @Generated()
    public id!:number
    @Column()
    @Length(4, 100)
    public name!: string;
  }