import React, { useState, useEffect } from 'react';
import './ElementDetail.css';
import { fetchElementInfoWithCache, fetchElementPropertiesWithCache } from '../utils/wikipediaApi';

const ElementDetail = ({ element, onClose, isPopup = false }) => {
  const [wikipediaInfo, setWikipediaInfo] = useState(null);
  const [elementProperties, setElementProperties] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (element) {
      setLoading(true);
      
      // Wikipedia bilgilerini ve eksik özellikleri çek
      Promise.all([
        fetchElementInfoWithCache(element),
        fetchElementPropertiesWithCache(element)
      ]).then(([info, properties]) => {
        setWikipediaInfo(info);
        setElementProperties(properties);
        setLoading(false);
      }).catch(error => {
        console.error('Element bilgileri çekilirken hata:', error);
        setLoading(false);
      });
    }
  }, [element]);
  
  if (!element) return null;
  
  // CSV verilerini kullan, Wikipedia'dan gelen verilerle birleştir
  const properties = {
    ...element,  // CSV'den gelen veriler
    ...(elementProperties || {})  // Wikipedia'dan gelen ek veriler
  };

  // Kategorisini belirleme
  const getCategory = () => {
    const categoryMap = {
      'alkali': 'Alkali Metal',
      'alkaline': 'Toprak Alkali Metal',
      'halogen': 'Halojen',
      'noble-gas': 'Soygaz',
      'nonmetal': 'Ametal',
      'metalloid': 'Yarı Metal',
      'transition-metal': 'Geçiş Metali',
      'post-transition': 'Post-Geçiş Metali',
      'lanthanide': 'Lantanit',
      'actinide': 'Aktinit',
      'unknown': 'Bilinmiyor'
    };
    
    return categoryMap[element.Category] || 'Bilinmiyor';
  };

  // Formatlanmış özellikler
  const formatProperty = (value) => {
    if (value === undefined || value === null || value === '') {
      return 'Bilinmiyor';
    }
    
    // Bazı Türkçe karakterlerin düzeltilmesi (Wikipedia'dan gelen verilerde bozulma olabilir)
    return value
      .replace(/&nbsp;/g, ' ')
      .replace(/&deg;/g, '°')
      .replace(/&ouml;/g, 'ö')
      .replace(/&ccedil;/g, 'ç')
      .replace(/&uuml;/g, 'ü')
      .replace(/&Uuml;/g, 'Ü')
      .replace(/&Ouml;/g, 'Ö')
      .replace(/&Ccedil;/g, 'Ç');
  };
  
  // Element detayları için CSS sınıfını belirle
  const detailClass = isPopup ? 'element-detail-popup' : 'element-detail-panel';
  
  return (
    <div className={detailClass}>
      {isPopup && (
        <button className="close-button" onClick={onClose}>&times;</button>
      )}
      
      <div className="element-detail-content">
        <div className="element-header">
          <div className="element-symbol" style={{ backgroundColor: `var(--${element.Category}-color, #777)` }}>
            {element.Symbol}
          </div>
          <div className="element-basic-info">
            <h2>{element.NameTR || element.Name}</h2>
            <p className="element-category">{getCategory()}</p>
            <div className="basic-properties">
              <div className="basic-property">
                <span className="property-label">Atom No</span>
                <span className="property-value">{element.Atomic_Number}</span>
              </div>
              <div className="basic-property">
                <span className="property-label">Atom Kütlesi</span>
                <span className="property-value">{formatProperty(element.Atomic_Weight)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="element-content">
          {/* Wikipedia bilgileri gösterimi */}
          {loading ? (
            <div className="wikipedia-loading">Wikipedia bilgileri yükleniyor...</div>
          ) : (
            wikipediaInfo && (
              <div className="wikipedia-info">
                {wikipediaInfo.thumbnail && (
                  <img 
                    src={wikipediaInfo.thumbnail.source} 
                    alt={element.Name}
                    className="wikipedia-thumbnail"
                  />
                )}
                <div className="wikipedia-extract" dangerouslySetInnerHTML={{ __html: wikipediaInfo.extract_html || wikipediaInfo.extract }} />
                <a href={wikipediaInfo.content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer" className="wikipedia-link">
                  Wikipedia'da devamını oku
                </a>
              </div>
            )
          )}
          
          <h3>Fiziksel Özellikler</h3>
          <div className="property-grid">
            <div className="property">
              <span className="property-name">Faz:</span>
              <span className="property-value">{formatProperty(properties.Phase)}</span>
            </div>
            <div className="property">
              <span className="property-name">Yoğunluk:</span>
              <span className="property-value">{formatProperty(properties.Density)}</span>
            </div>
            <div className="property">
              <span className="property-name">Erime Noktası:</span>
              <span className="property-value">{formatProperty(properties.Melting_Point)}</span>
            </div>
            <div className="property">
              <span className="property-name">Kaynama Noktası:</span>
              <span className="property-value">{formatProperty(properties.Boiling_Point)}</span>
            </div>
            <div className="property">
              <span className="property-name">Kristal Yapısı:</span>
              <span className="property-value">{formatProperty(properties.Crystal_Structure)}</span>
            </div>
            <div className="property">
              <span className="property-name">Isı Kapasitesi:</span>
              <span className="property-value">{formatProperty(properties.Heat_Capacity)}</span>
            </div>
            <div className="property">
              <span className="property-name">Isı İletkenliği:</span>
              <span className="property-value">{formatProperty(properties.Thermal_Conductivity)}</span>
            </div>
            <div className="property">
              <span className="property-name">Manyetik Düzen:</span>
              <span className="property-value">{formatProperty(properties.Magnetic_Order || properties.Magnetic_Type)}</span>
            </div>
          </div>
          
          <h3>Elektronik ve Kimyasal Özellikler</h3>
          <div className="property-grid">
            <div className="property">
              <span className="property-name">Elektron Dizilimi:</span>
              <span className="property-value">{formatProperty(properties.Electron_Configuration)}</span>
            </div>
            <div className="property">
              <span className="property-name">Elektronegatiflik:</span>
              <span className="property-value">{formatProperty(properties.Electronegativity)}</span>
            </div>
            <div className="property">
              <span className="property-name">İyonlaşma Enerjisi:</span>
              <span className="property-value">{formatProperty(properties.Ionization_Energy)}</span>
            </div>
            <div className="property">
              <span className="property-name">Yükseltgenme Durumları:</span>
              <span className="property-value">{formatProperty(properties.Oxidation_States)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementDetail; 