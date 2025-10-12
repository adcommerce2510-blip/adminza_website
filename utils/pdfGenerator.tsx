import React from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generateStandardizedPDF = async (
  component: React.ReactElement,
  filename: string = 'document.pdf'
): Promise<{ data: Uint8Array; filename: string }> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Create a temporary container
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      document.body.appendChild(container);

      // Render the component
      const { createRoot } = await import('react-dom/client');
      const root = createRoot(container);
      
      // Render and wait for it to be ready
      await new Promise<void>((resolveRender) => {
        root.render(
          React.cloneElement(component, {
            ...component.props,
            showDownloadButton: false,
            isPdfExport: true
          })
        );
        setTimeout(resolveRender, 500); // Wait for render
      });

      const element = container.firstChild as HTMLElement;
      if (!element) {
        throw new Error('Failed to render component');
      }

      // Convert to canvas with better color support
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        ignoreElements: (element) => {
          // Skip elements that might cause color parsing issues
          return element.classList?.contains('ignore-pdf') || false;
        },
        onclone: (clonedDoc) => {
          // Convert modern CSS colors to supported formats
          const style = clonedDoc.createElement('style');
          style.textContent = `
            * {
              color: #000000 !important;
              background-color: transparent !important;
            }
            .bg-white, .bg-gray-50, .bg-gray-100 {
              background-color: #ffffff !important;
            }
            .text-black, .text-gray-900 {
              color: #000000 !important;
            }
            .text-gray-600 {
              color: #4b5563 !important;
            }
            .border-gray-200, .border-gray-300 {
              border-color: #d1d5db !important;
            }
          `;
          clonedDoc.head.appendChild(style);
        }
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Get PDF as Uint8Array
      const pdfData = pdf.output('arraybuffer');

      // Cleanup
      root.unmount();
      document.body.removeChild(container);

      resolve({
        data: new Uint8Array(pdfData),
        filename
      });
    } catch (error) {
      reject(error);
    }
  });
};

