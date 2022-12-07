type Component<T extends React.ElementType> = {
  className?: string;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;
