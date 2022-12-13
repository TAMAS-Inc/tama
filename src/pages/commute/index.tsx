import { useRef, useEffect, useState, ChangeEventHandler } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationHeader,
  InputContainer,
  TextButton,
  StatusButton,
} from '@/components';

type CommuteProps<T extends React.ElementType> = Component<T>;
type Location = {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: {
    bus: string[];
    stationName: string;
    userStation: string;
  };
};

export default function Commute({
  children,
  className,
  ...restProps
}: CommuteProps<'div'>) {
  const location: Location = useLocation();
  const {
    userStation = '춘식이네',
    stationName,
    bus,
  }: Location['state'] = location.state ?? {
    userStation: '춘식이네',
    stationName: '',
    bus: [],
  };

  const [userStationName, setUserStationName] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonStationRef = useRef<HTMLButtonElement>(null);
  const buttonBusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonStationRef?.current) {
      buttonStationRef.current.textContent = stationName || '정류장 선택';
    }
    if (buttonBusRef?.current) {
      if (stationName) {
        buttonBusRef.current.textContent = bus.join(', ') ?? '버스 선택';
      }
    }
    if (inputRef?.current) {
      inputRef.current.value = userStation ?? '춘식이네';
      setUserStationName(inputRef.current.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUserStationName(e.target.value);
  };
  const handleSetLocal = () => {
    localStorage.setItem('userStation', userStation);
    localStorage.setItem('stationName', stationName);
    localStorage.setItem('busName', bus.join(','));
  };

  return (
    <div className="pl-4 pr-4" {...restProps}>
      <NavigationHeader className="-ml-4">출근길 관리</NavigationHeader>
      <div className="mt-8">
        <h2 className="mb-2 text-body2">내 정류장 별칭 입력</h2>
        <InputContainer className="relative h-12 w-full">
          <InputContainer.Label>
            <InputContainer.Label.Input
              ref={inputRef}
              className="border border-Gray-300"
              onChange={handleChange}
            />
          </InputContainer.Label>
          <InputContainer.ResetButton className="absolute top-3 right-3 h-6 w-6 fill-Gray-500" />
        </InputContainer>
      </div>
      <div className="mt-8">
        <h2 className="mb-2 text-body2">정류장 이름</h2>
        <Link to="/searchStation" state={{ userStation: userStationName }}>
          <TextButton
            ref={buttonStationRef}
            className="relative h-12 w-full rounded-lg border border-Gray-300 bg-White text-left text-body2 text-Gray-400"
          >
            정류장 검색
          </TextButton>
        </Link>
      </div>
      <div className="mt-8">
        <h2 className="mb-2 text-body2">버스 번호</h2>
        <TextButton
          ref={buttonBusRef}
          className="relative h-12 w-full rounded-lg border border-Gray-300 bg-White text-left text-body2 text-Gray-400"
        />
      </div>
      <Link to="/main">
        <StatusButton
          disabled={!location.state}
          onClick={handleSetLocal}
          className="fixed bottom-8 w-[calc(100%-32px)]"
        >
          확인
        </StatusButton>
      </Link>
    </div>
  );
}
