import { Gender } from "../enum/Gender"
import { Nationality } from "../enum/Nationality"
import { IBaseEntity } from "./baseEntity"
import { Caza } from "./entities/Location/Caza"
import { Government } from "./entities/Location/Government"

export interface IPerson extends IBaseEntity {
     firstAr: string
     middleAr: string
     lastAr: string
     firstEn: string
     middleEn: string
     lastEn: string
     dob: Date
     Gender: Gender
     LID: string
     nationality: Nationality
     governmentAddress: Government
     cazaAddress: Caza
     townAddress: string
     phoneNumber : string;
     phoneNumberCode:string;
     fromMedical:boolean
     haveInsurance:boolean
     insuranceName:string
  }

  export enum IPersonFields {
    FirstAr = "firstAr",
    MiddleAr = "middleAr",
    LastAr = "lastAr",
    FirstEn = "firstEn",
    MiddleEn = "middleEn",
    LastEn = "lastEn",
    Dob = "dob",
    Gender = "gender",
    LID = "LID",
    Nationality = "nationality",
    GovernmentAddress = "governmentAddress",
    CazaAddress = "cazaAddress",
    TownAddress = "townAddress",
    PhoneNumber = "phoneNumber",
    PhoneNumberCode = "phoneNumberCode",
    FromMedical = "fromMedical",
    HaveInsurance = "haveInsurance",
    InsuranceName = "insuranceName"
}