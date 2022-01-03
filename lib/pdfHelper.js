import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import pdf from 'html-pdf';

const componentToPDFBuffer = (component) => {
  return new Promise((resolve, reject) => {
    
    const html = renderToString(component);
    const options = {
      format: 'A4',
      orientation: 'landscape',
      border: '10mm',
      footer: {
        height: '10mm',
      },
      type: 'pdf',
      timeout: 30000,
    };

    pdf.create(html, options).toBuffer((err, buffer) => {
      if (err) {
        return reject(err);
        }
        return resolve(buffer);
    });
  });
}

export  default {
  componentToPDFBuffer
}