# 🧪 İnteraktif Periyodik Tablo Uygulaması

![Periyodik Tablo Uygulaması](https://img.shields.io/badge/Periyodik%20Tablo-Eğitim%20Aracı-blue)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?logo=vercel)

Bu uygulama, periyodik tablodaki elementlerin interaktif olarak incelenebileceği, elementlerin fiziksel hal değişimlerinin gözlemlenebileceği ve detaylı bilgilere erişilebileceği kapsamlı bir eğitim aracıdır.

## 🌟 Canlı Demo

[Periyodik Tablo Uygulaması](https://periodic-table-asoron.vercel.app/)

## 📋 Özellikler

### 🔄 İnteraktif Periyodik Tablo
- **Dinamik Element Kartları**: Her element için kategori renklerine göre sınıflandırılmış interaktif kartlar
- **Seçilebilir Elementler**: Elementlere tıklayarak detaylı bilgilere erişim
- **Kategori Renk Kodları**: Alkali metaller, soygaz, halojenler vb. kategoriler için özel renk kodları

### 🌡️ Sıcaklık Simülasyonu
- **Gerçek-zamanlı Hal Değişimleri**: Elementlerin -6000°C ile +6000°C arasında hal değişimlerini gözlemleme
- **Bilimsel Doğruluk**: Her element için özel olarak tanımlanmış erime, kaynama ve plazma geçiş noktaları
- **Görsel Geri Bildirim**: Elementlerin katı, sıvı, gaz ve plazma hallerinin görsel temsili

### 🔍 Arama ve Filtreleme
- **Gelişmiş Arama**: Element adı, sembolü veya atom numarasına göre arama
- **Türkçe Karakter Desteği**: Türkçe karakterlerle arama yapabilme
- **Anında Filtreleme**: Arama sonuçları anında görüntüleme

### 🔬 Element Detayları
- **Wikipedia Entegrasyonu**: Wikipedia API ile anlık olarak element bilgilerinin çekilmesi
- **Türkçe ve İngilizce Destek**: Element bilgilerini Türkçe olarak görüntüleme
- **Detaylı Özellikler**: Fiziksel, kimyasal ve elektronik özelliklerin kapsamlı sunumu

### ⚛️ Atom Görselleştirici
- **Dinamik Atom Modeli**: Seçilen elementin atomik yapısını animasyonlu görselleştirme
- **Elektron Yörüngeleri**: Elektron dağılımının kabuk yapısında görselleştirilmesi
- **Proton, Nötron ve Elektron Bilgileri**: Atomik yapı hakkında detaylı bilgiler

## 🛠️ Teknik Detaylar

### Kullanılan Teknolojiler
- **React**: Komponent tabanlı kullanıcı arayüzü geliştirme
- **CSS Grid**: Periyodik tablo düzeni için gelişmiş grid sistemi
- **Wikipedia API**: Element bilgilerinin gerçek zamanlı olarak çekilmesi
- **Vercel**: Uygulama deployment ve hosting

Proje Yapısı:

Root Dizini:
- **public/**  
  - `elementdatavalues.csv`: Element verilerini içeren CSV dosyası.

- **src/**  
  - **components/** (React bileşenleri):  
    - `AtomVisualizer.js`: Atom görselleştirici bileşeni.  
    - `ElementCard.js`: Element kartı bileşeni.  
    - `ElementDetail.js`: Element detay paneli bileşeni.  
    - `PeriodicTable.js`: Periyodik tablo ana bileşeni.  
    - `SearchBar.js`: Arama çubuğu bileşeni.  
    - `TemperatureSlider.js`: Sıcaklık kontrol bileşeni.  
  - **utils/** (Yardımcı fonksiyonlar):  
    - `dataProcessor.js`: Veri işleme fonksiyonları.  
    - `elementStandards.js`: Standart element verileri.  
    - `wikipediaApi.js`: Wikipedia API entegrasyonu.  
  - `App.js`: Ana uygulama bileşeni.  
  - `index.js`: Uygulama giriş noktası.

- **package.json**  
  - Projenin bağımlılıklarını ve betiklerini içeren dosya.

## 🔬 Bilimsel Doğruluk

Bu uygulamada bilimsel doğruluğa özel önem verilmiştir:

- **Hal Değişimleri**: Her element için bilimsel olarak doğrulanmış erime, kaynama ve iyonlaşma sıcaklıkları
- **Kategori Sınıflandırması**: IUPAC standartlarına uygun element kategorizasyonu
- **Periyodik Tablo Düzeni**: Modern periyodik tablo düzeni (18-kolon formatı)
- **Atom Modeli**: Bohr atom modeline göre geliştirilmiş atom görselleştirmesi

## ⚙️ Kurulum ve Geliştirme

### Gereksinimler
- Node.js (v14 veya üzeri)
- npm veya yarn

### Yerel Geliştirme Ortamını Kurma

```bash
# Projeyi klonlayın
git clone https://github.com/asoron/PeriodicTable.git

# Proje dizinine geçin
cd PeriodicTable

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm start
```
### Wikipedia API Entegrasyonu

Uygulama, elementler hakkında güncel ve doğru bilgilere erişim sağlamak için Wikipedia API'sini kullanır:

- **Önbellek Mekanizması**: Gereksiz API çağrılarını önlemek için verilerin önbelleğe alınması
- **Türkçe İçerik Desteği**: Wikipedia'nın Türkçe içeriklerine erişim
- **Resim ve Metin İçerikleri**: Element görsellerinin ve açıklamalarının çekilmesi

---

### 📚 Eğitim Amaçlı Kullanım

Bu uygulama, kimya ve fen bilimleri eğitimi için ideal bir araçtır:

- **Orta ve Yüksek Öğretim**: Periyodik tablo ve elementlerin öğretiminde
- **Sıcaklık ve Hal Değişimi Kavramları**: Maddenin hallerini öğretmek için
- **Atom Yapısı**: Atom modeli ve elektron dizilimleri konularında

---

### 🔗 Bağlantılar

- **GitHub Repo**: [https://github.com/asoron/PeriodicTable](https://github.com/asoron/PeriodicTable)
- **Canlı Demo**: [https://periodic-table-asoron.vercel.app/](https://periodic-table-asoron.vercel.app/)

---

### 🤝 Katkıda Bulunma

Projeye katkıda bulunmak isteyen geliştiriciler için:

1. Repo'yu forklayın
2. Yeni bir branch oluşturun (`git checkout -b yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik: X özelliği eklendi'`)
4. Branch'inizi push edin (`git push origin yeni-ozellik`)
5. Pull Request açın

---

### 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Daha fazla bilgi için repo'daki LICENSE dosyasına bakın.

---

### 👨‍💻 Geliştirici

**asoron** - [GitHub](https://github.com/asoron)
