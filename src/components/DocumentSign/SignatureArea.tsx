import React from 'react';
import Draggable from 'react-draggable';
import type { DraggableEvent, DraggableData } from 'react-draggable';

export interface SignatureAreaProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  onDrag: (id: string, e: DraggableEvent, ui: DraggableData) => void;
}

export const SignatureArea: React.FC<SignatureAreaProps> = ({
  id,
  x,
  y,
  width,
  height,
  onDrag,
}) => {
  return (
    <Draggable
      key={id}
      bounds="parent"
      position={{ x, y }}
      onDrag={(e: DraggableEvent, ui: DraggableData) => onDrag(id, e, ui)}
      grid={[10, 10]}
    >
      <div
        style={{
          position: 'absolute',
          border: '2px dashed blue',
          width,
          height,
          cursor: 'move',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
          userSelect: 'none',
          zIndex: 1000,
        }}
      >
        Signature Area
      </div>
    </Draggable>
  );
}; 