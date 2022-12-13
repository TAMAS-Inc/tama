import { useParams } from 'react-router-dom';
import { tw } from '@/utils/tailwindMerge';
import { NavigationHeader } from '@/components';

type NoticeProps<T extends React.ElementType> = Component<T>;

export default function Notice({
  className,
  ...restProps
}: NoticeProps<'div'>) {
  const { id } = useParams();

  return (
    <div className={tw('pt-8', className)} {...restProps}>
      <NavigationHeader>{id}번 공지사항</NavigationHeader>
      <div className="mt-8 mr-4 ml-4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo
        beatae nemo, quae ipsa, tempora ipsum adipisci eligendi perspiciatis
        accusantium repellendus quibusdam magni perferendis sequi suscipit
        soluta illo autem sed in.
      </div>
    </div>
  );
}
