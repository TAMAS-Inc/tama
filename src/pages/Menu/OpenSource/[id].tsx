import { useParams } from 'react-router-dom';
import { OpenSourceData } from '@/assets/data/openSourceData';
import { tw } from '@/utils/tailwindMerge';
import { NavigationHeader } from '@/components';

type OpenSourceItemProps<T extends React.ElementType> = Component<T>;

export default function OpenSourceItem({
  className,
  ...restProps
}: OpenSourceItemProps<'div'>) {
  const { id } = useParams();

  const opensourchItem = id ? OpenSourceData.find((d) => d.id === +id) : null;

  return (
    <div className={tw('', className)} {...restProps}>
      <NavigationHeader>{opensourchItem?.title}</NavigationHeader>
      <div className="m-4 flex flex-col gap-4">
        <p>{opensourchItem?.data.copyright}</p>
        <p>{opensourchItem?.data.description}</p>
        <p>{opensourchItem?.data.licence}</p>
        <p>{opensourchItem?.data.content}</p>
      </div>
    </div>
  );
}
