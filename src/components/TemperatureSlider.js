import React, { useState, useEffect, useRef } from 'react';
import './TemperatureSlider.css';

const TemperatureSlider = ({ onChange }) => {
  const [temperature, setTemperature] = useState(25);
  
  // Sıcaklık aralığını simetrik hale getiriyoruz: -6000°C ile +6000°C
  const minTemp = -6000;
  const maxTemp = 6000;
  
  // Daha hızlı gezinme için adım değerini ayarlıyoruz
  const stepValue = 10; // 10 derece adımlarla
  
  const sliderRef = useRef(null);
  
  // Sıcaklığa göre durum metni - simetrik aralık için güncellendi
  const getTemperatureDescription = () => {
    if (temperature < -5000) return "Teorik Aşırı Soğuk";
    if (temperature < -3000) return "Aşırı Kriyojenik";
    if (temperature < -1000) return "Derin Kriyojenik";
    if (temperature < -273) return "Teorik Soğukluk (Mutlak Sıfır Altı)";
    if (temperature === -273) return "Mutlak Sıfır";
    if (temperature < -200) return "Mutlak Sıfıra Yakın";
    if (temperature < -100) return "Quantum Gaz";
    if (temperature < -50) return "Aşırı Soğuk";
    if (temperature < 0) return "Donma Altı";
    if (temperature === 0) return "Su Donma Noktası";
    if (temperature < 20) return "Soğuk";
    if (temperature >= 20 && temperature <= 30) return "Oda Sıcaklığı";
    if (temperature < 100) return "Sıcak";
    if (temperature === 100) return "Su Kaynama Noktası";
    if (temperature < 1000) return "Çok Sıcak";
    if (temperature < 3000) return "Aşırı Sıcak";
    if (temperature < 5000) return "Yıldız Yüzeyi";
    return "Yıldız İç Tabakası";
  };

  const handleChange = (e) => {
    const newTemp = parseInt(e.target.value, 10);
    setTemperature(newTemp);
    onChange(newTemp);
  };

  // Sıcaklık değişimini gösteren renk fonksiyonu - simetrik aralık için güncellendi
  const getTemperatureColor = () => {
    if (temperature < -3000) {
      // -6000 ile -3000 arası: Ultra derin mavi tonları
      const blueIntensity = Math.max(20, 50 + (temperature + 6000) / 60);
      return `rgb(0, ${blueIntensity}, ${100 + blueIntensity/2})`;
    } else if (temperature < -1000) {
      // -3000 ile -1000 arası: Derin mavi
      const blueIntensity = Math.max(40, 80 + (temperature + 3000) / 20);
      return `rgb(0, ${blueIntensity}, 200)`;
    } else if (temperature < -273) {
      // -1000 ile -273 arası: Koyu mavi
      return `rgb(0, ${Math.max(50, 100 + (temperature + 1000) / 7)}, 220)`;
    } else if (temperature < -100) {
      // -273 ile -100 arası: Kriyojenik mavi
      return `rgb(0, ${Math.max(80, 150 + temperature/2)}, 255)`;
    } else if (temperature < 0) {
      // -100 ile 0 arası: Açık mavi
      const blueIntensity = Math.max(120, 180 + temperature*0.5);
      return `rgb(${Math.abs(temperature)}, ${blueIntensity}, 255)`;
    } else if (temperature < 100) {
      // 0 ile 100 arası: Mavi'den kırmızıya geçiş
      const redValue = Math.min(255, temperature * 2.55);
      const blueValue = Math.max(0, 255 - (temperature * 2.55));
      return `rgb(${redValue}, 150, ${blueValue})`;
    } else if (temperature < 1000) {
      // 100 ile 1000 arası: Kırmızı-turuncu tonları
      const greenValue = Math.max(0, 150 - (temperature - 100) / 6);
      return `rgb(255, ${greenValue}, 0)`;
    } else if (temperature < 3000) {
      // 1000 ile 3000 arası: Koyu kırmızı
      return `rgb(255, ${Math.max(0, 100 - (temperature - 1000) / 20)}, ${Math.min(100, (temperature - 1000) / 20)})`;
    } else {
      // 3000 ile 6000 arası: Parlak kırmızı-beyaz
      const whiteFactor = Math.min(200, (temperature - 3000) / 15);
      return `rgb(255, ${whiteFactor}, ${whiteFactor})`;
    }
  };
  
  const formatTemperature = (temp) => {
    const kelvin = temp + 273.15;
    
    // Büyük sayılar için kısaltılmış gösterim
    if (Math.abs(temp) >= 1000) {
      return `${(temp/1000).toFixed(1)}×10³°C (${(kelvin/1000).toFixed(1)}×10³K)`;
    }
    return `${temp}°C (${Math.round(kelvin)}K)`;
  };

  // Slider arka plan rengi için simetrik gradient
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.background = `linear-gradient(to right, 
        rgb(0, 20, 120) 0%, 
        rgb(0, 50, 180) 10%, 
        rgb(0, 100, 220) 20%, 
        rgb(0, 150, 255) 30%, 
        rgb(100, 200, 255) 40%, 
        rgb(255, 255, 255) 50%, 
        rgb(255, 200, 150) 60%, 
        rgb(255, 150, 50) 70%,
        rgb(255, 80, 0) 80%,
        rgb(255, 30, 0) 90%,
        rgb(255, 0, 50) 100%)`;
    }
  }, []);

  return (
    <div className="temperature-slider-container">
      <h3>Sıcaklık</h3>
      
      <div className="temperature-display" style={{ backgroundColor: getTemperatureColor() }}>
        {formatTemperature(temperature)}
        <div style={{ fontSize: '0.8rem', marginTop: '3px', opacity: '0.9' }}>
          {getTemperatureDescription()}
        </div>
      </div>
      
      <input
        ref={sliderRef}
        type="range"
        min={minTemp}
        max={maxTemp}
        step={stepValue}
        value={temperature}
        onChange={handleChange}
        className="temperature-slider"
      />
      
      <div className="temperature-marks">
        <span>-6000°C</span>
        <span>-3000°C</span>
        <span>-1000°C</span>
        <span>-100°C</span>
        <span>0°C</span>
        <span>100°C</span>
        <span>1000°C</span>
        <span>3000°C</span>
        <span>6000°C</span>
      </div>
      
      <div className="phase-legend">
        <div className="phase-item">
          <div className="phase-color phase-solid"></div>
          <span>Katı</span>
        </div>
        <div className="phase-item">
          <div className="phase-color phase-liquid"></div>
          <span>Sıvı</span>
        </div>
        <div className="phase-item">
          <div className="phase-color phase-gas"></div>
          <span>Gaz</span>
        </div>
        <div className="phase-item" style={{backgroundColor: 'rgba(255,100,100,0.15)'}}>
          <span>Plazma</span>
        </div>
      </div>
    </div>
  );
};

export default TemperatureSlider; 