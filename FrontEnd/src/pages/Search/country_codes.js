const countryCodeNameMap = {
  AF: "Afghanistan",
  AX: "Åland Islands",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "AndorrA",
  AO: "Angola",
  AI: "Anguilla",
  AQ: "Antarctica",
  AG: "Antigua and Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermuda",
  BT: "Bhutan",
  BO: "Bolivia",
  BA: "Bosnia and Herzegovina",
  BW: "Botswana",
  BV: "Bouvet Island",
  BR: "Brazil",
  IO: "British Indian Ocean Territory",
  BN: "Brunei Darussalam",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  CV: "Cape Verde",
  KY: "Cayman Islands",
  CF: "Central African Republic",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CX: "Christmas Island",
  CC: "Cocos (Keeling) Islands",
  CO: "Colombia",
  KM: "Comoros",
  CG: "Congo",
  CD: "Congo, The Democratic Republic of the",
  CK: "Cook Islands",
  CR: "Costa Rica",
  CI: "Cote D'Ivoire",
  HR: "Croatia",
  CU: "Cuba",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  ET: "Ethiopia",
  FK: "Falkland Islands (Malvinas)",
  FO: "Faroe Islands",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  GF: "French Guiana",
  PF: "French Polynesia",
  TF: "French Southern Territories",
  GA: "Gabon",
  GM: "Gambia",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Greece",
  GL: "Greenland",
  GD: "Grenada",
  GP: "Guadeloupe",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HT: "Haiti",
  HM: "Heard Island and Mcdonald Islands",
  VA: "Holy See (Vatican City State)",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran, Islamic Republic Of",
  IQ: "Iraq",
  IE: "Ireland",
  IM: "Isle of Man",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JE: "Jersey",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KP: "Korea, Democratic People'S Republic of",
  KR: "Korea, Republic of",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Lao People'S Democratic Republic",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libyan Arab Jamahiriya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macao",
  MK: "Macedonia, The Former Yugoslav Republic of",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MU: "Mauritius",
  YT: "Mayotte",
  MX: "Mexico",
  FM: "Micronesia, Federated States of",
  MD: "Moldova, Republic of",
  MC: "Monaco",
  MN: "Mongolia",
  MS: "Montserrat",
  ME: "Montenegro",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands",
  AN: "Netherlands Antilles",
  NC: "New Caledonia",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Norfolk Island",
  MP: "Northern Mariana Islands",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PS: "Palestinian Territory, Occupied",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines",
  PN: "Pitcairn",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  RE: "Reunion",
  RO: "Romania",
  RU: "Russian Federation",
  RW: "RWANDA",
  SH: "Saint Helena",
  KN: "Saint Kitts and Nevis",
  LC: "Saint Lucia",
  PM: "Saint Pierre and Miquelon",
  VC: "Saint Vincent and the Grenadines",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Sao Tome and Principe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  GS: "South Georgia and the South Sandwich Islands",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan",
  SR: "Suriname",
  SJ: "Svalbard and Jan Mayen",
  SZ: "Swaziland",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syrian Arab Republic",
  TW: "Taiwan, Province of China",
  TJ: "Tajikistan",
  TZ: "Tanzania, United Republic of",
  TH: "Thailand",
  TL: "Timor-Leste",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad and Tobago",
  TN: "Tunisia",
  TR: "Turkey",
  TM: "Turkmenistan",
  TC: "Turks and Caicos Islands",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  UM: "United States Minor Outlying Islands",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela",
  VN: "VietNam",
  VG: "Virgin Islands, British",
  VI: "Virgin Islands, U.S.",
  WF: "Wallis and Futuna",
  EH: "Western Sahara",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe",
};

const countryCodeCount = {
  AF: 0,
  AX: 0,
  AL: 0,
  DZ: 0,
  AS: 0,
  AD: 0,
  AO: 0,
  AI: 0,
  AQ: 0,
  AG: 0,
  AR: 0,
  AM: 0,
  AW: 0,
  AU: 0,
  AT: 0,
  AZ: 0,
  BS: 0,
  BH: 0,
  BD: 0,
  BB: 0,
  BY: 0,
  BE: 0,
  BZ: 0,
  BJ: 0,
  BM: 0,
  BT: 0,
  BO: 0,
  BA: 0,
  BW: 0,
  BV: 0,
  BR: 0,
  IO: 0,
  BN: 0,
  BG: 0,
  BF: 0,
  BI: 0,
  KH: 0,
  CM: 0,
  CA: 0,
  CV: 0,
  KY: 0,
  CF: 0,
  TD: 0,
  CL: 0,
  CN: 0,
  CX: 0,
  CC: 0,
  CO: 0,
  KM: 0,
  CG: 0,
  CD: 0,
  CK: 0,
  CR: 0,
  CI: 0,
  HR: 0,
  CU: 0,
  CY: 0,
  CZ: 0,
  DK: 0,
  DJ: 0,
  DM: 0,
  DO: 0,
  EC: 0,
  EG: 0,
  SV: 0,
  GQ: 0,
  ER: 0,
  EE: 0,
  ET: 0,
  FK: 0,
  FO: 0,
  FJ: 0,
  FI: 0,
  FR: 0,
  GF: 0,
  PF: 0,
  TF: 0,
  GA: 0,
  GM: 0,
  GE: 0,
  DE: 0,
  GH: 0,
  GI: 0,
  GR: 0,
  GL: 0,
  GD: 0,
  GP: 0,
  GU: 0,
  GT: 0,
  GG: 0,
  GN: 0,
  GW: 0,
  GY: 0,
  HT: 0,
  HM: 0,
  VA: 0,
  HN: 0,
  HK: 0,
  HU: 0,
  IS: 0,
  IN: 0,
  ID: 0,
  IR: 0,
  IQ: 0,
  IE: 0,
  IM: 0,
  IL: 0,
  IT: 0,
  JM: 0,
  JP: 0,
  JE: 0,
  JO: 0,
  KZ: 0,
  KE: 0,
  KI: 0,
  KP: 0,
  KR: 0,
  KW: 0,
  KG: 0,
  LA: 0,
  LV: 0,
  LB: 0,
  LS: 0,
  LR: 0,
  LY: 0,
  LI: 0,
  LT: 0,
  LU: 0,
  MO: 0,
  MK: 0,
  MG: 0,
  MW: 0,
  MY: 0,
  MV: 0,
  ML: 0,
  MT: 0,
  MH: 0,
  MQ: 0,
  MR: 0,
  MU: 0,
  YT: 0,
  MX: 0,
  FM: 0,
  MD: 0,
  MC: 0,
  MN: 0,
  MS: 0,
  ME: 0,
  MA: 0,
  MZ: 0,
  MM: 0,
  NA: 0,
  NR: 0,
  NP: 0,
  NL: 0,
  AN: 0,
  NC: 0,
  NZ: 0,
  NI: 0,
  NE: 0,
  NG: 0,
  NU: 0,
  NF: 0,
  MP: 0,
  NO: 0,
  OM: 0,
  PK: 0,
  PW: 0,
  PS: 0,
  PA: 0,
  PG: 0,
  PY: 0,
  PE: 0,
  PH: 0,
  PN: 0,
  PL: 0,
  PT: 0,
  PR: 0,
  QA: 0,
  RE: 0,
  RO: 0,
  RU: 0,
  RW: 0,
  SH: 0,
  KN: 0,
  LC: 0,
  PM: 0,
  VC: 0,
  WS: 0,
  SM: 0,
  ST: 0,
  SA: 0,
  SN: 0,
  RS: 0,
  SC: 0,
  SL: 0,
  SG: 0,
  SK: 0,
  SI: 0,
  SB: 0,
  SO: 0,
  ZA: 0,
  GS: 0,
  ES: 0,
  LK: 0,
  SD: 0,
  SR: 0,
  SJ: 0,
  SZ: 0,
  SE: 0,
  CH: 0,
  SY: 0,
  TW: 0,
  TJ: 0,
  TZ: 0,
  TH: 0,
  TL: 0,
  TG: 0,
  TK: 0,
  TO: 0,
  TT: 0,
  TN: 0,
  TR: 0,
  TM: 0,
  TC: 0,
  TV: 0,
  UG: 0,
  UA: 0,
  AE: 0,
  GB: 0,
  US: 0,
  UM: 0,
  UY: 0,
  UZ: 0,
  VU: 0,
  VE: 0,
  VN: 0,
  VG: 0,
  VI: 0,
  WF: 0,
  EH: 0,
  YE: 0,
  ZM: 0,
  ZW: 0,
};

const countryNames = Object.values(countryCodeNameMap);
const countryCodes = Object.keys(countryCodeNameMap);

const codeExists = (code) => {
  return countryCodeNameMap[code] !== undefined;
};

const hasJapanese = (text) => {
  const japanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
  return japanese.test(text);
}
    
const hasKorean = (text) => {
  const korean = /[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/;
  return korean.test(text);
}

const hasChinese = (text) => {
  const chinese = /[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/;
  return chinese.test(text);
}

const hasIndian = (text) => {
  const indian = /[\u0900-\u097F\u0980-\u09FF\u0A00-\u0A7F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0F00-\u0FFF]/;
  return indian.test(text);
}

const hasSinhala = (text) => {
  const sinhala = /[\u0D80-\u0DFF]/;
  return sinhala.test(text);
}

const hasBurmese = (text) => {
  const burmese = /[\u1000-\u109F]/;
  return burmese.test(text);
}

const hasThai = (text) => {
  const thai = /[\u0E00-\u0E7F]/;
  return thai.test(text);
}

const hasLao = (text) => {
  const lao = /[\u0E80-\u0EFF]/;
  return lao.test(text);
}

const hasKhmer = (text) => {
  const khmer = /[\u1780-\u17FF]/;
  return khmer.test(text);
}

const hasArmeninan = (text) => {
  const armenian = /[\u0530-\u058F]/;
  return armenian.test(text);
}

const hasGeorgian = (text) => {
  const georgian = /[\u10A0-\u10FF]/;
  return georgian.test(text);
}

const hasGreek = (text) => {
  const greek = /[\u0370-\u03FF\u1F00-\u1FFF]/;
  return greek.test(text);
}

const hasHebrew = (text) => {
  const hebrew = /[\u0590-\u05FF]/;
  return hebrew.test(text);
}

const hasMongolian = (text) => {
  const mongolian = /[\u1800-\u18AF]/;
  return mongolian.test(text);
}

const hasEnglish = (text) => {
  const english = /[A-Za-z0-9\s,./!@#$%^&*()_\-=+{}[\]|\\:;'"/?><`~]/;
  return english.test(text);
}

const getCountryCodeFromLang = (text) => {
  if(hasBurmese(text))  return 'MM';
  else if(hasChinese(text))  return 'CN';
  else if(hasIndian(text))  return 'IN';
  else if(hasJapanese(text))  return 'JP';
  else if(hasKorean(text))  return 'KR';
  else if(hasSinhala(text))  return 'LK';
  else if(hasKhmer(text))  return 'KH';
  else if(hasThai(text))  return 'TH';
  else if(hasLao(text))  return 'LA';
  else if(hasArmeninan(text))  return 'AM';
  else if(hasGeorgian(text))  return 'GE';
  else if(hasMongolian(text))  return 'MN';
  else if(hasGreek(text))  return 'GR';
  else if(hasHebrew(text))  return 'IL';
  else return '';
}

const checkCountriesMan = async (location) => {
  if (/\bsouth africa\b/gi.test(location)) {
    return 'ZA';
  } else if (/\bUK\b/gi.test(location) || /\bGB\b/gi.test(location) || /\bscotland\b/gi.test(location) || /\bbritain\b/gi.test(location) || /\bgreat britain\b/gi.test(location) || /\bunited kingdom\b/gi.test(location) || /\bengland\b/gi.test(location) || /\bLDN\b/gi.test(location) || /\blondon\b/gi.test(location) || /\bmanchester\b/gi.test(location)) {
    return 'GB';
  } else if (/\bUS\b/gi.test(location) || /\bUSA\b/gi.test(location) || /\bunited states\b/gi.test(location) || /\bunited state\b/gi.test(location) || /\bunited states of america\b/gi.test(location) || /\bunited states america\b/gi.test(location) || /\bamerica\b/gi.test(location) || /\bNJ\b/gi.test(location) || /\bNV\b/gi.test(location) || /\bNY\b/gi.test(location) || /\bNYC\b/gi.test(location) || /\bLA\b/gi.test(location) || /\bDC\b/gi.test(location) || /\bD.C\b/gi.test(location) || /\bD.C.\b/gi.test(location) || /\bblvd\b/gi.test(location) || /\bblvd.\b/gi.test(location) || /\bavenue\b/gi.test(location) || /\bbuilding\b/gi.test(location) || /\bstreet\b/gi.test(location) || /\bview\b/gi.test(location) || /\bbay\b/gi.test(location) || /\bocean\b/gi.test(location) || /\bbeach\b/gi.test(location) || /\barea 51\b/gi.test(location) || /\barea51\b/gi.test(location) || /\barea\b/gi.test(location) || /\bstreet\b/gi.test(location) || /\bwall street\b/gi.test(location) || /\bwall st\b/gi.test(location) || /\bwall st.\b/gi.test(location) || /\barea\b/gi.test(location) || /\btx\b/gi.test(location) || /\bfl\b/gi.test(location) || /\btexas\b/gi.test(location) || /\bflorida\b/gi.test(location) || /\bminneapolis\b/gi.test(location) || /\bphiladelphia\b/gi.test(location) || /\bphily\b/gi.test(location) || /\bphilly\b/gi.test(location) || /\bdallas\b/gi.test(location) || /\baustin\b/gi.test(location) || /\bmiami\b/gi.test(location) || /\batlanta\b/gi.test(location) || /\bseattle\b/gi.test(location) || /\bsilicon\b/gi.test(location)) {
    return 'US';
  } else if (/\bUAE\b/gi.test(location) || /\bemirates\b/gi.test(location) || /\bemirate\b/gi.test(location) || /\bemirati\b/gi.test(location) || /\bunited arab emirates\b/gi.test(location) || /\bunited arab emirate\b/gi.test(location) || /\bunited arab emirati\b/gi.test(location) || /\bdubai\b/gi.test(location) || /\sharjah\b/gi.test(location)) {
    return 'AE';
  } else if (/\bcanada\b/gi.test(location)) {
    return 'CA';
  } else if (/\bfrance\b/gi.test(location) || /\bparis\b/gi.test(location)) {
    return 'FR';
  } else if (/\bspain\b/gi.test(location) || /\bmadrid\b/gi.test(location) || /\bbarcelona\b/gi.test(location) || /\bcatalan\b/gi.test(location) || /\bcatalonia\b/gi.test(location)) {
    return 'ES';
  } else if (/\bgermany\b/gi.test(location) || /\bdeutschland\b/gi.test(location) || /\bberlin\b/gi.test(location) || /\bfrankfurt\b/gi.test(location)) {
    return 'DE';
  } else if (/\bnetherlands\b/gi.test(location) || /\bnetherland\b/gi.test(location) || /\bdutch\b/gi.test(location) || /\bholland\b/gi.test(location)) {
    return 'NL';
  } else if (/\bitaly\b/gi.test(location) || /\brome\b/gi.test(location)) {
    return 'IT';
  } else if (/\bkorea\b/gi.test(location) || /\bseoul\b/gi.test(location)) {
    return 'KR';
  } else if (/\bjapan\b/gi.test(location) || /\btokyo\b/gi.test(location) || /\bosaka\b/gi.test(location)) {
    return 'JP';
  } else if (/\bchina\b/gi.test(location) || /\bshanghai\b/gi.test(location) || /\bbeijing\b/gi.test(location)) { 
    return 'CN';
  } else if (/\bmyanmar\b/gi.test(location) || /\bRGN\b/gi.test(location) || /\bburma\b/gi.test(location) || /\bmdy\b/gi.test(location) || /\bmandalay\b/gi.test(location)) {
    return 'MM';
  } else if (/\bsingapore\b/gi.test(location) || /\bsingpore\b/gi.test(location)) {
    return 'SG';
  } else if (/\bthailand\b/gi.test(location) || /\bbangkok\b/gi.test(location)) {  
    return 'TH';
  } else if (/\bPK\b/gi.test(location) || /\bPAK\b/gi.test(location) || /\bpakistan\b/gi.test(location) || /\blahore\b/gi.test(location) || /\bkarachi\b/gi.test(location) || /\bislamabad\b/gi.test(location) || /\bmultan\b/gi.test(location) || /\brawalpindi\b/gi.test(location) || /\bsindh\b/gi.test(location) || /\bqueta\b/gi.test(location) || /\bquetta\b/gi.test(location) || /\bkhyber\b/gi.test(location) || /\bpeshawar\b/gi.test(location) || /\bpeshavar\b/gi.test(location) || /\bgilgit\b/gi.test(location) || /\bbaltistan\b/gi.test(location) || /\bbalochistan\b/gi.test(location) || /\bbaloochistan\b/gi.test(location) || /\bbaluchistan\b/gi.test(location)) {
    return 'PK';
  } else if (/\bIN\b/g.test(location) || /\bIND\b/gi.test(location) || /\bindia\b/gi.test(location) || /\bindian\b/gi.test(location) || /\bbharat\b/gi.test(location) || /\bhind\b/gi.test(location) || /\bhindustan\b/gi.test(location) || /\bhindusthan\b/gi.test(location) || /\baryavarta\b/gi.test(location) || /\bdelhi\b/gi.test(location) || /\bmumbai\b/gi.test(location) || /\bbombay\b/gi.test(location) || /\bchennai\b/gi.test(location) || /\bkolkata\b/gi.test(location) || /\bbanglore\b/gi.test(location) || /\bbangalore\b/gi.test(location) || /\bbengaluru\b/gi.test(location) || /\bdl\b/gi.test(location) || /\bblr\b/gi.test(location) || /\bbhopal\b/gi.test(location) || /\bvishakhapatnam\b/gi.test(location) || /\bvizag\b/gi.test(location) || /\buttar pradesh\b/gi.test(location) || /\bmadhya pradesh\b/gi.test(location) || /\bmadhaya pradesh\b/gi.test(location) || /\buttarpradesh\b/gi.test(location) || /\bmadhyapradesh\b/gi.test(location) || /\bmadhayapradesh\b/gi.test(location) || /\bup\b/gi.test(location) || /\bmp\b/gi.test(location) || /\bpunjab\b/gi.test(location) || /\bassam\b/gi.test(location) || /\bhyderabad\b/gi.test(location) || /\bgujarat\b/gi.test(location) || /\bahmedabad\b/gi.test(location) || /\bjammu\b/gi.test(location) || /\bkashmir\b/gi.test(location) || /\bpalakad\b/gi.test(location) || /\bpalakkad\b/gi.test(location) || /\bprayagraj\b/gi.test(location) || /\bvaranasi\b/gi.test(location) || /\bnowshera\b/gi.test(location) || /\bharyana\b/gi.test(location) || /\bsecunderabad\b/gi.test(location) || /\bbhagyanagar\b/gi.test(location) || /\bkarnavati\b/gi.test(location) || /\blucknow\b/gi.test(location) || /\bdilli\b/gi.test(location) || /\ballahabad\b/gi.test(location) || /\bmysore\b/gi.test(location) || /\bkochi\b/gi.test(location) || /\bcochin\b/gi.test(location) || /\bmadras\b/gi.test(location) || /\bpradesh\b/gi.test(location) || /\bnagar\b/gi.test(location) || /\bbihar\b/gi.test(location) || /\btelangana\b/gi.test(location) || /\bghaziabad\b/gi.test(location) || /\bkanpur\b/gi.test(location) || /\bagra\b/gi.test(location) || /\bguwahati\b/gi.test(location)) { 
    return 'IN';
  } else if (/\bBD\b/gi.test(location) || /\bBND\b/gi.test(location) || /\bbangladesh\b/gi.test(location) || /\bdhaka\b/gi.test(location)) {
    return 'BD';
  } else if (/\bKSA\b/gi.test(location)|| /\bsaudi\b/gi.test(location) || /\barabia\b/gi.test(location) || /\bsaudi arabia\b/gi.test(location) || /\bsaud\b/gi.test(location) || /\bmecca\b/gi.test(location) || /\bmadina\b/gi.test(location)) {
    return 'SA';
  }

  countryNames.forEach((countryName, index) => {
    if (location.toLowerCase().includes(countryName.toLowerCase())) {
      return countryCodes[index];
    }
  });
}

export const countryCodeExists = codeExists;
export const isJapanese = hasJapanese;
export const isKorean = hasKorean;
export const isChinese = hasChinese;
export const isIndian = hasIndian;
export const isSinhala = hasSinhala;
export const isBurmese = hasBurmese;
export const isKhmer = hasKhmer;
export const isThai = hasThai;
export const isLao = hasLao;
export const isArmeninan = hasArmeninan;
export const isGeorgian = hasGeorgian;
export const isMongolian = hasMongolian;
export const isGreek = hasGreek;
export const isHebrew = hasHebrew;
export const isEnglish = hasEnglish;
export const getCCFromLang = getCountryCodeFromLang;
export const getCCBasic = checkCountriesMan;
export const countryAbbrCount = countryCodeCount;