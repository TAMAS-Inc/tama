export const getStorageItem = (key: string): any => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setStorageItem = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));
