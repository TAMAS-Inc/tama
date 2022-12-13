import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Header, InputContainer, List, StatusButton } from '@/components';
import { tw } from '@/utils/tailwindMerge';
import { BaseModal } from '@/components/BaseModal';

type SearchBusStopProps<T extends React.ElementType> = Component<T>;
type SelectedStation = { title: string; subtitle: string };
type Location = {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: { userStation: string };
};

const stations = [
  { title: '기흥여객차고지', subtitle: '500095' },
  { title: '기흥역', subtitle: '511095' },
  { title: '기흥차고지', subtitle: '52295' },
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
  const location: Location = useLocation();
  const { userStation } = location.state;

  const [selectedBus, setSelectedBus] = useState<SelectedStation['title'][]>(
    []
  );
  const [selectedStation, setSelectedStation] =
    useState<SelectedStation | null>(null);

  const [showTip, setShowTip] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCloseClick = () => setIsOpen(false);
  const handleResetClick = () => setShowTip(true);
  const handleClick = ({ title, subtitle }: SelectedStation) => {
    setIsOpen(true);
    setSelectedStation((prevStation) => ({
      ...prevStation,
      title,
      subtitle,
    }));
  };

  const handleChange = () => setShowTip(inputRef.current?.value === '');
  const handleChangeCheckbox = (title: SelectedStation['title']) =>
    !selectedBus.includes(title)
      ? setSelectedBus((prevBus) => [...prevBus, title])
      : setSelectedBus((prevBus) => [
          ...prevBus.filter((busTitle) => busTitle !== title),
        ]);

  return (
    <div className={tw('mt-8 w-full', className)} {...restProps}>
      <Header>
        <Link to="/commute" state={{ userStation }}>
          <Header.BackButton />
        </Link>
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
              key={title}
              onClick={() => handleClick({ title, subtitle })}
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
              <List.Item className="pl-6">
                <List.Title>{selectedStation?.title}</List.Title>
                <List.Subtitle>{selectedStation?.subtitle}</List.Subtitle>
                <List.Icon icon={ChevronDownIcon} />
              </List.Item>

              {buses.map(({ title }) => (
                <List.Item key={title} className="relative pl-4">
                  <List.Title className="pl-2 text-body1 text-Primary-700">
                    {title}
                  </List.Title>
                  <InputContainer className="absolute top-6 right-6 h-6 w-6">
                    <InputContainer.Label>
                      <InputContainer.Label.Input
                        onChange={() => handleChangeCheckbox(title)}
                        type="checkbox"
                        className="bg-Gray-500"
                      />
                    </InputContainer.Label>
                  </InputContainer>
                </List.Item>
              ))}
            </List>
            <Link
              to="/commute"
              state={{
                userStation,
                stationName: selectedStation?.title,
                bus: selectedBus,
              }}
            >
              <StatusButton className="fixed left-4 bottom-8 w-[calc(100%-32px)]">
                확인
              </StatusButton>
            </Link>
          </BaseModal.Content>
          <BaseModal.DimBg onClick={handleCloseClick} />
        </BaseModal>
      )}
    </div>
  );
}
