import { BusCard } from '@/components';

type MyStationCardProps<T extends React.ElementType> = {
  handleSelect: React.MouseEventHandler<HTMLDivElement>;
  routeId: string;
  routeName: string;
  stationName: string;
  dest: string;
  selected?: boolean;
} & Component<T>;

export function MyStationCard({
  children,
  className,
  handleSelect,
  routeId,
  routeName,
  stationName,
  dest,
  selected = false,
  ...restProps
}: MyStationCardProps<'div'>) {
  return (
    <BusCard
      className="flex flex-col items-start justify-center"
      onClick={handleSelect}
      {...restProps}
    >
      <BusCard.Info className="static left-0 flex translate-x-0 flex-row">
        <BusCard.Content className="w-28 text-body1">
          {routeName}
        </BusCard.Content>
        <BusCard.StationName className="mb-0 flex items-center justify-center">
          {stationName}
        </BusCard.StationName>
      </BusCard.Info>
      <BusCard.Content className="text-Gray-400">{dest}</BusCard.Content>
      {selected && <BusCard.CheckIcon isChecked />}
    </BusCard>
  );
}
