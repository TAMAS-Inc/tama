import { Link } from 'react-router-dom';
import { tw } from '@/utils/tailwindMerge';
import { List, NavigationHeader } from '@/components';
import { OpenSourceData } from '../../../../public/assets/data/openSourceData/index';

type OpenSourceProps<T extends React.ElementType> = Component<T>;

export default function OpenSource({
  className,
  ...restProps
}: OpenSourceProps<'div'>) {
  return (
    <div className={tw('', className)} {...restProps}>
      <NavigationHeader>오픈소스 이용</NavigationHeader>
      <List>
        {OpenSourceData.map(({ id, title }) => (
          <Link key={id} to={`/menu/opensource/${id}`}>
            <List.Item>
              <List.Title>{title}</List.Title>
              <List.Icon />
            </List.Item>
          </Link>
        ))}
      </List>
    </div>
  );
}
