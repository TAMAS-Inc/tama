import { twMerge as tw } from 'tailwind-merge';

export function Button({ children, className }: Component) {
  return (
    <button
      type="button"
      className={tw('bg-Primary-600 rounded px-5 py-1 text-White', className)}
    >
      {children}
    </button>
  );
}
