"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNationalityInArabic = exports.Nationality = void 0;
var Nationality;
(function (Nationality) {
    Nationality["Afghani"] = "Afghani";
    Nationality["Albanian"] = "Albanian";
    Nationality["Algerian"] = "Algerian";
    Nationality["Andorran"] = "Andorran";
    Nationality["Angolan"] = "Angolan";
    Nationality["Argentine"] = "Argentine";
    Nationality["Armenian"] = "Armenian";
    Nationality["Australian"] = "Australian";
    Nationality["Austrian"] = "Austrian";
    Nationality["Azerbaijani"] = "Azerbaijani";
    Nationality["Bahamian"] = "Bahamian";
    Nationality["Bahraini"] = "Bahraini";
    Nationality["Bangladeshi"] = "Bangladeshi";
    Nationality["Barbadian"] = "Barbadian";
    Nationality["Belarusian"] = "Belarusian";
    Nationality["Belgian"] = "Belgian";
    Nationality["Belizean"] = "Belizean";
    Nationality["Beninese"] = "Beninese";
    Nationality["Bhutanese"] = "Bhutanese";
    Nationality["Bolivian"] = "Bolivian";
    Nationality["Bosnian"] = "Bosnian";
    Nationality["Brazilian"] = "Brazilian";
    Nationality["British"] = "British";
    Nationality["Bulgarian"] = "Bulgarian";
    Nationality["Canadian"] = "Canadian";
    Nationality["Chilean"] = "Chilean";
    Nationality["Chinese"] = "Chinese";
    Nationality["Colombian"] = "Colombian";
    Nationality["Congolese"] = "Congolese";
    Nationality["Croatian"] = "Croatian";
    Nationality["Cuban"] = "Cuban";
    Nationality["Cypriot"] = "Cypriot";
    Nationality["Czech"] = "Czech";
    Nationality["Danish"] = "Danish";
    Nationality["Dominican"] = "Dominican";
    Nationality["Ecuadorian"] = "Ecuadorian";
    Nationality["Egyptian"] = "Egyptian";
    Nationality["ElSalvadoran"] = "El Salvadoran";
    Nationality["Estonian"] = "Estonian";
    Nationality["Ethiopian"] = "Ethiopian";
    Nationality["Filipino"] = "Filipino";
    Nationality["Finnish"] = "Finnish";
    Nationality["French"] = "French";
    Nationality["German"] = "German";
    Nationality["Greek"] = "Greek";
    Nationality["Guatemalan"] = "Guatemalan";
    Nationality["Haitian"] = "Haitian";
    Nationality["Honduran"] = "Honduran";
    Nationality["Hungarian"] = "Hungarian";
    Nationality["Icelandic"] = "Icelandic";
    Nationality["Indian"] = "Indian";
    Nationality["Indonesian"] = "Indonesian";
    Nationality["Iranian"] = "Iranian";
    Nationality["Iraqi"] = "Iraqi";
    Nationality["Irish"] = "Irish";
    Nationality["Israeli"] = "Israeli";
    Nationality["Italian"] = "Italian";
    Nationality["Jamaican"] = "Jamaican";
    Nationality["Japanese"] = "Japanese";
    Nationality["Jordanian"] = "Jordanian";
    Nationality["Kazakh"] = "Kazakh";
    Nationality["Kenyan"] = "Kenyan";
    Nationality["Korean"] = "Korean";
    Nationality["Kuwaiti"] = "Kuwaiti";
    Nationality["Latvian"] = "Latvian";
    Nationality["Lebanese"] = "Lebanese";
    Nationality["Lithuanian"] = "Lithuanian";
    Nationality["Luxembourgish"] = "Luxembourgish";
    Nationality["Macedonian"] = "Macedonian";
    Nationality["Malagasy"] = "Malagasy";
    Nationality["Malaysian"] = "Malaysian";
    Nationality["Maltese"] = "Maltese";
    Nationality["Mexican"] = "Mexican";
    Nationality["Moldovan"] = "Moldovan";
    Nationality["Mongolian"] = "Mongolian";
    Nationality["Moroccan"] = "Moroccan";
    Nationality["Nepali"] = "Nepali";
    Nationality["Dutch"] = "Dutch";
    Nationality["NewZealander"] = "New Zealander";
    Nationality["Nicaraguan"] = "Nicaraguan";
    Nationality["Nigerian"] = "Nigerian";
    Nationality["Norwegian"] = "Norwegian";
    Nationality["Omani"] = "Omani";
    Nationality["Pakistani"] = "Pakistani";
    Nationality["Palestinian"] = "Palestinian";
    Nationality["Panamanian"] = "Panamanian";
    Nationality["Paraguayan"] = "Paraguayan";
    Nationality["Peruvian"] = "Peruvian";
    Nationality["Polish"] = "Polish";
    Nationality["Portuguese"] = "Portuguese";
    Nationality["Qatari"] = "Qatari";
    Nationality["Romanian"] = "Romanian";
    Nationality["Russian"] = "Russian";
    Nationality["Rwandan"] = "Rwandan";
    Nationality["Saudi"] = "Saudi";
    Nationality["Singaporean"] = "Singaporean";
    Nationality["Slovak"] = "Slovak";
    Nationality["Slovenian"] = "Slovenian";
    Nationality["SouthAfrican"] = "South African";
    Nationality["Spanish"] = "Spanish";
    Nationality["SriLankan"] = "Sri Lankan";
    Nationality["Sudanese"] = "Sudanese";
    Nationality["Swedish"] = "Swedish";
    Nationality["Swiss"] = "Swiss";
    Nationality["Syrian"] = "Syrian";
    Nationality["Taiwanese"] = "Taiwanese";
    Nationality["Tanzanian"] = "Tanzanian";
    Nationality["Thai"] = "Thai";
    Nationality["Tunisian"] = "Tunisian";
    Nationality["Turkish"] = "Turkish";
    Nationality["Ugandan"] = "Ugandan";
    Nationality["Ukrainian"] = "Ukrainian";
    Nationality["Emirati"] = "Emirati";
    Nationality["BritishVirginIslander"] = "British Virgin Islander";
    Nationality["American"] = "American";
    Nationality["Venezuelan"] = "Venezuelan";
    Nationality["Vietnamese"] = "Vietnamese";
    Nationality["Welsh"] = "Welsh";
    Nationality["Zambian"] = "Zambian";
    Nationality["Zimbabwean"] = "Zimbabwean";
})(Nationality || (exports.Nationality = Nationality = {}));
const getNationalityInArabic = (nationality) => {
    const translations = {
        [Nationality.Afghani]: "أفغاني",
        [Nationality.Albanian]: "ألباني",
        [Nationality.Algerian]: "جزائري",
        [Nationality.Andorran]: "أندوري",
        [Nationality.Angolan]: "أنغولي",
        [Nationality.Argentine]: "أرجنتيني",
        [Nationality.Armenian]: "أرميني",
        [Nationality.Australian]: "أسترالي",
        [Nationality.Austrian]: "نمساوي",
        [Nationality.Azerbaijani]: "أذري",
        [Nationality.Bahamian]: "باهامي",
        [Nationality.Bahraini]: "بحريني",
        [Nationality.Bangladeshi]: "بنغالي",
        [Nationality.Barbadian]: "باربادوسي",
        [Nationality.Belarusian]: "بيلاروسي",
        [Nationality.Belgian]: "بلجيكي",
        [Nationality.Belizean]: "بليزاني",
        [Nationality.Beninese]: "بنيني",
        [Nationality.Bhutanese]: "بوتاني",
        [Nationality.Bolivian]: "بوليفي",
        [Nationality.Bosnian]: "بوسني",
        [Nationality.Brazilian]: "برازيلي",
        [Nationality.British]: "بريطاني",
        [Nationality.Bulgarian]: "بلغاري",
        [Nationality.Canadian]: "كندي",
        [Nationality.Chilean]: "شيلي",
        [Nationality.Chinese]: "صيني",
        [Nationality.Colombian]: "كولومبي",
        [Nationality.Congolese]: "كونغولي",
        [Nationality.Croatian]: "كرواتي",
        [Nationality.Cuban]: "كوبي",
        [Nationality.Cypriot]: "قبرصي",
        [Nationality.Czech]: "تشيكي",
        [Nationality.Danish]: "دنماركي",
        [Nationality.Dominican]: "دومينيكاني",
        [Nationality.Ecuadorian]: "إكوادوري",
        [Nationality.Egyptian]: "مصري",
        [Nationality.ElSalvadoran]: "سلفادوري",
        [Nationality.Estonian]: "إستوني",
        [Nationality.Ethiopian]: "إثيوبي",
        [Nationality.Filipino]: "فلبيني",
        [Nationality.Finnish]: "فنلندي",
        [Nationality.French]: "فرنسي",
        [Nationality.German]: "ألماني",
        [Nationality.Greek]: "يوناني",
        [Nationality.Guatemalan]: "غواتيمالي",
        [Nationality.Haitian]: "هايتي",
        [Nationality.Honduran]: "هندوراسي",
        [Nationality.Hungarian]: "مجري",
        [Nationality.Icelandic]: "أيسلندي",
        [Nationality.Indian]: "هندي",
        [Nationality.Indonesian]: "إندونيسي",
        [Nationality.Iranian]: "إيراني",
        [Nationality.Iraqi]: "عراقي",
        [Nationality.Irish]: "إيرلندي",
        [Nationality.Israeli]: "إسرائيلي",
        [Nationality.Italian]: "إيطالي",
        [Nationality.Jamaican]: "جامايكي",
        [Nationality.Japanese]: "ياباني",
        [Nationality.Jordanian]: "أردني",
        [Nationality.Kazakh]: "كازاخي",
        [Nationality.Kenyan]: "كيني",
        [Nationality.Korean]: "كوري",
        [Nationality.Kuwaiti]: "كويتي",
        [Nationality.Latvian]: "لاتفي",
        [Nationality.Lebanese]: "لبناني",
        [Nationality.Lithuanian]: "ليتواني",
        [Nationality.Luxembourgish]: "لوكسمبرغي",
        [Nationality.Macedonian]: "مقدوني",
        [Nationality.Malagasy]: "ملغاشي",
        [Nationality.Malaysian]: "ماليزي",
        [Nationality.Maltese]: "مالطي",
        [Nationality.Mexican]: "مكسيكي",
        [Nationality.Moldovan]: "مولدوفي",
        [Nationality.Mongolian]: "منغولي",
        [Nationality.Moroccan]: "مغربي",
        [Nationality.Nepali]: "نيبالي",
        [Nationality.Dutch]: "هولندي",
        [Nationality.NewZealander]: "نيوزيلندي",
        [Nationality.Nicaraguan]: "نيكاراغوي",
        [Nationality.Nigerian]: "نيجيري",
        [Nationality.Norwegian]: "نرويجي",
        [Nationality.Omani]: "عماني",
        [Nationality.Pakistani]: "باكستاني",
        [Nationality.Palestinian]: "فلسطيني",
        [Nationality.Panamanian]: "بنمي",
        [Nationality.Paraguayan]: "باراغواياني",
        [Nationality.Peruvian]: "بيروفي",
        [Nationality.Polish]: "بولندي",
        [Nationality.Portuguese]: "برتغالي",
        [Nationality.Qatari]: "قطري",
        [Nationality.Romanian]: "روماني",
        [Nationality.Russian]: "روسي",
        [Nationality.Rwandan]: "رواندي",
        [Nationality.Saudi]: "سعودي",
        [Nationality.Singaporean]: "سنغافوري",
        [Nationality.Slovak]: "سلوفاكي",
        [Nationality.Slovenian]: "سلوفيني",
        [Nationality.SouthAfrican]: "جنوب أفريقي",
        [Nationality.Spanish]: "إسباني",
        [Nationality.SriLankan]: "سريلانكي",
        [Nationality.Sudanese]: "سوداني",
        [Nationality.Swedish]: "سويدي",
        [Nationality.Swiss]: "سويسري",
        [Nationality.Syrian]: "سوري",
        [Nationality.Taiwanese]: "تايواني",
        [Nationality.Tanzanian]: "تنزاني",
        [Nationality.Thai]: "تايلاندي",
        [Nationality.Tunisian]: "تونسي",
        [Nationality.Turkish]: "تركي",
        [Nationality.Ugandan]: "أوغندي",
        [Nationality.Ukrainian]: "أوكراني",
        [Nationality.Emirati]: "إماراتي",
        [Nationality.BritishVirginIslander]: "بريطاني من جزر العذراء",
        [Nationality.American]: "أمريكي",
        [Nationality.Venezuelan]: "فنزويلي",
        [Nationality.Vietnamese]: "فيتنامي",
        [Nationality.Welsh]: "ويلزي",
        [Nationality.Zambian]: "زامبي",
        [Nationality.Zimbabwean]: "زيمبابوي"
    };
    return translations[nationality] || "Unknown Nationality";
};
exports.getNationalityInArabic = getNationalityInArabic;
//# sourceMappingURL=Nationality.js.map