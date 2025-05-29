import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Document, Page } from 'react-pdf';
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
  const [scale, setScale] = useState(1.4);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNum(1);
  };

  const addSignatureArea = () => {
    const newId = `signature-${Date.now()}`;
    setSignatureAreas((prevAreas: SignatureArea[]) => [
      ...prevAreas,
      { id: newId, x: 50, y: 50, width: 100, height: 50 },
    ]);
  };

  const handleDrag = (id: string, ui: { x: number; y: number }) => {
    setSignatureAreas((prevAreas: SignatureArea[]) =>
      prevAreas.map((area: SignatureArea) =>
        area.id === id ? { ...area, x: ui.x, y: ui.y } : area
      )
    );
  };

  const saveSignatureCoordinates = () => {
    console.log('Signature Coordinates:', JSON.stringify(signatureAreas, null, 2));
    // In a real application, you would send this data to a backend
  };

  const zoomIn = () => setScale((prev: number) => Math.min(prev + 0.1, 2.0));
  const zoomOut = () => setScale((prev: number) => Math.max(prev - 0.1, 0.5));

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <Button onClick={addSignatureArea}>Add Signature Area</Button>
          <Button onClick={saveSignatureCoordinates}>Save Signatures</Button>
        </div>
        <div className="flex gap-2 items-center">
          <Button onClick={zoomOut}>-</Button>
          <span>{Math.round(scale * 100)}%</span>
          <Button onClick={zoomIn}>+</Button>
        </div>
      </div>
      <div className="border rounded-lg p-4 min-h-[500px] bg-white relative overflow-auto">
        <div className="flex justify-center">
          <Document
            file="/src/data/sign.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            className="block"
          >
            <Page 
              pageNumber={pageNum}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              scale={scale}
            />
          </Document>
        </div>
        {signatureAreas.map((area: SignatureArea) => (
          <Draggable
            key={area.id}
            bounds="parent"
            defaultPosition={{ x: area.x, y: area.y }}
            onStop={(_e: React.SyntheticEvent, ui: { x: number; y: number }) => handleDrag(area.id, ui)}
          >
            <div
              style={{
                position: 'absolute',
                border: '2px dashed blue',
                width: area.width,
                height: area.height,
                cursor: 'grab',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 255, 0.1)',
              }}
            >
              Signature Area
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
}
