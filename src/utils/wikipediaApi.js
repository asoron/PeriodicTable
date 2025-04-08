/**
 * Element bilgilerini Wikipedia'dan çekmek için API
 */

// Periyodik tablodaki tüm elementlerin listesi
const elementList = [
  { atomicNumber: 1, symbol: 'H', name: 'Hydrogen', nameTR: 'Hidrojen', category: 'nonmetal' },
  { atomicNumber: 2, symbol: 'He', name: 'Helium', nameTR: 'Helyum', category: 'noble-gas' },
  { atomicNumber: 3, symbol: 'Li', name: 'Lithium', nameTR: 'Lityum', category: 'alkali' },
  { atomicNumber: 4, symbol: 'Be', name: 'Beryllium', nameTR: 'Berilyum', category: 'alkaline' },
  { atomicNumber: 5, symbol: 'B', name: 'Boron', nameTR: 'Bor', category: 'metalloid' },
  { atomicNumber: 6, symbol: 'C', name: 'Carbon', nameTR: 'Karbon', category: 'nonmetal' },
  { atomicNumber: 7, symbol: 'N', name: 'Nitrogen', nameTR: 'Azot', category: 'nonmetal' },
  { atomicNumber: 8, symbol: 'O', name: 'Oxygen', nameTR: 'Oksijen', category: 'nonmetal' },
  { atomicNumber: 9, symbol: 'F', name: 'Fluorine', nameTR: 'Flor', category: 'halogen' },
  { atomicNumber: 10, symbol: 'Ne', name: 'Neon', nameTR: 'Neon', category: 'noble-gas' },
  { atomicNumber: 11, symbol: 'Na', name: 'Sodium', nameTR: 'Sodyum', category: 'alkali' },
  { atomicNumber: 12, symbol: 'Mg', name: 'Magnesium', nameTR: 'Magnezyum', category: 'alkaline' },
  { atomicNumber: 13, symbol: 'Al', name: 'Aluminum', nameTR: 'Alüminyum', category: 'post-transition' },
  { atomicNumber: 14, symbol: 'Si', name: 'Silicon', nameTR: 'Silisyum', category: 'metalloid' },
  { atomicNumber: 15, symbol: 'P', name: 'Phosphorus', nameTR: 'Fosfor', category: 'nonmetal' },
  { atomicNumber: 16, symbol: 'S', name: 'Sulfur', nameTR: 'Kükürt', category: 'nonmetal' },
  { atomicNumber: 17, symbol: 'Cl', name: 'Chlorine', nameTR: 'Klor', category: 'halogen' },
  { atomicNumber: 18, symbol: 'Ar', name: 'Argon', nameTR: 'Argon', category: 'noble-gas' },
  { atomicNumber: 19, symbol: 'K', name: 'Potassium', nameTR: 'Potasyum', category: 'alkali' },
  { atomicNumber: 20, symbol: 'Ca', name: 'Calcium', nameTR: 'Kalsiyum', category: 'alkaline' },
  { atomicNumber: 21, symbol: 'Sc', name: 'Scandium', nameTR: 'Skandiyum', category: 'transition-metal' },
  { atomicNumber: 22, symbol: 'Ti', name: 'Titanium', nameTR: 'Titanyum', category: 'transition-metal' },
  { atomicNumber: 23, symbol: 'V', name: 'Vanadium', nameTR: 'Vanadyum', category: 'transition-metal' },
  { atomicNumber: 24, symbol: 'Cr', name: 'Chromium', nameTR: 'Krom', category: 'transition-metal' },
  { atomicNumber: 25, symbol: 'Mn', name: 'Manganese', nameTR: 'Mangan', category: 'transition-metal' },
  { atomicNumber: 26, symbol: 'Fe', name: 'Iron', nameTR: 'Demir', category: 'transition-metal' },
  { atomicNumber: 27, symbol: 'Co', name: 'Cobalt', nameTR: 'Kobalt', category: 'transition-metal' },
  { atomicNumber: 28, symbol: 'Ni', name: 'Nickel', nameTR: 'Nikel', category: 'transition-metal' },
  { atomicNumber: 29, symbol: 'Cu', name: 'Copper', nameTR: 'Bakır', category: 'transition-metal' },
  { atomicNumber: 30, symbol: 'Zn', name: 'Zinc', nameTR: 'Çinko', category: 'transition-metal' },
  { atomicNumber: 31, symbol: 'Ga', name: 'Gallium', nameTR: 'Galyum', category: 'post-transition' },
  { atomicNumber: 32, symbol: 'Ge', name: 'Germanium', nameTR: 'Germanyum', category: 'metalloid' },
  { atomicNumber: 33, symbol: 'As', name: 'Arsenic', nameTR: 'Arsenik', category: 'metalloid' },
  { atomicNumber: 34, symbol: 'Se', name: 'Selenium', nameTR: 'Selenyum', category: 'nonmetal' },
  { atomicNumber: 35, symbol: 'Br', name: 'Bromine', nameTR: 'Brom', category: 'halogen' },
  { atomicNumber: 36, symbol: 'Kr', name: 'Krypton', nameTR: 'Kripton', category: 'noble-gas' },
  { atomicNumber: 37, symbol: 'Rb', name: 'Rubidium', nameTR: 'Rubidyum', category: 'alkali' },
  { atomicNumber: 38, symbol: 'Sr', name: 'Strontium', nameTR: 'Stronsiyum', category: 'alkaline' },
  { atomicNumber: 39, symbol: 'Y', name: 'Yttrium', nameTR: 'İtriyum', category: 'transition-metal' },
  { atomicNumber: 40, symbol: 'Zr', name: 'Zirconium', nameTR: 'Zirkonyum', category: 'transition-metal' },
  { atomicNumber: 41, symbol: 'Nb', name: 'Niobium', nameTR: 'Niyobyum', category: 'transition-metal' },
  { atomicNumber: 42, symbol: 'Mo', name: 'Molybdenum', nameTR: 'Molibden', category: 'transition-metal' },
  { atomicNumber: 43, symbol: 'Tc', name: 'Technetium', nameTR: 'Teknesyum', category: 'transition-metal' },
  { atomicNumber: 44, symbol: 'Ru', name: 'Ruthenium', nameTR: 'Rutenyum', category: 'transition-metal' },
  { atomicNumber: 45, symbol: 'Rh', name: 'Rhodium', nameTR: 'Rodyum', category: 'transition-metal' },
  { atomicNumber: 46, symbol: 'Pd', name: 'Palladium', nameTR: 'Paladyum', category: 'transition-metal' },
  { atomicNumber: 47, symbol: 'Ag', name: 'Silver', nameTR: 'Gümüş', category: 'transition-metal' },
  { atomicNumber: 48, symbol: 'Cd', name: 'Cadmium', nameTR: 'Kadmiyum', category: 'transition-metal' },
  { atomicNumber: 49, symbol: 'In', name: 'Indium', nameTR: 'İndiyum', category: 'post-transition' },
  { atomicNumber: 50, symbol: 'Sn', name: 'Tin', nameTR: 'Kalay', category: 'post-transition' },
  { atomicNumber: 51, symbol: 'Sb', name: 'Antimony', nameTR: 'Antimon', category: 'metalloid' },
  { atomicNumber: 52, symbol: 'Te', name: 'Tellurium', nameTR: 'Tellür', category: 'metalloid' },
  { atomicNumber: 53, symbol: 'I', name: 'Iodine', nameTR: 'İyot', category: 'halogen' },
  { atomicNumber: 54, symbol: 'Xe', name: 'Xenon', nameTR: 'Ksenon', category: 'noble-gas' },
  { atomicNumber: 55, symbol: 'Cs', name: 'Cesium', nameTR: 'Sezyum', category: 'alkali' },
  { atomicNumber: 56, symbol: 'Ba', name: 'Barium', nameTR: 'Baryum', category: 'alkaline' },
  { atomicNumber: 57, symbol: 'La', name: 'Lanthanum', nameTR: 'Lantan', category: 'lanthanide' },
  { atomicNumber: 58, symbol: 'Ce', name: 'Cerium', nameTR: 'Seryum', category: 'lanthanide' },
  { atomicNumber: 59, symbol: 'Pr', name: 'Praseodymium', nameTR: 'Praseodim', category: 'lanthanide' },
  { atomicNumber: 60, symbol: 'Nd', name: 'Neodymium', nameTR: 'Neodim', category: 'lanthanide' },
  { atomicNumber: 61, symbol: 'Pm', name: 'Promethium', nameTR: 'Prometyum', category: 'lanthanide' },
  { atomicNumber: 62, symbol: 'Sm', name: 'Samarium', nameTR: 'Samaryum', category: 'lanthanide' },
  { atomicNumber: 63, symbol: 'Eu', name: 'Europium', nameTR: 'Evropiyum', category: 'lanthanide' },
  { atomicNumber: 64, symbol: 'Gd', name: 'Gadolinium', nameTR: 'Gadolinyum', category: 'lanthanide' },
  { atomicNumber: 65, symbol: 'Tb', name: 'Terbium', nameTR: 'Terbiyum', category: 'lanthanide' },
  { atomicNumber: 66, symbol: 'Dy', name: 'Dysprosium', nameTR: 'Disprosyum', category: 'lanthanide' },
  { atomicNumber: 67, symbol: 'Ho', name: 'Holmium', nameTR: 'Holmiyum', category: 'lanthanide' },
  { atomicNumber: 68, symbol: 'Er', name: 'Erbium', nameTR: 'Erbiyum', category: 'lanthanide' },
  { atomicNumber: 69, symbol: 'Tm', name: 'Thulium', nameTR: 'Tulyum', category: 'lanthanide' },
  { atomicNumber: 70, symbol: 'Yb', name: 'Ytterbium', nameTR: 'İterbiyum', category: 'lanthanide' },
  { atomicNumber: 71, symbol: 'Lu', name: 'Lutetium', nameTR: 'Lutesyum', category: 'lanthanide' },
  { atomicNumber: 72, symbol: 'Hf', name: 'Hafnium', nameTR: 'Hafniyum', category: 'transition-metal' },
  { atomicNumber: 73, symbol: 'Ta', name: 'Tantalum', nameTR: 'Tantal', category: 'transition-metal' },
  { atomicNumber: 74, symbol: 'W', name: 'Tungsten', nameTR: 'Tungsten', category: 'transition-metal' },
  { atomicNumber: 75, symbol: 'Re', name: 'Rhenium', nameTR: 'Renyum', category: 'transition-metal' },
  { atomicNumber: 76, symbol: 'Os', name: 'Osmium', nameTR: 'Osmiyum', category: 'transition-metal' },
  { atomicNumber: 77, symbol: 'Ir', name: 'Iridium', nameTR: 'İridyum', category: 'transition-metal' },
  { atomicNumber: 78, symbol: 'Pt', name: 'Platinum', nameTR: 'Platin', category: 'transition-metal' },
  { atomicNumber: 79, symbol: 'Au', name: 'Gold', nameTR: 'Altın', category: 'transition-metal' },
  { atomicNumber: 80, symbol: 'Hg', name: 'Mercury', nameTR: 'Cıva', category: 'transition-metal' },
  { atomicNumber: 81, symbol: 'Tl', name: 'Thallium', nameTR: 'Talyum', category: 'post-transition' },
  { atomicNumber: 82, symbol: 'Pb', name: 'Lead', nameTR: 'Kurşun', category: 'post-transition' },
  { atomicNumber: 83, symbol: 'Bi', name: 'Bismuth', nameTR: 'Bizmut', category: 'post-transition' },
  { atomicNumber: 84, symbol: 'Po', name: 'Polonium', nameTR: 'Polonyum', category: 'post-transition' },
  { atomicNumber: 85, symbol: 'At', name: 'Astatine', nameTR: 'Astatin', category: 'halogen' },
  { atomicNumber: 86, symbol: 'Rn', name: 'Radon', nameTR: 'Radon', category: 'noble-gas' },
  { atomicNumber: 87, symbol: 'Fr', name: 'Francium', nameTR: 'Fransiyum', category: 'alkali' },
  { atomicNumber: 88, symbol: 'Ra', name: 'Radium', nameTR: 'Radyum', category: 'alkaline' },
  { atomicNumber: 89, symbol: 'Ac', name: 'Actinium', nameTR: 'Aktinyum', category: 'actinide' },
  { atomicNumber: 90, symbol: 'Th', name: 'Thorium', nameTR: 'Toryum', category: 'actinide' },
  { atomicNumber: 91, symbol: 'Pa', name: 'Protactinium', nameTR: 'Protaktinyum', category: 'actinide' },
  { atomicNumber: 92, symbol: 'U', name: 'Uranium', nameTR: 'Uranyum', category: 'actinide' },
  { atomicNumber: 93, symbol: 'Np', name: 'Neptunium', nameTR: 'Neptünyum', category: 'actinide' },
  { atomicNumber: 94, symbol: 'Pu', name: 'Plutonium', nameTR: 'Plutonyum', category: 'actinide' },
  { atomicNumber: 95, symbol: 'Am', name: 'Americium', nameTR: 'Amerikyum', category: 'actinide' },
  { atomicNumber: 96, symbol: 'Cm', name: 'Curium', nameTR: 'Küriyum', category: 'actinide' },
  { atomicNumber: 97, symbol: 'Bk', name: 'Berkelium', nameTR: 'Berkelyum', category: 'actinide' },
  { atomicNumber: 98, symbol: 'Cf', name: 'Californium', nameTR: 'Kaliforniyum', category: 'actinide' },
  { atomicNumber: 99, symbol: 'Es', name: 'Einsteinium', nameTR: 'Aynştaynyum', category: 'actinide' },
  { atomicNumber: 100, symbol: 'Fm', name: 'Fermium', nameTR: 'Fermiyum', category: 'actinide' },
  { atomicNumber: 101, symbol: 'Md', name: 'Mendelevium', nameTR: 'Mendelevyum', category: 'actinide' },
  { atomicNumber: 102, symbol: 'No', name: 'Nobelium', nameTR: 'Nobelyum', category: 'actinide' },
  { atomicNumber: 103, symbol: 'Lr', name: 'Lawrencium', nameTR: 'Lavrensiyum', category: 'actinide' },
  { atomicNumber: 104, symbol: 'Rf', name: 'Rutherfordium', nameTR: 'Raderfordyum', category: 'transition-metal' },
  { atomicNumber: 105, symbol: 'Db', name: 'Dubnium', nameTR: 'Dubniyum', category: 'transition-metal' },
  { atomicNumber: 106, symbol: 'Sg', name: 'Seaborgium', nameTR: 'Seaborgiyum', category: 'transition-metal' },
  { atomicNumber: 107, symbol: 'Bh', name: 'Bohrium', nameTR: 'Bohriyum', category: 'transition-metal' },
  { atomicNumber: 108, symbol: 'Hs', name: 'Hassium', nameTR: 'Hassiyum', category: 'transition-metal' },
  { atomicNumber: 109, symbol: 'Mt', name: 'Meitnerium', nameTR: 'Meitneriyum', category: 'transition-metal' },
  { atomicNumber: 110, symbol: 'Ds', name: 'Darmstadtium', nameTR: 'Darmştadyum', category: 'transition-metal' },
  { atomicNumber: 111, symbol: 'Rg', name: 'Roentgenium', nameTR: 'Röntgenyum', category: 'transition-metal' },
  { atomicNumber: 112, symbol: 'Cn', name: 'Copernicium', nameTR: 'Kopernikyum', category: 'transition-metal' },
  { atomicNumber: 113, symbol: 'Nh', name: 'Nihonium', nameTR: 'Nihonyum', category: 'post-transition' },
  { atomicNumber: 114, symbol: 'Fl', name: 'Flerovium', nameTR: 'Flerovyum', category: 'post-transition' },
  { atomicNumber: 115, symbol: 'Mc', name: 'Moscovium', nameTR: 'Moskovyum', category: 'post-transition' },
  { atomicNumber: 116, symbol: 'Lv', name: 'Livermorium', nameTR: 'Livermoryum', category: 'post-transition' },
  { atomicNumber: 117, symbol: 'Ts', name: 'Tennessine', nameTR: 'Tennesin', category: 'halogen' },
  { atomicNumber: 118, symbol: 'Og', name: 'Oganesson', nameTR: 'Oganesson', category: 'noble-gas' }
];

// Tüm elementleri getiren fonksiyon - artık CSV ile birleştirilmesi için temel veriler
export const getAllElements = () => {
  return elementList.map(element => ({
    Atomic_Number: element.atomicNumber.toString(),
    Symbol: element.symbol,
    Name: element.name,
    NameTR: element.nameTR,
    Category: element.category
  }));
};

// Element başlık/özet bilgilerini çekme - cache ile
let elementInfoCache = {};

// Wikipedia'dan HTML içeriğini çekme fonksiyonu
export const fetchElementHtml = async (elementName, lang = 'tr') => {
  try {
    // Wikipedia'nın HTML içeriğini al
    const response = await fetch(`https://${lang}.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(elementName)}&prop=text&format=json&origin=*`);
    
    if (!response.ok) {
      throw new Error(`Wikipedia API yanıt vermedi: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.error || !data.parse || !data.parse.text || !data.parse.text['*']) {
      throw new Error('Wikipedia API geçerli bir yanıt vermedi');
    }
    
    return data.parse.text['*'];
  } catch (error) {
    console.error('Wikipedia HTML alınamadı:', error);
    return '';
  }
};

// Element özelliklerini HTML'den çıkaran fonksiyon
const extractElementProperties = (html) => {
  const properties = {
    Phase: '',
    Density: '',
    Melting_Point: '',
    Boiling_Point: '',
    Crystal_Structure: '',
    Heat_Capacity: '',
    Thermal_Conductivity: '',
    Magnetic_Order: '',
    Electron_Configuration: '',
    Electronegativity: '',
    Ionization_Energy: '',
    Oxidation_States: '',
    Year_of_Discovery: '',
    Discoverer: '',
    Main_Isotopes: '',
    Atomic_Radius: ''
  };
  
  // HTML içeriği bir DOM belgesine çevir
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Element özellik tablosunu bul (wikitable sınıfına sahip)
  const infoboxTable = doc.querySelector('.wikitable, .infobox');
  
  if (!infoboxTable) {
    console.warn('Wikipedia sayfasında özellik tablosu bulunamadı');
    return properties;
  }
  
  // Tablo içindeki tüm satırları işle
  const rows = infoboxTable.querySelectorAll('tr');
  rows.forEach(row => {
    // Her satırın ilk sütunundan özellik adını al
    const headCell = row.querySelector('td:first-child, th:first-child');
    if (!headCell) return;
    
    // Özellik adı içeriğini al
    const propertyName = headCell.textContent.trim();
    
    // İkinci sütunda değeri al
    const valueCell = row.querySelector('td:last-child');
    if (!valueCell) return;
    
    // Değer içeriğini al
    let propertyValue = valueCell.textContent.trim();
    
    // Özellikleri eşleştir ve kaydet
    if (propertyName.includes('Maddenin hâli') || propertyName.includes('Faz')) {
      properties.Phase = propertyValue;
    } 
    else if (propertyName.includes('Yoğunluk')) {
      properties.Density = propertyValue;
    }
    else if (propertyName.includes('Ergime') && propertyName.includes('nokta')) {
      properties.Melting_Point = propertyValue;
    }
    else if (propertyName.includes('Kaynama') && propertyName.includes('nokta')) {
      properties.Boiling_Point = propertyValue;
    }
    else if (propertyName.includes('Kristal')) {
      properties.Crystal_Structure = propertyValue;
    }
    else if (propertyName.includes('Isı kapasitesi')) {
      properties.Heat_Capacity = propertyValue;
    }
    else if (propertyName.includes('Isıl iletkenlik') || propertyName.includes('Termal iletkenlik')) {
      properties.Thermal_Conductivity = propertyValue;
    }
    else if (propertyName.includes('Elektron dizilimi')) {
      properties.Electron_Configuration = propertyValue;
    }
    else if (propertyName.includes('Elektronegatiflik')) {
      properties.Electronegativity = propertyValue;
    }
    else if (propertyName.includes('İyonlaşma') && propertyName.includes('enerji')) {
      properties.Ionization_Energy = propertyValue;
    }
    else if (propertyName.includes('Yükseltgenme') || propertyName.includes('Oksidasyon')) {
      properties.Oxidation_States = propertyValue;
    }
    else if (propertyName.includes('Atom yarıçap')) {
      properties.Atomic_Radius = propertyValue;
    }
  });
  
  return properties;
};

// Element özellikleri çekme - cache ile
let elementPropertiesCache = {};

export const fetchElementPropertiesWithCache = async (element, lang = 'tr') => {
  const cacheKey = `${element.Symbol}_properties_${lang}`;
  
  // Önbellekte varsa, oradan döndür
  if (elementPropertiesCache[cacheKey]) {
    return elementPropertiesCache[cacheKey];
  }
  
  // Element adını belirle
  const elementName = getElementWikipediaName(element, lang);
  
  // Wikipedia HTML içeriğini çek
  const html = await fetchElementHtml(elementName, lang);
  
  // HTML'den özellikleri çıkar
  const properties = extractElementProperties(html);
  
  // Element bilgilerini de ekle
  properties.Name = element.Name;
  properties.NameTR = element.NameTR;
  properties.Symbol = element.Symbol;
  properties.Atomic_Number = element.Atomic_Number;
  properties.Category = element.Category;
  
  // Önbelleğe al
  elementPropertiesCache[cacheKey] = properties;
  
  return properties;
};

// Wikipedia element bilgisi çekme - yeni geliştirilmiş
export const fetchElementInfoWithCache = async (element, lang = 'tr') => {
  const cacheKey = `${element.Symbol}_info_${lang}`;
  
  // Önbellekte varsa, oradan döndür
  if (elementInfoCache[cacheKey]) {
    return elementInfoCache[cacheKey];
  }
  
  try {
    // Element adını belirle
    const elementName = getElementWikipediaName(element, lang);
    
    // Wikipedia'dan özet bilgiyi al
    const response = await fetch(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(elementName)}`);
    
    if (!response.ok) {
      throw new Error(`Wikipedia API yanıt vermedi: ${response.statusText}`);
    }
    
    const data = await response.json();
    const result = {
      title: data.title,
      extract: data.extract,
      extract_html: data.extract_html,
      thumbnail: data.thumbnail,
      content_urls: data.content_urls,
      htmlContent: await fetchElementHtml(elementName, lang)
    };
    
    // Önbelleğe al
    elementInfoCache[cacheKey] = result;
    
    return result;
  } catch (error) {
    console.error(`${element.Symbol} için Wikipedia bilgisi alınamadı:`, error);
    return null;
  }
};

// HTML içeriğinden temizleme fonksiyonu
const cleanHTML = (htmlString) => {
  if (!htmlString) return '';
  
  // HTML taglarını kaldır
  let text = htmlString.replace(/<[^>]*>/g, ' ');
  
  // Fazla boşlukları kaldır
  text = text.replace(/\s+/g, ' ').trim();
  
  // HTML karakterlerini decode et
  text = text.replace(/&nbsp;/g, ' ')
             .replace(/&lt;/g, '<')
             .replace(/&gt;/g, '>')
             .replace(/&amp;/g, '&');
             
  return text;
};

// Regex ile property çıkarma yardımcı fonksiyonu
const extractProperty = (html, regex, callback) => {
  const match = html.match(regex);
  if (match && match[1]) {
    callback(match[1]);
  }
};

// Element adlarının doğru dilinde çekilmesini sağlar
export const getElementWikipediaName = (element, lang = 'tr') => {
  if (lang === 'tr') {
    return element.NameTR || element.Name;
  }
  return element.Name;
};

// Tüm elementleri ve özelliklerini Wikipedia'dan çeker
export const fetchAllElementsWithProperties = async () => {
  const elements = getAllElements();
  const enrichedElements = [];
  
  // Her bir element için özellikleri çek
  for (const element of elements) {
    try {
      const properties = await fetchElementPropertiesWithCache(element);
      enrichedElements.push({
        ...element,
        ...properties
      });
    } catch (error) {
      console.error(`${element.Name} için özellikler çekilemedi:`, error);
      enrichedElements.push(element);
    }
  }
  
  return enrichedElements;
}; 