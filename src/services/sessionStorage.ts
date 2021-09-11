export const getItemFromLocalStorage = (key: string, initialValue: unknown) => {
  const itemToGet = sessionStorage.getItem(key);
  if (itemToGet) {
    return JSON.parse(itemToGet);
  }
  return initialValue;
};

export const setItemInLocalStorage = (key: string, value: unknown) =>
  sessionStorage.setItem(key, JSON.stringify(value));

export const removeItemFromLocalStorage = (key: string) => sessionStorage.removeItem(key);
