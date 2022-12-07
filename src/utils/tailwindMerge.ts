import { extendTailwindMerge } from 'tailwind-merge';

export const tw = extendTailwindMerge({
  classGroups: {
    'font-size': [{ text: ['body1', 'body2', 'body3'] }],
  },
});
