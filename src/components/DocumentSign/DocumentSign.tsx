import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Document, Page,  } from 'react-pdf';
import { Button } from '../ui/button';


interface SignatureArea {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function DocumentSign() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [signatureAreas, setSignatureAreas] = useState<SignatureArea[]>([]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNum(1);
  };

  const addSignatureArea = () => {
    const newId = `signature-${Date.now()}`;
    setSignatureAreas((prevAreas) => [
      ...prevAreas,
      { id: newId, x: 50, y: 50, width: 100, height: 50 }, // Default position and size
    ]);
  };

  const handleDrag = (id: string, ui: { x: number; y: number }) => {
    setSignatureAreas((prevAreas) =>
      prevAreas.map((area) =>
        area.id === id ? { ...area, x: ui.x, y: ui.y } : area
      )
    );
  };

  const saveSignatureCoordinates = () => {
    console.log('Signature Coordinates:', JSON.stringify(signatureAreas, null, 2));
  };

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <div className="flex justify-between mb-4">
        <Button onClick={addSignatureArea}>Add Signature Area</Button>
        <Button onClick={saveSignatureCoordinates}>Save Signatures</Button>
      </div>
      <div className="border rounded-lg p-4 min-h-[500px] bg-white relative overflow-auto">
        <Document
          file="/src/data/sign.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          className="block mx-auto"
        >
          <Page
            pageNumber={pageNum} 
            renderTextLayer={false} 
            renderAnnotationLayer={false} 
          />
        </Document>
      </div>

    </div>
  );
}
