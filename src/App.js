import React, { useState, useEffect } from 'react';
import './App.css';
import PeriodicTable from './components/PeriodicTable';
import ElementDetail from './components/ElementDetail';
import SearchBar from './components/SearchBar';
import AtomVisualizer from './components/AtomVisualizer';
import TemperatureSlider from './components/TemperatureSlider';
import { getAllElements } from './utils/wikipediaApi';
import { parseCSV } from './utils/dataProcessor';

function App() {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [filteredElements, setFilteredElements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [temperature, setTemperature] = useState(25); // Oda sıcaklığı (25°C)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // CSV dosyasından element bilgilerini yükleme
    const loadElements = async () => {
      try {
        setLoading(true);
        
        // Önce statik bilgileri yükle
        const baseElements = getAllElements();
        
        // CSV dosyasını fetch et
        const response = await fetch('/elementdatavalues.csv');
        if (!response.ok) {
          throw new Error('CSV dosyası yüklenemedi');
        }
        
        const csvText = await response.text();
        const csvData = parseCSV(csvText);
        
        // CSV verilerini ve temel verileri birleştir
        const mergedElements = baseElements.map(baseElement => {
          const csvElement = csvData.find(csvEl => 
            csvEl.Atomic_Number === baseElement.Atomic_Number || 
            csvEl.Symbol === baseElement.Symbol
          );
          
          return csvElement ? { ...baseElement, ...csvElement } : baseElement;
        });
        
        setElements(mergedElements);
        setFilteredElements(mergedElements);
        setLoading(false);
      } catch (error) {
        console.error('Veri yükleme hatası:', error);
        setError('Element verileri yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.');
        setLoading(false);
      }
    };
    
    loadElements();
  }, []);
  
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredElements(elements);
    } else {
      const filtered = elements.filter(element => 
        element.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.NameTR?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.Symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.Atomic_Number.toString().includes(searchTerm)
      );
      setFilteredElements(filtered);
    }
  }, [searchTerm, elements]);
  
  const handleElementClick = (element) => {
    setSelectedElement(element);
  };
  
  const handleSearch = (results) => {
    // results null ise (temizleme durumu), tüm elementleri göster
    if (results === null) {
      setFilteredElements(elements);
    } 
    // results bir array ise, bu sonuçları göster (boş array olsa bile)
    else if (Array.isArray(results)) {
      setFilteredElements(results);
    } 
    // Diğer durumlarda tüm elementleri göster
    else {
      setFilteredElements(elements);
    }
  };

  // Sıcaklık değişimi için güncellenmiş fonksiyon
  const handleTemperatureChange = (newTemp) => {
    console.log("Yeni sıcaklık:", newTemp);
    setTemperature(newTemp);
  };

  return (
    <div className="App">
      <main>
        {loading ? (
          <div className="loading">Elementler yükleniyor...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="content-container">
            <div className="periodic-table-container">
              <PeriodicTable 
                elements={filteredElements} 
                onElementClick={handleElementClick}
                selectedElement={selectedElement}
                temperature={temperature}
              />
              
              <div className="search-container">
                <SearchBar 
                  onSearch={handleSearch} 
                  elements={elements} 
                />
              </div>
              
              <div className="temperature-container">
                <TemperatureSlider onChange={handleTemperatureChange} />
              </div>
            </div>
            
            <div className="element-details-container">
              <AtomVisualizer selectedElement={selectedElement} />
              
              {selectedElement && (
                <ElementDetail 
                  element={selectedElement} 
                  onClose={() => setSelectedElement(null)}
                  isPopup={false} 
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App; 