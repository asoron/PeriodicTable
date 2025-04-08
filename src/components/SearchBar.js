import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, elements }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Arama işlemini iyileştirilmiş hali
  useEffect(() => {
    // Prop kontrolü
    if (typeof onSearch !== 'function') {
      return;
    }

    // Arama terimi yoksa, tüm elementleri göster
    if (!searchTerm.trim()) {
      onSearch(null); // Boş array değil, null göndererek temizleme olduğunu belirtelim
      setSearchResults([]);
      return;
    }

    // Arama terimini normalleştir
    const normalizeText = (text) => {
      if (!text) return '';
      return text.toLowerCase()
        .replace(/ı/g, 'i')
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const normalized = normalizeText(searchTerm);

    // Güvenli arama - hataya karşı korumalı
    try {
      // elements prop'u yoksa veya bir dizi değilse, boş dizi kullan
      const elementsArray = Array.isArray(elements) ? elements : [];
      
      const results = elementsArray.filter(element => {
        // Element null veya undefined ise atla
        if (!element) return false;
        
        // Çeşitli alanlarda arama yap
        const symbol = normalizeText(element.Symbol || '');
        const name = normalizeText(element.Name || '');
        const nameTR = normalizeText(element.NameTR || '');
        const number = String(element.Atomic_Number || '');
        
        // Herhangi bir alanda eşleşme varsa true döndür
        return symbol.includes(normalized) || 
               name.includes(normalized) || 
               nameTR.includes(normalized) || 
               number.includes(normalized);
      });
      
      // Sonuçları gönder (boş olsa bile)
      onSearch(results);
      setSearchResults(results);
    } catch (error) {
      console.error("Arama hatası:", error);
      if (typeof onSearch === 'function') {
        onSearch([]);
      }
    }

  }, [searchTerm, elements, onSearch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    // Temizleme işleminde null göndererek tüm elementleri göstermesini sağla
    if (typeof onSearch === 'function') {
      onSearch(null);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Element adı, sembolü veya atom numarası ara..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      {searchTerm && (
        <button className="clear-button" onClick={clearSearch}>
          ×
        </button>
      )}
      <div className="search-stats">
        {searchTerm ? `${searchResults.length} sonuç bulundu` : ''}
      </div>
    </div>
  );
};

export default SearchBar; 