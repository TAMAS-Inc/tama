import { tw } from '@/utils/tailwindMerge';
import { StatusButton } from '@/components';

type LandingLayoutProps<T extends React.ElementType> = {
  agree?: boolean;
} & Component<T>;

export function LandingLayout({
  className,
  children,
  agree,
  ...restProps
}: LandingLayoutProps<'div'>) {
  return (
    <div
      className={tw('w-full pt-8 pb-8 text-body1', className)}
      {...restProps}
    >
      {children}
      <StatusButton
        disabled={!agree}
        className="fixed bottom-8 w-[calc(100%-32px)]"
      >
        확인
      </StatusButton>
    </div>
  );
}
