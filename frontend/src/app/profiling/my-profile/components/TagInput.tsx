'use client';

import React, { useState, KeyboardEvent } from 'react';

interface TagInputProps {
  label?: React.ReactNode;
  initialTags?: string[];
  placeholder?: string;
  onChange?: (tags: string[]) => void;
  addOnComma?: boolean;
  addOnBlur?: boolean;
  removeLastOnBackspace?: boolean;
  showAddButton?: boolean;
}

export default function TagInput({
  label,
  initialTags = [],
  placeholder = 'Type and press Enter',
  onChange,
  addOnComma = true,
  addOnBlur = true,
  removeLastOnBackspace = true,
  showAddButton = true,
}: TagInputProps) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [input, setInput] = useState('');

  const updateTags = (newTags: string[]) => {
    setTags(newTags);
    onChange?.(newTags);
  };

  const addTag = () => {
    const value = input.trim();

    if (value && !tags.includes(value)) {
      updateTags([...tags, value]);
    }

    setInput('');
  };

  const removeTag = (index: number) => {
    updateTags(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || (addOnComma && e.key === ',')) {
      e.preventDefault();
      addTag();
    }

    if (
      removeLastOnBackspace &&
      e.key === 'Backspace' &&
      !input &&
      tags.length
    ) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div className="tag-input">
      {label && <label className="field-label">{label}</label>}

      <div className="tag-input__box">
        {tags.map((tag, index) => (
          <span key={`${tag}-${index}`} className="badge">
            {tag}
            <button className="badge-remove" type="button" onClick={() => removeTag(index)}>
              ×
            </button>
          </span>
        ))}

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addOnBlur ? addTag : undefined}
          placeholder={placeholder}
        />

        {showAddButton && (
          <button type="button" className="btn-add" onClick={addTag}>
            + Add
          </button>
        )}
      </div>
    </div>
  );
}