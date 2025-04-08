import { standardElements } from './elementStandards';

export const parseCSV = (csvText) => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(header => 
    header.replace(/"/g, '')
  );
  
  const elements = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    // CSV'deki tırnak içerisindeki virgülleri doğru işlemek için regex kullanımı
    const matches = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    if (!matches) continue;
    
    const values = matches.map(value => value.replace(/"/g, '').trim());
    const element = {};
    
    headers.forEach((header, index) => {
      if (index < values.length) {
        element[header] = values[index];
      } else {
        element[header] = '';
      }
    });
    
    elements.push(element);
  }
  
  return elements;
}; 