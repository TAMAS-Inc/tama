import { Link } from 'react-router-dom';
import { tw } from '@/utils/tailwindMerge';
import { ReactComponent as Logo } from '@/assets/logo/logo.svg';
import { TextButton } from '../TextButton/TextButton';

type ErrorProps<T extends React.ElementType> = Component<T>;

export function Error({
  className,
  children,
  ...restProps
}: ErrorProps<'div'>) {
  return (
    <div className={tw('mt-8', className)} {...restProps}>
      {children}
    </div>
  );
}

type SVGProps<T extends React.ElementType> = Component<T>;

function SVG({ children, className, ...restProps }: SVGProps<'svg'>) {
  return <Logo className={tw('mx-auto mb-8', className)} {...restProps} />;
}

Error.SVG = SVG;

type TextProps<T extends React.ElementType> = Component<T>;

function Text({ children, className, ...restProps }: TextProps<'div'>) {
  return (
    <div
      className={tw('text-center text-body1 text-Gray-500', className)}
      {...restProps}
    >
      {children}
    </div>
  );
}

Error.Text = Text;

type InduceLinkProps<T extends React.ElementType> = {
  path: string;
} & Component<T>;

function InduceLink({
  children,
  className,
  path,
  ...restProps
}: InduceLinkProps<'a'>) {
  return (
    <Link to={path} className={tw('', className)} {...restProps}>
      <TextButton className="fixed left-4 bottom-8 h-12 w-[calc(100%-32px)] bg-Primary-200 text-body1">
        {children}
      </TextButton>
    </Link>
  );
}

Error.InduceLink = InduceLink;
