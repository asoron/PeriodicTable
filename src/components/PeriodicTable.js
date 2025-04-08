import React, { useEffect } from 'react';
import ElementCard from './ElementCard';
import './PeriodicTable.css';

const PeriodicTable = ({ elements, onElementClick, selectedElement, temperature }) => {
  // Sıcaklık değiştiğinde konsolda göster (debug için)
  useEffect(() => {
    console.log("Sıcaklık değişti:", temperature);
  }, [temperature]);

  if (!elements || elements.length === 0) {
    return <div>Element verisi bulunamadı</div>;
  }

  // Element haritası oluştur (atom numarasına göre)
  const elementMap = {};
  elements.forEach(element => {
    const atomicNumber = parseInt(element.Atomic_Number);
    if (!isNaN(atomicNumber)) {
      elementMap[atomicNumber] = element;
    }
  });

  // Periyodik tablodaki her elementin grid konumu
  const periodicTableLayout = [
    // 1. Periyot
    { atomicNumber: 1, row: 1, col: 1 },
    { atomicNumber: 2, row: 1, col: 18 },
    
    // 2. Periyot
    { atomicNumber: 3, row: 2, col: 1 },
    { atomicNumber: 4, row: 2, col: 2 },
    { atomicNumber: 5, row: 2, col: 13 },
    { atomicNumber: 6, row: 2, col: 14 },
    { atomicNumber: 7, row: 2, col: 15 },
    { atomicNumber: 8, row: 2, col: 16 },
    { atomicNumber: 9, row: 2, col: 17 },
    { atomicNumber: 10, row: 2, col: 18 },
    
    // 3. Periyot
    { atomicNumber: 11, row: 3, col: 1 },
    { atomicNumber: 12, row: 3, col: 2 },
    { atomicNumber: 13, row: 3, col: 13 },
    { atomicNumber: 14, row: 3, col: 14 },
    { atomicNumber: 15, row: 3, col: 15 },
    { atomicNumber: 16, row: 3, col: 16 },
    { atomicNumber: 17, row: 3, col: 17 },
    { atomicNumber: 18, row: 3, col: 18 },
    
    // 4. Periyot
    { atomicNumber: 19, row: 4, col: 1 },
    { atomicNumber: 20, row: 4, col: 2 },
    { atomicNumber: 21, row: 4, col: 3 },
    { atomicNumber: 22, row: 4, col: 4 },
    { atomicNumber: 23, row: 4, col: 5 },
    { atomicNumber: 24, row: 4, col: 6 },
    { atomicNumber: 25, row: 4, col: 7 },
    { atomicNumber: 26, row: 4, col: 8 },
    { atomicNumber: 27, row: 4, col: 9 },
    { atomicNumber: 28, row: 4, col: 10 },
    { atomicNumber: 29, row: 4, col: 11 },
    { atomicNumber: 30, row: 4, col: 12 },
    { atomicNumber: 31, row: 4, col: 13 },
    { atomicNumber: 32, row: 4, col: 14 },
    { atomicNumber: 33, row: 4, col: 15 },
    { atomicNumber: 34, row: 4, col: 16 },
    { atomicNumber: 35, row: 4, col: 17 },
    { atomicNumber: 36, row: 4, col: 18 },
    
    // 5. Periyot
    { atomicNumber: 37, row: 5, col: 1 },
    { atomicNumber: 38, row: 5, col: 2 },
    { atomicNumber: 39, row: 5, col: 3 },
    { atomicNumber: 40, row: 5, col: 4 },
    { atomicNumber: 41, row: 5, col: 5 },
    { atomicNumber: 42, row: 5, col: 6 },
    { atomicNumber: 43, row: 5, col: 7 },
    { atomicNumber: 44, row: 5, col: 8 },
    { atomicNumber: 45, row: 5, col: 9 },
    { atomicNumber: 46, row: 5, col: 10 },
    { atomicNumber: 47, row: 5, col: 11 },
    { atomicNumber: 48, row: 5, col: 12 },
    { atomicNumber: 49, row: 5, col: 13 },
    { atomicNumber: 50, row: 5, col: 14 },
    { atomicNumber: 51, row: 5, col: 15 },
    { atomicNumber: 52, row: 5, col: 16 },
    { atomicNumber: 53, row: 5, col: 17 },
    { atomicNumber: 54, row: 5, col: 18 },
    
    // 6. Periyot
    { atomicNumber: 55, row: 6, col: 1 },
    { atomicNumber: 56, row: 6, col: 2 },
    { atomicNumber: 71, row: 6, col: 3 },
    { atomicNumber: 72, row: 6, col: 4 },
    { atomicNumber: 73, row: 6, col: 5 },
    { atomicNumber: 74, row: 6, col: 6 },
    { atomicNumber: 75, row: 6, col: 7 },
    { atomicNumber: 76, row: 6, col: 8 },
    { atomicNumber: 77, row: 6, col: 9 },
    { atomicNumber: 78, row: 6, col: 10 },
    { atomicNumber: 79, row: 6, col: 11 },
    { atomicNumber: 80, row: 6, col: 12 },
    { atomicNumber: 81, row: 6, col: 13 },
    { atomicNumber: 82, row: 6, col: 14 },
    { atomicNumber: 83, row: 6, col: 15 },
    { atomicNumber: 84, row: 6, col: 16 },
    { atomicNumber: 85, row: 6, col: 17 },
    { atomicNumber: 86, row: 6, col: 18 },
    
    // 7. Periyot
    { atomicNumber: 87, row: 7, col: 1 },
    { atomicNumber: 88, row: 7, col: 2 },
    { atomicNumber: 103, row: 7, col: 3 },
    { atomicNumber: 104, row: 7, col: 4 },
    { atomicNumber: 105, row: 7, col: 5 },
    { atomicNumber: 106, row: 7, col: 6 },
    { atomicNumber: 107, row: 7, col: 7 },
    { atomicNumber: 108, row: 7, col: 8 },
    { atomicNumber: 109, row: 7, col: 9 },
    { atomicNumber: 110, row: 7, col: 10 },
    { atomicNumber: 111, row: 7, col: 11 },
    { atomicNumber: 112, row: 7, col: 12 },
    { atomicNumber: 113, row: 7, col: 13 },
    { atomicNumber: 114, row: 7, col: 14 },
    { atomicNumber: 115, row: 7, col: 15 },
    { atomicNumber: 116, row: 7, col: 16 },
    { atomicNumber: 117, row: 7, col: 17 },
    { atomicNumber: 118, row: 7, col: 18 },
  ];

  // Lantan ve Aktinit dizileri
  const lanthanidePositions = Array.from({ length: 15 }, (_, index) => ({
    atomicNumber: 57 + index,
    // row ve col değerleri alt tablodaki konumu belirtir
  }));

  const actinidePositions = Array.from({ length: 15 }, (_, index) => ({
    atomicNumber: 89 + index,
    // row ve col değerleri alt tablodaki konumu belirtir
  }));

  return (
    <div className="periodic-table-container">
      <div className="periodic-legend">
        <div className="legend-item">
          <div className="legend-color alkali"></div>
          <span className="legend-text">Alkali Metaller</span>
        </div>
        <div className="legend-item">
          <div className="legend-color alkaline"></div>
          <span className="legend-text">Toprak Alkali Metaller</span>
        </div>
        <div className="legend-item">
          <div className="legend-color transition-metal"></div>
          <span className="legend-text">Geçiş Metalleri</span>
        </div>
        <div className="legend-item">
          <div className="legend-color post-transition"></div>
          <span className="legend-text">Post-Geçiş Metalleri</span>
        </div>
        <div className="legend-item">
          <div className="legend-color metalloid"></div>
          <span className="legend-text">Yarı Metaller</span>
        </div>
        <div className="legend-item">
          <div className="legend-color nonmetal"></div>
          <span className="legend-text">Ametaller</span>
        </div>
        <div className="legend-item">
          <div className="legend-color halogen"></div>
          <span className="legend-text">Halojenler</span>
        </div>
        <div className="legend-item">
          <div className="legend-color noble-gas"></div>
          <span className="legend-text">Soy Gazlar</span>
        </div>
        <div className="legend-item">
          <div className="legend-color lanthanide"></div>
          <span className="legend-text">Lantanitler</span>
        </div>
        <div className="legend-item">
          <div className="legend-color actinide"></div>
          <span className="legend-text">Aktinitler</span>
        </div>
      </div>
      
      <div className="periodic-table">
        {periodicTableLayout.map(pos => {
          const element = elementMap[pos.atomicNumber];
          return element ? (
            <div 
              key={pos.atomicNumber} 
              style={{ gridRow: pos.row, gridColumn: pos.col }}
            >
              <ElementCard 
                element={element} 
                onClick={onElementClick} 
                isSelected={selectedElement?.Atomic_Number === element.Atomic_Number}
                temperature={temperature}
                key={`${element.Atomic_Number}-${temperature}`}
              />
            </div>
          ) : null;
        })}
      </div>
      
      {/* Lantanitler ve Aktinitler için ayrı bölüm */}
      <div className="periodic-table-footer">
        {/* Lantanitler */}
        {lanthanidePositions.map((pos, index) => {
          const element = elementMap[pos.atomicNumber];
          return element ? (
            <div 
              key={`lanthanide-${pos.atomicNumber}`} 
              style={{ gridRow: 1, gridColumn: index + 2 }}
            >
              <ElementCard 
                element={element} 
                onClick={onElementClick} 
                isSelected={selectedElement?.Atomic_Number === element.Atomic_Number}
                temperature={temperature}
                key={`${element.Atomic_Number}-${temperature}`}
              />
            </div>
          ) : null;
        })}
        
        {/* Aktinitler */}
        {actinidePositions.map((pos, index) => {
          const element = elementMap[pos.atomicNumber];
          return element ? (
            <div 
              key={`actinide-${pos.atomicNumber}`} 
              style={{ gridRow: 2, gridColumn: index + 2 }}
            >
              <ElementCard 
                element={element} 
                onClick={onElementClick} 
                isSelected={selectedElement?.Atomic_Number === element.Atomic_Number}
                temperature={temperature}
                key={`${element.Atomic_Number}-${temperature}`}
              />
            </div>
          ) : null;
        })}
      </div>
      
      <p className="table-instructions">Elementler hakkında daha fazla bilgi için elementin üzerine tıklayın.</p>
    </div>
  );
};

export default PeriodicTable; 