import { tw } from '@/utils/tailwindMerge';
import { AD, Dropdown, NavigationHeader, Notification } from '@/components';

type PredictionProps<T extends React.ElementType> = Component<T>;

export function Prediction({
  className,
  ...restProps
}: PredictionProps<'div'>) {
  return (
    <div className={tw('pt-8', className)} {...restProps}>
      <NavigationHeader>예측</NavigationHeader>
      <Notification />
      <div className="flex flex-col gap-4 pt-8 pl-7 text-body1 font-bold">
        <p>
          기분 좋은 출근러님을 위해 준비했어요
          <br />
          내일 12월 25일에
        </p>
        <p>
          <div className="mr-2 inline-block">
            <Dropdown>
              <Dropdown.Content className="text-Primary-600">
                춘시기네
              </Dropdown.Content>
              <Dropdown.Button className="stroke-Gray-300" />
            </Dropdown>
          </div>
          에서
        </p>
        <p>
          <div className="mr-2 inline-block">
            <Dropdown>
              <Dropdown.Content className="text-Primary-600">
                07:30
              </Dropdown.Content>
              <Dropdown.Button />
            </Dropdown>
          </div>
          까지 버스를 타려면
        </p>
      </div>
      <AD />
    </div>
  );
}
