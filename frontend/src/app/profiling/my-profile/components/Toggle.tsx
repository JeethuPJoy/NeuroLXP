'use client';

import { useState } from 'react';

interface ToggleProps {
  label: string;
  defaultOn?: boolean;
  onChange?: (value: boolean) => void;
}

export default function Toggle({ label, defaultOn = false, onChange }: ToggleProps) {
  const [on, setOn] = useState(defaultOn);

  const handleToggle = () => {
    const next = !on;
    setOn(next);
    onChange?.(next);
  };

  return (
    <div className="toggle-row">
      <span className="toggle-label">{label}</span>
      <div className={`toggle-track${on ? ' on' : ''}`} onClick={handleToggle}>
        <div className="toggle-thumb" />
      </div>
    </div>
  );
}
