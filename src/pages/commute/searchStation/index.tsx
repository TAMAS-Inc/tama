import { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Header, InputContainer, List } from '@/components';
import { tw } from '@/utils/tailwindMerge';
import { BusSelectionModal } from '../components';

type SearchBusStopProps<T extends React.ElementType> = Component<T>;
type SelectedStation = { title: string; subtitle: string };
type Location = {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: { commuteName: string };
};

const stations = [
  { title: '기흥여객차고지', subtitle: '500095' },
  { title: '기흥역', subtitle: '511095' },
  { title: '기흥차고지', subtitle: '52295' },
];

export default function SearchBusStop({
  className,
  ...restProps
}: SearchBusStopProps<'div'>) {
  const location: Location = useLocation();
  const { commuteName } = location.state;
  const navigate = useNavigate();

  const [selectedRoutes, setSelectedRoutes] = useState<
    SelectedStation['title'][]
  >([]);
  const [selectedStation, setSelectedStation] =
    useState<SelectedStation | null>(null);

  const [showTip, setShowTip] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const toggleModal: React.MouseEventHandler<
    HTMLButtonElement | HTMLDivElement
  > = () => setIsOpen(!isOpen);

  const handleResetClick = () => setShowTip(true);
  const handleStationClick = ({ title, subtitle }: SelectedStation) => {
    setSelectedStation((prevStation) => ({
      ...prevStation,
      title,
      subtitle,
    }));
    setIsOpen(!isOpen);
  };

  const handleChange = () => setShowTip(inputRef.current?.value === '');

  const handleConfirmClick = () => {
    navigate('/commute', {
      state: {
        commuteName,
        stationName: selectedStation?.title,
        routesList: selectedRoutes,
      },
    });
  };

  return (
    <div className={tw('mt-4 w-full', className)} {...restProps}>
      <Header>
        <Link
          to="/commute"
          state={{
            commuteName,
            stationName: selectedStation?.title,
            routesList: selectedRoutes,
          }}
        >
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
        <div className="mt-4 pl-4">정류장 리스트</div>
      ) : (
        <List className="mt-4 pl-4">
          {stations.map(({ title, subtitle }) => (
            <List.Item
              key={title}
              onClick={() => handleStationClick({ title, subtitle })}
              className="pl-2"
            >
              <List.Title>{title}</List.Title>
              <List.Subtitle>{subtitle} | 종점방면</List.Subtitle>
            </List.Item>
          ))}
        </List>
      )}
      {isOpen && (
        <BusSelectionModal
          stationName={selectedStation!.title}
          onDimBgClick={toggleModal}
          selectedRoutes={selectedRoutes}
          setSelectedRoutes={setSelectedRoutes}
          onConfirmClick={handleConfirmClick}
        />
      )}
    </div>
  );
}
