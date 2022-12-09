import { tw } from '@/utils/tailwindMerge';
import { AD, NavigationHeader, Notification, SyncButton } from '@/components';

type AnalysisProps<T extends React.ElementType> = Component<T>;

export function Analysis({ className, ...restProps }: AnalysisProps<'div'>) {
  return (
    <div className={tw('pt-8', className)} {...restProps}>
      <NavigationHeader>실시간 분석</NavigationHeader>
      <Notification />

      <div className="flex flex-col gap-4 pt-8 pl-7 text-body1 font-bold">
        <p>
          <strong className="font-bold text-Primary-600">기흥역</strong> 에서
          <br />
          <strong className="font-bold text-Primary-600">5001번</strong> 버스의
          예상 잔여 좌석은
          <br />
          <strong className="font-bold text-Primary-600">0석</strong> 일 것
          같아요!
        </p>
        <p>~차트~</p>
        <p>
          사용자의 <strong className="font-bold text-Primary-600">90%</strong>가
          만족하고 있어요!
        </p>
      </div>
      <SyncButton />
      <AD />
    </div>
  );
}
