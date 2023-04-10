import { useState } from "react";

export function useLocalStorage(
  key: string,
  defaultValue: any
): [any, (valuetoStore: any) => void] {
  const temp = localStorage.getItem(key);
  const parsedTemp = temp ? JSON.parse(temp) : defaultValue;

  const [storedValue, setStoredValue] = useState(parsedTemp);

  function updateStorage(valuetoStore: any): void {
    localStorage.setItem(key, JSON.stringify(valuetoStore));
    setStoredValue(valuetoStore);
  }

  return [storedValue, updateStorage];
}
