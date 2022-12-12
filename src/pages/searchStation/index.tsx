import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Header, InputContainer, List, ToggleIconButton } from '@/components';
import { tw } from '@/utils/tailwindMerge';
import { BaseModal } from '@/components/BaseModal';

type SearchBusStopProps<T extends React.ElementType> = Component<T>;

const stations = [
  { title: '기흥여객차고지', subtitle: 500095 },
  { title: '기흥역', subtitle: 511095 },
  { title: '기흥차고지', subtitle: 52295 },
];
const buses = [
  {
    title: '5001',
    subtitle: '롯데캐슬스카이.이안두드림.백남준아트센터 방면',
  },
  { title: '5002A', subtitle: '롯데월드, 강남역 방면' },
];

export default function SearchBusStop({
  className,
  ...restProps
}: SearchBusStopProps<'div'>) {
  const location = useLocation();
  const { station } = location.state;

  const [selectedStation, setSelectedStation] = useState<string>('');
  const [selectedStationInfo, setSelectedStationInfo] = useState<string>('');
  const [showTip, setShowTip] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (e) => {
    setIsOpen(true);
    setSelectedStation(e.target.value);
  };

  const handleChange = () => {
    setShowTip(inputRef.current?.value === '');
  };

  const handleResetClick = () => {
    setShowTip(true);
  };

  return (
    <div className={tw('mt-8 w-full', className)} {...restProps}>
      <Header>
        <Header.BackButton />
        <Header.Title className="grow">
          <InputContainer className="relative w-full pl-3 ">
            <InputContainer.Label>
              <InputContainer.Label.Input
                ref={inputRef}
                onChange={handleChange}
                className="bg-Gray-100"
                placeholder="정류장 검색"
              />
            </InputContainer.Label>
            <InputContainer.ResetButton
              onClick={handleResetClick}
              className="absolute top-1 right-3 h-6 w-6"
            />
          </InputContainer>
        </Header.Title>
      </Header>

      {showTip ? (
        <div className="mt-9 ml-4">
          <h2 className="mb-2 text-body1 font-bold">
            출근하는 정류장을 검색해보세요
          </h2>
          <p className="ml-2">∙ 정류장 이름</p>
          <p className="ml-4 text-Gray-400">예) 기흥역</p>
          <p className="ml-2">∙ 정류장 번호</p>
          <p className="ml-4 text-Gray-400">예) 14324</p>
        </div>
      ) : (
        <List className="mt-9 ml-4">
          {stations.map(({ title, subtitle }) => (
            <List.Item
              onClick={(e) => {
                setIsOpen(true);
                setSelectedStationInfo(
                  e.target.closest('button').lastElementChild.textContent
                );
                setSelectedStation(
                  e.target.closest('button').firstElementChild.textContent
                );
              }}
              className="pl-2"
            >
              <List.Title>{title}</List.Title>
              <List.Subtitle>{subtitle} | 종점방면</List.Subtitle>
            </List.Item>
          ))}
        </List>
      )}
      {isOpen && (
        <BaseModal>
          <BaseModal.Content className="top-56 h-full w-full rounded-t-2xl bg-White">
            <List>
              <List.Item>
                <List.Title>{selectedStation}</List.Title>
                <List.Subtitle>{selectedStationInfo}</List.Subtitle>
                <List.Icon icon={ChevronDownIcon} />
              </List.Item>

              {buses.map(({ title, subtitle }) => (
                <List.Item key={title} className="pl-2">
                  <List.Title>{title}</List.Title>
                  <List.Subtitle>{subtitle} | 종점방면</List.Subtitle>
                  <ToggleIconButton />
                </List.Item>
              ))}
            </List>
          </BaseModal.Content>
          <BaseModal.DimBg onClick={() => setIsOpen(false)} />
        </BaseModal>
      )}
    </div>
  );
}
