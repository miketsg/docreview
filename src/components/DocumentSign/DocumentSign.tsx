import React, { useState, useRef } from 'react';
import type { DraggableEvent, DraggableData } from 'react-draggable';
import { Button } from '../ui/button';
import { DocumentViewer } from './DocumentViewer';
import { SignatureArea } from './SignatureArea';

interface SignatureAreaData {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function DocumentSign() {
  const [pageNum, setPageNum] = useState(1);
  const [signatureAreas, setSignatureAreas] = useState<SignatureAreaData[]>([]);
  const [scale] = useState(1.4);
  const containerRef = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = () => {
    setPageNum(1);
  };

  const addSignatureArea = () => {
    const newId = `signature-${Date.now()}`;
    setSignatureAreas((prevAreas: SignatureAreaData[]) => [
      ...prevAreas,
      { id: newId, x: 50, y: 50, width: 200, height: 50 },
    ]);
  };

  const handleDrag = (id: string, e: DraggableEvent, ui: DraggableData) => {
    setSignatureAreas((prevAreas: SignatureAreaData[]) =>
      prevAreas.map((area: SignatureAreaData) =>
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
        <div className="flex gap-2">
          <Button onClick={addSignatureArea} className="hover:cursor-pointer">Add Signature Area</Button>
          <Button onClick={saveSignatureCoordinates} className="hover:cursor-pointer">Log Coordinates</Button>
        </div>
      </div>
      <div className="border rounded-lg p-4 min-h-[500px] bg-white relative overflow-auto">
        <div ref={containerRef} className="flex justify-center relative">
          <DocumentViewer
            file="/src/data/sign.pdf"
            pageNumber={pageNum}
            scale={scale}
            onLoadSuccess={onDocumentLoadSuccess}
          />
          {signatureAreas.map((area: SignatureAreaData) => (
            <SignatureArea
              key={area.id}
              {...area}
              onDrag={handleDrag}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
