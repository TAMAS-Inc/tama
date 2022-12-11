import { tw } from '@/utils/tailwindMerge';

type NotFoundProps<T extends React.ElementType> = Component<T>;

export default function NotFound({
  className,
  ...restProps
}: NotFoundProps<'div'>) {
  return (
    <div className={tw('pt-8', className)} {...restProps}>
      404
    </div>
  );
}
