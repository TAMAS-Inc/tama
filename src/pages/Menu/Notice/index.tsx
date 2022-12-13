import { Link } from 'react-router-dom';
import { tw } from '@/utils/tailwindMerge';
import { List, NavigationHeader } from '@/components';

type NoticeProps<T extends React.ElementType> = Component<T>;

export default function Notice({
  className,
  ...restProps
}: NoticeProps<'div'>) {
  const data = [
    {
      id: 1,
      title: '서비스 이용약관 개정 안내(12월 25일 시행)',
      date: '2022.12.03',
    },
    {
      id: 2,
      title: '서비스 이용약관 개정 안내(12월 25일 시행)',
      date: '2022.12.03',
    },
  ];

  return (
    <div className={tw('pt-8', className)} {...restProps}>
      <NavigationHeader>공지사항</NavigationHeader>
      <List>
        {data.map(({ id, title, date }) => (
          <Link key={id} to={`/menu/notice/${id}`}>
            <List.Item>
              <List.Title>{title}</List.Title>
              <List.Subtitle>{date}</List.Subtitle>
              <List.Icon />
            </List.Item>
          </Link>
        ))}
      </List>
    </div>
  );
}
