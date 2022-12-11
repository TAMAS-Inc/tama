import { tw } from '@/utils/tailwindMerge';

type TableProps<T extends React.ElementType> = Component<T>;

export function Table({
  children,
  className,
  ...restProps
}: TableProps<'table'>) {
  return (
    <table className={tw('w-full', className)} {...restProps}>
      {children}
    </table>
  );
}

type HeaderProps<T extends React.ElementType> = Component<T>;

function Header({ children, className, ...restProps }: HeaderProps<'thead'>) {
  return (
    <thead {...restProps}>
      <tr
        className={tw(
          'flex h-6 justify-evenly border-b border-Gray-100 px-4',
          className
        )}
      >
        {children}
      </tr>
    </thead>
  );
}

type BodyProps<T extends React.ElementType> = Component<T>;

function Body({ children, className, ...restProps }: BodyProps<'tbody'>) {
  return (
    <tbody {...restProps}>
      <tr
        className={tw(
          'flex h-10 justify-evenly border-b border-Gray-100 px-4',
          className
        )}
      >
        {children}
      </tr>
    </tbody>
  );
}

type HeaderItemProps<T extends React.ElementType> = Component<T>;

function HeaderItem({
  children,
  className,
  ...restProps
}: HeaderItemProps<'th'>) {
  return (
    <th
      className={tw(
        'flex w-1/4 items-center justify-center text-center text-body3',
        className
      )}
      {...restProps}
    >
      {children}
    </th>
  );
}

type BodyItemProps<T extends React.ElementType> = Component<T>;

function BodyItem({ children, className, ...restProps }: BodyItemProps<'td'>) {
  return (
    <td
      className={tw(
        'flex w-1/4 items-center justify-center text-center text-body2',
        className
      )}
      {...restProps}
    >
      {children}
    </td>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.HeaderItem = HeaderItem;
Table.BodyItem = BodyItem;
