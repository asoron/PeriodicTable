import React, { useMemo } from 'react';
import './ElementCard.css';

const ElementCard = ({ element, onClick, isSelected, temperature }) => {
  // Element kategorisi sınıfını al
  const getCategoryClass = () => {
    return element.Category || 'unknown';
  };
  
  // Ağırlık formatı
  const formatAtomicWeight = () => {
    if (element.Atomic_Weight) {
      const weight = parseFloat(element.Atomic_Weight);
      if (!isNaN(weight)) {
        return weight.toFixed(2);
      }
    }
    return element.Atomic_Weight || '';
  };

  // useMemo kullanarak fazı hesapla ve önbelleğe al - yalnızca element veya sıcaklık değiştiğinde yeniden hesaplanır
  const elementPhase = useMemo(() => {
    try {
      // Sıcaklık değerini kontrol et
      if (temperature === undefined) return 'solid';
      
      // Element sembolüne göre özel hal hesaplaması
      switch(element.Symbol) {
        // Hidrojen
        case 'H':
          return temperature > 3000 ? 'plasma' : 
                 temperature > -252.87 ? 'gas' : 
                 temperature > -259.16 ? 'liquid' : 
                 'solid';
        // Helyum
        case 'He':
          return temperature > 5000 ? 'plasma' : 
                 temperature > -268.93 ? 'gas' :
                 temperature > -272.2 ? 'liquid' : 
                 'solid';
        // Lityum
        case 'Li':
          return temperature > 3500 ? 'plasma' : 
                 temperature > 1342 ? 'gas' : 
                 temperature > 180.5 ? 'liquid' : 
                 'solid';
        // Berilyum
        case 'Be':
          return temperature > 4000 ? 'plasma' : 
                 temperature > 2470 ? 'gas' : 
                 temperature > 1287 ? 'liquid' : 
                 'solid';
        // Bor
        case 'B':
          return temperature > 4200 ? 'plasma' : 
                 temperature > 3927 ? 'gas' : 
                 temperature > 2075 ? 'liquid' : 
                 'solid';
        // Karbon
        case 'C':
          return temperature > 4500 ? 'plasma' : 
                 temperature > 3642 ? 'gas' : 
                 temperature > 3550 ? 'liquid' : 
                 'solid';
        // Azot
        case 'N':
          return temperature > 4000 ? 'plasma' : 
                 temperature > -195.79 ? 'gas' : 
                 temperature > -210.1 ? 'liquid' : 
                 'solid';
        // Oksijen
        case 'O':
          return temperature > 4000 ? 'plasma' : 
                 temperature > -182.96 ? 'gas' : 
                 temperature > -218.79 ? 'liquid' : 
                 'solid';
        // Flor
        case 'F':
          return temperature > 4300 ? 'plasma' : 
                 temperature > -188.12 ? 'gas' : 
                 temperature > -219.67 ? 'liquid' : 
                 'solid';
        // Neon
        case 'Ne':
          return temperature > 5000 ? 'plasma' : 
                 temperature > -246.08 ? 'gas' : 
                 temperature > -248.59 ? 'liquid' : 
                 'solid';
        // Sodyum
        case 'Na':
          return temperature > 3400 ? 'plasma' : 
                 temperature > 882.9 ? 'gas' : 
                 temperature > 97.72 ? 'liquid' : 
                 'solid';
        // Magnezyum
        case 'Mg':
          return temperature > 3850 ? 'plasma' : 
                 temperature > 1090 ? 'gas' : 
                 temperature > 650 ? 'liquid' : 
                 'solid';
        // Alüminyum
        case 'Al':
          return temperature > 4000 ? 'plasma' : 
                 temperature > 2519 ? 'gas' : 
                 temperature > 660.32 ? 'liquid' : 
                 'solid';
        // Silisyum
        case 'Si':
          return temperature > 4300 ? 'plasma' : 
                 temperature > 3265 ? 'gas' : 
                 temperature > 1414 ? 'liquid' : 
                 'solid';
        // Fosfor
        case 'P':
          return temperature > 4200 ? 'plasma' : 
                 temperature > 280.5 ? 'gas' : 
                 temperature > 44.15 ? 'liquid' : 
                 'solid';
        // Kükürt
        case 'S':
          return temperature > 4000 ? 'plasma' : 
                 temperature > 444.67 ? 'gas' : 
                 temperature > 115.21 ? 'liquid' : 
                 'solid';
        // Klor
        case 'Cl':
          return temperature > 4200 ? 'plasma' : 
                 temperature > -34.04 ? 'gas' : 
                 temperature > -101.5 ? 'liquid' : 
                 'solid';
        // Argon
        case 'Ar':
          return temperature > 5300 ? 'plasma' : 
                 temperature > -185.848 ? 'gas' : 
                 temperature > -189.34 ? 'liquid' : 
                 'solid';
        // Potasyum
        case 'K':
          return temperature > 3200 ? 'plasma' : 
                 temperature > 759 ? 'gas' : 
                 temperature > 63.38 ? 'liquid' : 
                 'solid';
        // Kalsiyum
        case 'Ca':
          return temperature > 3800 ? 'plasma' : 
                 temperature > 1484 ? 'gas' : 
                 temperature > 842 ? 'liquid' : 
                 'solid';
        // Skandiyum
        case 'Sc':
          return temperature > 4100 ? 'plasma' : 
                 temperature > 2836 ? 'gas' : 
                 temperature > 1541 ? 'liquid' : 
                 'solid';
        // Titanyum
        case 'Ti':
          return temperature > 4300 ? 'plasma' : 
                 temperature > 3287 ? 'gas' : 
                 temperature > 1668 ? 'liquid' : 
                 'solid';
        // Vanadyum
        case 'V':
          return temperature > 4500 ? 'plasma' : 
                 temperature > 3407 ? 'gas' : 
                 temperature > 1910 ? 'liquid' : 
                 'solid';
        // Krom
        case 'Cr':
          return temperature > 4300 ? 'plasma' : 
                 temperature > 2671 ? 'gas' : 
                 temperature > 1907 ? 'liquid' : 
                 'solid';
        // Mangan
        case 'Mn':
          return temperature > 4200 ? 'plasma' : 
                 temperature > 2061 ? 'gas' : 
                 temperature > 1246 ? 'liquid' : 
                 'solid';
        // Demir (Fe)
        case 'Fe':
          return temperature > 4500 ? 'plasma' : 
                 temperature > 2861 ? 'gas' : 
                 temperature > 1538 ? 'liquid' : 
                 'solid';
        // Kobalt (Co)
        case 'Co':
          return temperature > 4400 ? 'plasma' : 
                 temperature > 2927 ? 'gas' : 
                 temperature > 1495 ? 'liquid' : 
                 'solid';
        // Nikel (Ni)
        case 'Ni':
          return temperature > 4300 ? 'plasma' : 
                 temperature > 2913 ? 'gas' : 
                 temperature > 1455 ? 'liquid' : 
                 'solid';
        // Bakır (Cu)
        case 'Cu':
          return temperature > 3800 ? 'plasma' : 
                 temperature > 2562 ? 'gas' : 
                 temperature > 1085 ? 'liquid' : 
                 'solid';
        // Çinko (Zn)
        case 'Zn':
          return temperature > 3700 ? 'plasma' : 
                 temperature > 907 ? 'gas' : 
                 temperature > 419.53 ? 'liquid' : 
                 'solid';
        // Galyum (Ga)
        case 'Ga':
          return temperature > 3600 ? 'plasma' : 
                 temperature > 2400 ? 'gas' : 
                 temperature > 29.76 ? 'liquid' : 
                 'solid';
        // Germanyum (Ge)
        case 'Ge':
          return temperature > 4200 ? 'plasma' : 
                 temperature > 2833 ? 'gas' : 
                 temperature > 938.25 ? 'liquid' : 
                 'solid';
        // Arsenik (As)
        case 'As':
          return temperature > 4100 ? 'plasma' : 
                 temperature > 613 ? 'gas' :  // Doğrudan buharlaşır
                 temperature > 817 ? 'liquid' : // Yüksek basınçta kullanılır
                 'solid';
        // Selenyum (Se)
        case 'Se':
          return temperature > 4000 ? 'plasma' : 
                 temperature > 685 ? 'gas' : 
                 temperature > 221 ? 'liquid' : 
                 'solid';
        // Brom (Br)
        case 'Br':
          return temperature > 4200 ? 'plasma' : 
                 temperature > 58.8 ? 'gas' : 
                 temperature > -7.2 ? 'liquid' : 
                 'solid';
        // Kripton (Kr)
        case 'Kr':
          return temperature > 5500 ? 'plasma' : 
                 temperature > -153.22 ? 'gas' : 
                 temperature > -157.36 ? 'liquid' : 
                 'solid';
        // Rubidyum (Rb)
        case 'Rb':
          return temperature > 3400 ? 'plasma' : 
                 temperature > 688 ? 'gas' : 
                 temperature > 39.31 ? 'liquid' : 
                 'solid';
        // Stronsiyum (Sr)
        case 'Sr':
          return temperature > 3600 ? 'plasma' : 
                 temperature > 1377 ? 'gas' : 
                 temperature > 777 ? 'liquid' : 
                 'solid';
        // İtriyum (Y)
        case 'Y':
          return temperature > 4100 ? 'plasma' : 
                 temperature > 3345 ? 'gas' : 
                 temperature > 1526 ? 'liquid' : 
                 'solid';
        // Zirkonyum (Zr)
        case 'Zr':
          return temperature > 4300 ? 'plasma' : 
                 temperature > 4409 ? 'gas' : 
                 temperature > 1855 ? 'liquid' : 
                 'solid';
        // Niyobyum (Nb)
        case 'Nb':
          return temperature > 4400 ? 'plasma' : 
                 temperature > 4744 ? 'gas' : 
                 temperature > 2477 ? 'liquid' : 
                 'solid';
        // Molibden (Mo)
        case 'Mo':
          return temperature > 4500 ? 'plasma' : 
                 temperature > 4639 ? 'gas' : 
                 temperature > 2623 ? 'liquid' : 
                 'solid';
        // Teknesyum (Tc)
        case 'Tc':
          return temperature > 4400 ? 'plasma' : 
                 temperature > 4265 ? 'gas' : 
                 temperature > 2157 ? 'liquid' : 
                 'solid';
        // Rutenyum (Ru)
        case 'Ru':
          return temperature > 4500 ? 'plasma' : 
                 temperature > 4150 ? 'gas' : 
                 temperature > 2334 ? 'liquid' : 
                 'solid';
        // Rodyum (Rh)
        case 'Rh':
          return temperature > 4400 ? 'plasma' : 
                 temperature > 3695 ? 'gas' : 
                 temperature > 1964 ? 'liquid' : 
                 'solid';
        // Paladyum (Pd)
        case 'Pd':
          return temperature > 4200 ? 'plasma' : 
                 temperature > 2963 ? 'gas' : 
                 temperature > 1554.9 ? 'liquid' : 
                 'solid';
        // Gümüş (Ag)
        case 'Ag':
          return temperature > 4000 ? 'plasma' : 
                 temperature > 2162 ? 'gas' : 
                 temperature > 961.78 ? 'liquid' : 
                 'solid';
        // Kadmiyum (Cd)
        case 'Cd':
          return temperature > 3900 ? 'plasma' : 
                 temperature > 767 ? 'gas' : 
                 temperature > 321.07 ? 'liquid' : 
                 'solid';
        // İndiyum (In)
        case 'In':
          return temperature > 3800 ? 'plasma' : 
                 temperature > 2072 ? 'gas' : 
                 temperature > 156.6 ? 'liquid' : 
                 'solid';
        // Kalay (Sn)
        case 'Sn':
          return temperature > 3700 ? 'plasma' : 
                 temperature > 2602 ? 'gas' : 
                 temperature > 231.93 ? 'liquid' : 
                 'solid';
        // Antimon (Sb)
        case 'Sb':
          return temperature > 4000 ? 'plasma' : 
                 temperature > 1587 ? 'gas' : 
                 temperature > 630.63 ? 'liquid' : 
                 'solid';
        // Tellür (Te)
        case 'Te':
          return temperature > 4100 ? 'plasma' : 
                 temperature > 988 ? 'gas' : 
                 temperature > 449.51 ? 'liquid' : 
                 'solid';
        // İyot (I)
        case 'I':
          return temperature > 4300 ? 'plasma' : 
                 temperature > 184.3 ? 'gas' : 
                 temperature > 113.7 ? 'liquid' : 
                 'solid';
        // Ksenon (Xe)
        case 'Xe':
          return temperature > 5500 ? 'plasma' : 
                 temperature > -108.12 ? 'gas' : 
                 temperature > -111.8 ? 'liquid' : 
                 'solid';
        // Sezyum (Cs)
        case 'Cs':
          return temperature > 3400 ? 'plasma' : 
                 temperature > 671 ? 'gas' : 
                 temperature > 28.44 ? 'liquid' : 
                 'solid';
        // Baryum (Ba)
        case 'Ba':
          return temperature > 3600 ? 'plasma' : 
                 temperature > 1897 ? 'gas' : 
                 temperature > 727 ? 'liquid' : 
                 'solid';
        // Lantan (La)
        case 'La':
          return temperature > 4000 ? 'plasma' : 
                 temperature > 3464 ? 'gas' : 
                 temperature > 920 ? 'liquid' : 
                 'solid';
        // Altın (Au)
        case 'Au':
          return temperature > 4500 ? 'plasma' : 
                 temperature > 2856 ? 'gas' : 
                 temperature > 1064.18 ? 'liquid' : 
                 'solid';
        // Cıva (Hg)
        case 'Hg':
          return temperature > 3700 ? 'plasma' : 
                 temperature > 356.73 ? 'gas' : 
                 temperature > -38.83 ? 'liquid' : 
                 'solid';
        // Kurşun (Pb)
        case 'Pb':
          return temperature > 3600 ? 'plasma' : 
                 temperature > 1749 ? 'gas' : 
                 temperature > 327.46 ? 'liquid' : 
                 'solid';
        // Bizmut (Bi)
        case 'Bi':
          return temperature > 3800 ? 'plasma' : 
                 temperature > 1564 ? 'gas' : 
                 temperature > 271.4 ? 'liquid' : 
                 'solid';
        // Polonyum (Po)
        case 'Po':
          return temperature > 4000 ? 'plasma' : 
                 temperature > 962 ? 'gas' : 
                 temperature > 254 ? 'liquid' : 
                 'solid';
        // Astatin (At)
        case 'At':
          return temperature > 4200 ? 'plasma' : 
                 temperature > 337 ? 'gas' : 
                 temperature > 302 ? 'liquid' : 
                 'solid';
        // Radon (Rn)
        case 'Rn':
          return temperature > 5400 ? 'plasma' : 
                 temperature > -71 ? 'gas' : 
                 temperature > -62 ? 'liquid' : 
                 'solid';
        // Fransiyum (Fr)
        case 'Fr':
          return temperature > 3400 ? 'plasma' : 
                 temperature > 677 ? 'gas' : 
                 temperature > 27 ? 'liquid' : 
                 'solid';
        // Radyum (Ra)
        case 'Ra':
          return temperature > 3700 ? 'plasma' : 
                 temperature > 1737 ? 'gas' : 
                 temperature > 700 ? 'liquid' : 
                 'solid';
        // Aktinyum (Ac)
        case 'Ac':
          return temperature > 4100 ? 'plasma' : 
                 temperature > 3200 ? 'gas' : 
                 temperature > 1050 ? 'liquid' : 
                 'solid';
        // Toryum (Th)
        case 'Th':
          return temperature > 4300 ? 'plasma' : 
                 temperature > 4788 ? 'gas' : 
                 temperature > 1750 ? 'liquid' : 
                 'solid';
        // Protaktinyum (Pa)
        case 'Pa':
          return temperature > 4200 ? 'plasma' : 
                 temperature > 4027 ? 'gas' : 
                 temperature > 1572 ? 'liquid' : 
                 'solid';
        // Uranyum (U)
        case 'U':
          return temperature > 4300 ? 'plasma' : 
                 temperature > 4131 ? 'gas' : 
                 temperature > 1135 ? 'liquid' : 
                 'solid';
        // Neptünyum (Np)
        case 'Np':
          return temperature > 4300 ? 'plasma' : 
                 temperature > 4000 ? 'gas' : 
                 temperature > 644 ? 'liquid' : 
                 'solid';
        // Plutonyum (Pu)
        case 'Pu':
          return temperature > 4200 ? 'plasma' : 
                 temperature > 3228 ? 'gas' : 
                 temperature > 640 ? 'liquid' : 
                 'solid';

        default:
          // Erime ve kaynama noktalarını al ve sayıya dönüştür
          let meltingPoint = element.Melting_Point ? parseFloat(element.Melting_Point) : null;
          let boilingPoint = element.Boiling_Point ? parseFloat(element.Boiling_Point) : null;
          
          // Çok yüksek sıcaklıklarda plazma fazı için kontrol
          if (temperature > 5000) {
            // Element gruplarına göre farklı plazma sıcaklıkları
            const plasmaThresholds = {
              'alkali': 3500, // Alkali metaller daha düşük sıcaklıkta iyonlaşır
              'alkaline': 3800,
              'halogen': 4300, // Halojenler daha yüksek iyonlaşma enerjisine sahip
              'noble-gas': 5500, // Soy gazlar en yüksek iyonlaşma enerjisine sahip
              'nonmetal': 4200,
              'transition-metal': 4400, // Geçiş metalleri ortalama
              'post-transition': 3800,
              'metalloid': 4200, 
              'lanthanide': 4000,
              'actinide': 4200,
              'unknown': 4500 // Bilinmeyen elementler için varsayılan değer
            };
            
            // Element kategorisine göre plazma eşiğini kontrol et
            const threshold = plasmaThresholds[element.Category] || 4500;
            
            // Sıcaklık eşik değerini geçtiyse plazma döndür
            if (temperature > threshold) {
              return 'plasma';
            }
          }
          
          // Erime ve kaynama noktaları tanımlıysa, bunları kullan
          if (meltingPoint !== null && boilingPoint !== null) {
            if (temperature < meltingPoint) return 'solid';
            if (temperature < boilingPoint) return 'liquid';
            return 'gas';
          }
          
          // Varsayılan fazları belirle (eğer erime ve kaynama noktaları yoksa)
          const defaultPhases = {
            // Soy gazlar (oda sıcaklığında gaz)
            'noble-gas': 'gas',
            
            // Ametaller
            'nonmetal': temperature > 500 ? 'gas' : 'solid',
            
            // Metaller
            'alkali': temperature > 900 ? 'gas' : temperature > 150 ? 'liquid' : 'solid',
            'alkaline': temperature > 1200 ? 'gas' : temperature > 700 ? 'liquid' : 'solid',
            'transition-metal': temperature > 2500 ? 'gas' : temperature > 1500 ? 'liquid' : 'solid',
            'post-transition': temperature > 1500 ? 'gas' : temperature > 300 ? 'liquid' : 'solid',
            'lanthanide': temperature > 3000 ? 'gas' : temperature > 1000 ? 'liquid' : 'solid',
            'actinide': temperature > 3500 ? 'gas' : temperature > 1100 ? 'liquid' : 'solid',
            
            // Yarı metaller
            'metalloid': temperature > 2500 ? 'gas' : temperature > 500 ? 'liquid' : 'solid',
            
            // Bilinmeyen veya tanımlanmamış kategoriler
            'unknown': temperature > 2000 ? 'gas' : temperature > 1000 ? 'liquid' : 'solid'
          };
          
          // Aşırı düşük sıcaklıklarda (-200°C altı) soy gazlar dışında hepsi katı olur
          if (temperature < -200 && element.Category !== 'noble-gas') {
            return 'solid';
          }
          
          // Kategoriye göre varsayılan faz kullan
          return defaultPhases[element.Category] || 'solid';
      }
      
    } catch (error) {
      console.error(`Faz hesaplama hatası (${element.Symbol}):`, error);
      // Hata durumunda varsayılan faza dön
      return 'solid';
    }
  }, [element, temperature]); // Sadece element veya sıcaklık değiştiğinde yeniden hesapla
  
  // Faz simgesi
  const getPhaseSymbol = () => {
    switch(elementPhase) {
      case 'solid': return '■';
      case 'liquid': return '≈';
      case 'gas': return '○';
      case 'plasma': return '✧';
      default: return '';
    }
  };

  return (
    <div 
      className={`element-card ${getCategoryClass()} element-phase-${elementPhase} ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(element)}
      data-phase={elementPhase}
      data-temperature={temperature}
    >
      <div className="atomic-number">{element.Atomic_Number}</div>
      <div className="symbol">{element.Symbol}</div>
      <div className="name">{element.NameTR || element.Name}</div>
      <div className="atomic-weight">{formatAtomicWeight()}</div>
      {temperature !== undefined && (
        <div className="element-phase">{getPhaseSymbol()}</div>
      )}
    </div>
  );
};

export default ElementCard; 