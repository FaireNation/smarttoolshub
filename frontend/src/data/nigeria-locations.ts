import type { NigerianState } from '../types';

export const nigerianStates: NigerianState[] = [
  {
    name: 'Lagos',
    code: 'LG',
    lgas: [
      'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa',
      'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye',
      'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland',
      'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere'
    ]
  },
  {
    name: 'Abuja (FCT)',
    code: 'FC',
    lgas: [
      'Abaji', 'Bwari', 'Gwagwalada', 'Kuje', 'Kwali', 'Municipal Area Council'
    ]
  },
  {
    name: 'Kano',
    code: 'KN',
    lgas: [
      'Ajingi', 'Albasu', 'Bagwai', 'Bebeji', 'Bichi', 'Bunkure', 'Dala',
      'Dambatta', 'Dawakin Kudu', 'Dawakin Tofa', 'Doguwa', 'Fagge',
      'Gabasawa', 'Garko', 'Garun Mallam', 'Gaya', 'Gezawa', 'Gwale',
      'Gwarzo', 'Kabo', 'Kano Municipal', 'Karaye', 'Kibiya', 'Kiru',
      'Kumbotso', 'Kunchi', 'Kura', 'Madobi', 'Makoda', 'Minjibir',
      'Nasarawa', 'Rano', 'Rimin Gado', 'Rogo', 'Shanono', 'Sumaila',
      'Takai', 'Tarauni', 'Tofa', 'Tsanyawa', 'Tudun Wada', 'Ungogo',
      'Warawa', 'Wudil'
    ]
  },
  {
    name: 'Rivers',
    code: 'RI',
    lgas: [
      'Abua/Odual', 'Ahoada East', 'Ahoada West', 'Akuku-Toru', 'Andoni',
      'Asari-Toru', 'Bonny', 'Degema', 'Eleme', 'Emohua', 'Etche',
      'Gokana', 'Ikwerre', 'Khana', 'Obio/Akpor', 'Ogba/Egbema/Ndoni',
      'Ogu/Bolo', 'Okrika', 'Omuma', 'Opobo/Nkoro', 'Oyigbo',
      'Port Harcourt', 'Tai'
    ]
  },
  {
    name: 'Oyo',
    code: 'OY',
    lgas: [
      'Afijio', 'Akinyele', 'Atiba', 'Atisbo', 'Egbeda', 'Ibadan North',
      'Ibadan North-East', 'Ibadan North-West', 'Ibadan South-East',
      'Ibadan South-West', 'Ibarapa Central', 'Ibarapa East', 'Ibarapa North',
      'Ido', 'Irepo', 'Iseyin', 'Itesiwaju', 'Iwajowa', 'Kajola', 'Lagelu',
      'Ogbomoso North', 'Ogbomoso South', 'Ogo Oluwa', 'Olorunsogo',
      'Oluyole', 'Ona Ara', 'Orelope', 'Ori Ire', 'Oyo East', 'Oyo West',
      'Saki East', 'Saki West', 'Surulere'
    ]
  },
  {
    name: 'Kaduna',
    code: 'KD',
    lgas: [
      'Birnin Gwari', 'Chikun', 'Giwa', 'Igabi', 'Ikara', 'Jaba',
      'Jema\'a', 'Kachia', 'Kaduna North', 'Kaduna South', 'Kagarko',
      'Kajuru', 'Kaura', 'Kauru', 'Kubau', 'Kudan', 'Lere', 'Makarfi',
      'Sabon Gari', 'Sanga', 'Soba', 'Zangon Kataf', 'Zaria'
    ]
  }
  // Adding more states would be extensive, these are the major ones
];

// Helper functions
export const getStateByName = (name: string): NigerianState | undefined => {
  return nigerianStates.find(state => 
    state.name.toLowerCase() === name.toLowerCase()
  );
};

export const getLGAsByState = (stateName: string): string[] => {
  const state = getStateByName(stateName);
  return state?.lgas || [];
};

export const getAllStates = (): string[] => {
  return nigerianStates.map(state => state.name);
};