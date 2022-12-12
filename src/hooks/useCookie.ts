/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useState } from 'react';

type UseCookieProps = [
  string | boolean,
  (value: string | boolean, expired: number) => void
];

const getItem = (key: string) =>
  document.cookie.split('; ').reduce((total, currentCookie) => {
    const item = currentCookie.split('=');
    const storedKey = item[0];
    const storedValue = item[1];
    return key === storedKey ? decodeURIComponent(storedValue) : total;
  }, '');

const setItem = (key: string, value: string | boolean, expired: number) => {
  const now = new Date();
  now.setTime(now.getTime() + expired * 60 * 60 * 24 * 1000);
  document.cookie = `${key}=${value}; expires=${now.toUTCString()}; path=/`;
};

export const useCookie = (
  key: string,
  defaultValue: string | boolean
): UseCookieProps => {
  const [cookie, setCookie] = useState(getItem(key) || defaultValue);

  const updateCookie = (value: string | boolean, expired: number) => {
    setCookie(value);
    setItem(key, value, expired);
  };

  return [cookie, updateCookie];
};
