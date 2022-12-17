import { Link } from 'react-router-dom';
import { tw } from '@/utils/tailwindMerge';
import { List, NavigationHeader } from '@/components';

type OpenSourceProps<T extends React.ElementType> = Component<T>;

export default function OpenSource({
  className,
  ...restProps
}: OpenSourceProps<'div'>) {
  const data = [
    {
      id: 1,
      title: 'React',
    },
    {
      id: 2,
      title: 'AWSCore',
    },
  ];
  return (
    <div className={tw('', className)} {...restProps}>
      <NavigationHeader>오픈소스 이용</NavigationHeader>
      <List>
        {data.map(({ id, title }) => (
          <Link key={id} to={`/menu/opensource/${title}`}>
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
