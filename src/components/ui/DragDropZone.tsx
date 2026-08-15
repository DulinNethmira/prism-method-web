import { useState, useRef, useCallback } from 'react';
import './DragDropZone.css';
import { Icon } from './Icon';
import { Button } from './Button';
import type { BaseProps } from '../../types';

interface DragDropZoneProps extends BaseProps {
  onFileSelect: (file: File) => void;
  accept?: string;
}

export function DragDropZone({ onFileSelect, accept, className = '' }: DragDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
    // Reset input so the same file can be selected again if needed
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div 
      className={`drag-drop-zone ${isDragging ? 'is-dragging' : ''} ${className}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileSelect}
        accept={accept}
        className="drag-drop-input"
        aria-hidden="true"
      />
      <div className="drag-drop-content">
        <div className="drag-drop-icon-wrapper">
          <Icon name="upload" size={48} />
        </div>
        <h3 className="drag-drop-title">
          {isDragging ? 'Drop video here' : 'Select or drag a video'}
        </h3>
        <p className="drag-drop-desc">
          MP4, WebM, or QuickTime up to 300 MB
        </p>
        <div className="drag-drop-action">
          <Button variant="secondary" onClick={(e) => {
            e.stopPropagation();
            inputRef.current?.click();
          }}>
            Browse Files
          </Button>
        </div>
      </div>
    </div>
  );
}
