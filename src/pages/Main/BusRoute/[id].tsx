import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import { TruckIcon } from '@heroicons/react/24/solid';
import { tw } from '@/utils/tailwindMerge';
import {
  AD,
  NavigationHeader,
  Notification,
  BusCard,
  Icon,
} from '@/components';

type BusRouteProps<T extends React.ElementType> = Component<T>;

const stations = [
  { title: '기흥여객차고지', subtitle: '500095', isThere: false },
  { title: '기흥역', subtitle: '511095', isThere: true },
  { title: '기흥차고지', subtitle: '52295', isThere: false },
];

export default function BusRoute({
  className,
  ...restProps
}: BusRouteProps<'div'>) {
  return (
    <div className={tw('pt-8', className)} {...restProps}>
      <NavigationHeader className="mb-2">5001번</NavigationHeader>
      <Notification />
      {stations.map(({ title, subtitle, isThere }) => (
        <BusCard className="flex h-full flex-col items-start">
          <div className="relative ml-14 h-20 border-l-2 border-l-Primary-500 pl-4">
            <BusCard.StationName className="mt-4">{title}</BusCard.StationName>
            <BusCard.Info className="text-bold static left-0 flex translate-x-0 flex-row text-Gray-400">
              <BusCard.Content className="w-[50px]">{subtitle}</BusCard.Content>
              <BusCard.Content className="border-l border-Gray-200 pl-2">
                방면
              </BusCard.Content>
            </BusCard.Info>
            {isThere ? (
              <p className="absolute top-8 -left-[78px] rounded-sm border border-Gray-200 px-1 text-body3">
                1316 33석
              </p>
            ) : (
              ''
            )}
            <Icon
              icon={isThere ? TruckIcon : ArrowDownCircleIcon}
              className={tw(
                'absolute top-8 -left-[9px] h-4 w-4 fill-White stroke-Gray-400',
                isThere ? 'fill-Gray-700' : ''
              )}
            />
          </div>
        </BusCard>
      ))}
      <AD />
    </div>
  );
}
