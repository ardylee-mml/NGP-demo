"use client";

import { useState, useEffect } from 'react';

export function useSelections(key: string) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Load selections from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      setSelectedItems(JSON.parse(saved));
    }
  }, [key]);

  // Save selections to localStorage whenever they change
  const updateSelections = (items: string[]) => {
    setSelectedItems(items);
    localStorage.setItem(key, JSON.stringify(items));
  };

  return [selectedItems, updateSelections] as const;
} 