import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { IBaseEntity } from "../baseEntity";
import { Length } from "class-validator";
import { Gender } from "../../enum/Gender";
import { Nationality } from "../../enum/Nationality";
import { Government } from "./Location/Government";
import { Caza } from "./Location/Caza";
import { IPerson } from "../Person";
import { PersonOperation } from "./personOperation";

@Entity()
// @Unique(['name'])
export class Person extends BaseEntity{

    @Column({nullable:true})
    @Length(2, 25)
    public firstAr!: string;

    @Column({nullable:true})
    @Length(2, 25)
    public middleAr!: string;

    @Column({nullable:true})
    @Length(2, 25)
    public lastAr!: string;

    @Column({nullable:true})
    @Length(2, 25)
    public firstEn!: string;
    
    @Column({nullable:true})
    @Length(2, 25)
    public middleEn!: string;

    @Column({nullable:true})
    @Length(2, 25)
    public lastEn!: string;

    @Column({nullable:true})
    @Length(2, 25)
    public dob!: Date;

    @Column({nullable:false})
    @Length(1, 25)
    public phoneNumber!: string;

    @Column({nullable:false,default:"+961"})
    @Length(1,4)
    public phoneNumberCode!: string;

    @Column({
        type: "enum",
        enum: Object.values(Gender),
        nullable: true
      })
    public Gender!: Gender;

    @Column({nullable:true})
    @Length(2, 25)
    public LID!: string;
 

    @Column({
        type: "enum",
        enum: Object.values(Nationality),
        nullable: true,
        default:Nationality.Lebanese
    })
    public nationality!: Nationality;

    @ManyToOne(() => Government, (gov) => gov.personGovernment)
    @JoinColumn({ name: 'governmentId', referencedColumnName: 'id' })
    governmentAddress!: Government;

    @ManyToOne(() => Caza, (caza) => caza.personCaza)
    @JoinColumn({ name: 'CazaId', referencedColumnName: 'id' })
    cazaAddress!: Caza;

    @Column({nullable:true})
    public townAddress!: string;

    @Column({nullable:false,default:false})
    public fromMedical!: boolean;

    @Column({nullable:false,default:false})
    public haveInsurance!: boolean;

    @Column({nullable:true,default:false})
    public insuranceName!: string;

    @OneToMany(() => PersonOperation, (sf) => sf.person)
    personOperation!: PersonOperation[];

    public updateEntity(entity: BaseEntity): void {
        throw new Error("Method not implemented.");
    }

    public fillFromModel(model: IPerson): void {
        this.fillEntityFromModel(model);
        this.firstAr = model.firstAr;
        this.middleAr = model.middleAr;
        this.lastAr = model.lastAr;
        this.firstEn = model.firstEn;
        this.middleEn = model.middleEn;
        this.lastEn = model.lastEn;
        this.dob = model.dob;
        this.Gender = model.Gender;
        this.LID = model.LID;
        this.nationality =  model.nationality;
        this.governmentAddress = model.governmentAddress;
        this.cazaAddress = model.cazaAddress;
        this.townAddress = model.townAddress;
        this.phoneNumber = model.phoneNumber;
        this.phoneNumberCode = model.phoneNumberCode;
        this.fromMedical = model.fromMedical;
        this.haveInsurance = model.haveInsurance;
        this.insuranceName = model.insuranceName;
    }
}