import 'tailwindcss/tailwind.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export const decorators = [
  (Story) => (
    <BrowserRouter>
      <Story />
    </BrowserRouter>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone12',
  },
  layout: 'fullscreen',
};
