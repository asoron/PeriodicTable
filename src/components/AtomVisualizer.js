import React, { useEffect, useRef } from 'react';
import './AtomVisualizer.css';

const AtomVisualizer = ({ selectedElement }) => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);
  const rotationRef = useRef(0);
  const lastTimeRef = useRef(0);
  const isActiveRef = useRef(true); // Animasyon aktif mi?
  
  // Varsayılan olarak hidrojen atomunu göster
  const defaultElement = {
    Symbol: "H",
    Name: "Hydrogen",
    NameTR: "Hidrojen",
    Atomic_Number: "1",
    Category: "nonmetal"
  };
  
  // Kullanılan element - seçilen element varsa onu, yoksa varsayılan elementi kullan
  const element = selectedElement || defaultElement;
  
  // Elektron dizilimini hesapla (basitleştirilmiş versiyon)
  const calculateElectronConfiguration = () => {
    const atomicNumber = parseInt(element.Atomic_Number, 10);
    
    // Bohr modeline göre elektron dağılımı
    // Kabuk kapasiteleri: 2, 8, 18, 32...
    const shells = [2, 8, 18, 32, 50];
    const electronDistribution = [];
    
    let remainingElectrons = atomicNumber;
    for (let i = 0; i < shells.length; i++) {
      if (remainingElectrons <= 0) break;
      
      const electronsInShell = Math.min(remainingElectrons, shells[i]);
      electronDistribution.push(electronsInShell);
      remainingElectrons -= electronsInShell;
    }
    
    return electronDistribution;
  };
  
  const getElectronConfigurationText = () => {
    // Elektron konfigürasyonu CSV'den alınamıyorsa, basit bir yaklaşım kullan
    if (element.Electron_Configuration) {
      return element.Electron_Configuration;
    }
    
    // Basit bir gösterim oluştur
    const orbitals = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p', '6s', '4f', '5d', '6p', '7s', '5f', '6d', '7p'];
    const maxElectrons = [2, 2, 6, 2, 6, 2, 10, 6, 2, 10, 6, 2, 14, 10, 6, 2, 14, 10, 6];
    
    let remainingElectrons = parseInt(element.Atomic_Number, 10);
    let configuration = [];
    
    for (let i = 0; i < orbitals.length; i++) {
      if (remainingElectrons <= 0) break;
      
      const electrons = Math.min(remainingElectrons, maxElectrons[i]);
      if (electrons > 0) {
        configuration.push(`${orbitals[i]}${electrons}`);
      }
      remainingElectrons -= electrons;
    }
    
    return configuration.join(' ');
  };
  
  // Atom visualizer için ana animasyon
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Element kategorisine göre renk ayarla
    const getCategoryColor = () => {
      const categoryColors = {
        'alkali': '#FF9933',
        'alkaline': '#CC9933',
        'halogen': '#CCFF00',
        'noble-gas': '#AD33FF',
        'nonmetal': '#33CC33',
        'metalloid': '#00CCFF',
        'transition-metal': '#FF3366',
        'post-transition': '#3399FF',
        'lanthanide': '#FF33CC',
        'actinide': '#CC33FF',
        'unknown': '#CCCCCC'
      };
      
      return categoryColors[element.Category] || '#CCCCCC';
    };
    
    // Elektron kabuklarını hazırla
    const electronShells = calculateElectronConfiguration();
    const nucleusRadius = 25;
    const shellSpacing = 30;
    
    // Elektronların konum ve açılarını saklayan state
    const electronStates = electronShells.map((count, shellIndex) => {
      const positions = [];
      const shellRadius = nucleusRadius + ((shellIndex + 1) * shellSpacing);
      
      for (let i = 0; i < count; i++) {
        // Her elektrona başlangıç pozisyonu ve açısı ata
        const startAngle = (Math.PI * 2 * i) / count;
        positions.push({
          angle: startAngle,
          x: centerX + Math.cos(startAngle) * shellRadius,
          y: centerY + Math.sin(startAngle) * shellRadius,
          shellRadius
        });
      }
      
      return {
        shellIndex,
        electrons: positions,
        rotationSpeed: 0.0002 * (1 - (shellIndex * 0.15)) // Her kabuk için farklı hız
      };
    });
    
    // Sabit bir hız
    const maxDeltaTime = 20; // 50fps minimum
    isActiveRef.current = true;
    lastTimeRef.current = 0;
    
    // Animasyon fonksiyonu
    const drawAtom = (timestamp) => {
      if (!isActiveRef.current) return;
      
      // Delta time hesaplama ve sınırlama
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      let deltaTime = timestamp - lastTimeRef.current;
      
      // Çok büyük değerleri sınırla - büyük değerler ışınlanmaya sebep olur
      if (deltaTime > 200) { // 200ms'den büyük gecikme olursa, animasyonu durdur
        lastTimeRef.current = timestamp;
        deltaTime = 0; // Işınlanmayı önle
      } else {
        deltaTime = Math.min(deltaTime, maxDeltaTime);
        lastTimeRef.current = timestamp;
      }
      
      // Canvas'ı temizle
      ctx.clearRect(0, 0, width, height);
      
      // Çekirdek çiz
      const categoryColor = getCategoryColor();
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, nucleusRadius
      );
      gradient.addColorStop(0, 'white');
      gradient.addColorStop(0.7, categoryColor);
      gradient.addColorStop(1, 'rgba(0,0,0,0.8)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, nucleusRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Çekirdekte element sembolü
      ctx.font = '20px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(element.Symbol, centerX, centerY);
      
      // Elektron kabukları ve elektronları çiz
      electronStates.forEach((shellState) => {
        const { shellIndex, electrons, rotationSpeed } = shellState;
        const shellRadius = electrons[0]?.shellRadius || 
                           (nucleusRadius + ((shellIndex + 1) * shellSpacing));
        
        // Kabuk çizgisi (yörünge)
        ctx.beginPath();
        ctx.arc(centerX, centerY, shellRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Elektronların pozisyonlarını güncelle ve çiz - çok küçük artışlarla
        electrons.forEach((electron, idx) => {
          // Açıyı çok küçük adımlarla güncelle
          electron.angle += rotationSpeed * deltaTime;
          
          // Yeni pozisyonu hesapla
          electron.x = centerX + Math.cos(electron.angle) * shellRadius;
          electron.y = centerY + Math.sin(electron.angle) * shellRadius;
          
          // Elektronu çiz
          ctx.beginPath();
          ctx.arc(electron.x, electron.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.fill();
          
          // Parıltı
          const glow = ctx.createRadialGradient(
            electron.x, electron.y, 0,
            electron.x, electron.y, 4
          );
          glow.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
          glow.addColorStop(0.5, categoryColor);
          glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.beginPath();
          ctx.arc(electron.x, electron.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        });
      });
      
      // Animasyonu devam ettir
      animationIdRef.current = requestAnimationFrame(drawAtom);
    };
    
    // Animasyonu başlat
    animationIdRef.current = requestAnimationFrame(drawAtom);
    
    // Component unmount olduğunda veya prop değiştiğinde temizle
    return () => {
      isActiveRef.current = false;
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
    };
  }, [element]);
  
  return (
    <div className="atom-visualizer">
      <h3 className="atom-title">
        <span className="atom-number">{element.Atomic_Number}</span>
        <span className="atom-name">{element.NameTR || element.Name}</span>
      </h3>
      
      <div className="atom-canvas-container">
        <canvas ref={canvasRef} width={400} height={400} />
      </div>
      
      <div className="atom-info">
        <div className="atom-property">
          <span className="atom-property-label">Atom Numarası:</span>
          <span className="atom-property-value">{element.Atomic_Number}</span>
        </div>
        <div className="atom-property">
          <span className="atom-property-label">Proton Sayısı:</span>
          <span className="atom-property-value">{element.Atomic_Number}</span>
        </div>
        <div className="atom-property">
          <span className="atom-property-label">Nötron Sayısı:</span>
          <span className="atom-property-value">
            {element.Atomic_Weight ? 
              Math.round(parseFloat(element.Atomic_Weight) - parseFloat(element.Atomic_Number)) : 
              "Bilinmiyor"}
          </span>
        </div>
        <div className="atom-property">
          <span className="atom-property-label">Elektron Sayısı:</span>
          <span className="atom-property-value">{element.Atomic_Number}</span>
        </div>
        <div className="atom-property electron-config">
          <span className="atom-property-label">Elektron Dizilimi:</span>
          <span className="atom-property-value">{getElectronConfigurationText()}</span>
        </div>
      </div>
    </div>
  );
};

export default AtomVisualizer; 