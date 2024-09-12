export enum Gender {
    MALE = 'male',
    FEMALE = 'female'
  }
  export const getArabicGender = (gender: string): string => {
    switch (gender) {
      case 'male':
        return "ذكر";
      case 'female':
        return "انثى";
      default:
        return "غير معرف";
    }
  };