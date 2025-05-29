import React from 'react';
import { Document, Page } from 'react-pdf';

interface DocumentViewerProps {
  file: string;
  pageNumber: number;
  scale: number;
  onLoadSuccess: () => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  file,
  pageNumber,
  scale,
  onLoadSuccess,
}) => {
  return (
    <Document
      file={file}
      onLoadSuccess={onLoadSuccess}
      className="block"
    >
      <Page
        pageNumber={pageNumber}
        renderTextLayer={false}
        renderAnnotationLayer={false}
        scale={scale}
      />
    </Document>
  );
}; 