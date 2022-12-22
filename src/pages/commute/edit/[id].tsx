/* eslint-disable no-nested-ternary */
import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import {
  BaseModal,
  Error,
  InputContainer,
  List,
  LoadingWithDelay,
  NavigationHeader,
  StatusButton,
  TextButton,
} from '@/components';
import { useCommutes } from '@/hooks/useCommutes';
import { currentComIdState } from '@/state/atom';
import { tw } from '@/utils/tailwindMerge';
import { useAvailableRoutes } from '../hooks/useAvailableRoutes';
import { animatedBaseModal } from '../../../constants/style';
import NotFound from '@/pages/404';

type CommuteProps<T extends React.ElementType> = Component<T>;

export default function Commute({
  children,
  className,
  ...restProps
}: CommuteProps<'div'>) {
  const navigate = useNavigate();
  const [targetId, setTargetId] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentComId, setCurrentComId] = useRecoilState(currentComIdState);

  const { commutes, editing, editCommute, addCommute } = useCommutes();

  const { id: comId } = useParams();

  const {
    isLoading,
    isError,
    data: routes,
  } = useAvailableRoutes({ stationId: editing.station?.stationId as string });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const commute = commutes.find((c) => c.comId === comId);
    if (commute && commute.comId !== editing.comId) {
      editCommute(commute);
    }
    if (inputRef?.current) {
      inputRef.current.value = commute?.comName ?? editing.comName;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!comId) return <NotFound />;

  const handleOpenClick = () => setIsModalOpen(true);
  const handleCloseClick = () => setIsModalOpen(false);
  const handleResetClick = () => {
    inputRef.current?.focus();
  };

  const handleComNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    editCommute({
      ...editing,
      comName: e.target.value,
    });
  };

  const handleRouteCheckChange = (route: Route, checked: boolean) => {
    if (checked) {
      editCommute({
        ...editing,
        routes: [...editing.routes, route],
      });
    } else {
      editCommute({
        ...editing,
        routes: editing.routes.filter((r) => r.routeId !== route.routeId) ?? [],
      });
    }
  };

  const handlePopupMessage = () => {
    setIsPopupOpen(true);
    setTimeout(() => setIsPopupOpen(false), 1000);
  };

  const handleConfirmClick = () => {
    if (!currentComId) setCurrentComId(editing.comId);
    addCommute(editing);
    navigate('/main');
  };

  if (isError)
    return (
      <div className="" {...restProps}>
        <NavigationHeader>출근길 관리</NavigationHeader>
        <Error>
          <Error.SVG />
          <Error.Text>
            현재 보고 계신 페이지를 이용할 수 없습니다.
            <br />
            재접속 후에도 화면이 나타나지 않는다면
            <br />
            아래 버튼을 눌러 알려주세요!
          </Error.Text>
          <Error.InduceLink path="/menu/inquiry">
            문의하러 가기
          </Error.InduceLink>
        </Error>
      </div>
    );

  return (
    <div className="" {...restProps}>
      <NavigationHeader>출근길 관리</NavigationHeader>
      <div className="px-4 pt-6">
        <h2 className="mb-2  text-body2">내 정류장 별칭 입력</h2>
        <InputContainer className="relative h-12 w-full">
          <InputContainer.Label>
            <InputContainer.Label.Input
              ref={inputRef}
              className="truncate border border-Gray-300 pr-10 focus:border-2 focus:border-Primary-500"
              onChange={handleComNameChange}
            />
          </InputContainer.Label>
          <InputContainer.ResetButton
            onClick={handleResetClick}
            className="absolute top-3 right-3 h-6 w-6 fill-Gray-500"
          />
        </InputContainer>
      </div>
      <div className="mt-8 px-4">
        <h2 className="mb-2 text-body2">정류장 이름</h2>
        <Link to={`/commute/searchStation/${comId}`}>
          <TextButton
            className={tw(
              'relative h-12 w-full truncate rounded-lg border border-Gray-300 bg-White text-left text-body2',
              !editing.station?.stationName ? 'text-Gray-400' : 'text-Black'
            )}
          >
            {editing.station?.stationName ?? '정류장 선택'}
          </TextButton>
        </Link>
      </div>
      <div className="mt-8 px-4">
        <h2 className="mb-2 text-body2">버스 번호</h2>
        <TextButton
          disabled={!editing.station}
          onClick={handleOpenClick}
          className={tw(
            'relative h-12 w-full truncate rounded-lg border border-Gray-300 bg-White text-left text-body2',
            !editing.station?.stationName ||
              editing.routes.map((r) => r.routeName).length === 0
              ? 'text-Gray-400'
              : 'text-Black'
          )}
        >
          {!editing.station?.stationName
            ? '정류장을 먼저 선택해주세요'
            : editing.routes.map((r) => r.routeName).length !== 0
            ? editing.routes
                .sort((a, b) => {
                  if (a.routeName < b.routeName) return -1;
                  if (a.routeName > b.routeName) return 1;
                  return 0;
                })
                .map((r) => r.routeName)
                .join(', ')
            : '버스를 선택해주세요'}
        </TextButton>
      </div>
      <StatusButton
        disabled={!editing.routes.length}
        className="fixed left-4 bottom-8 w-[calc(100%-32px)]"
        onClick={handleConfirmClick}
      >
        확인
      </StatusButton>
      <BaseModal>
        <BaseModal.Content
          className={tw(
            animatedBaseModal,
            isModalOpen ? 'translate-y-0' : 'translate-y-[1800px]'
          )}
        >
          <List className="rounded-t-2xl">
            <List.Item
              onClick={handleCloseClick}
              className="rounded-t-2xl pl-6"
            >
              <List.Title className="w-40 truncate text-left">
                {editing.station?.stationName}
              </List.Title>
              <List.Icon icon={ChevronDownIcon} />
            </List.Item>
            {isLoading ? (
              <LoadingWithDelay />
            ) : (
              routes
                ?.sort((a, b) => {
                  if (a.routeName < b.routeName) return -1;
                  if (a.routeName > b.routeName) return 1;
                  return 0;
                })
                .map(({ routeName, routeId }) => (
                  <List.Item key={routeId} className="relative pl-4">
                    <InputContainer className="h-full w-full pl-2 text-body1 text-Primary-700">
                      <InputContainer.Label>
                        {routeName}
                        <InputContainer.Label.Input
                          onChange={() => {
                            handleRouteCheckChange(
                              { routeName, routeId },
                              !editing.routes.find((e) => e.routeId === routeId)
                            );
                            handlePopupMessage();
                            setTargetId(routeId);
                          }}
                          type="checkbox"
                          className="hidden"
                          checked={
                            !editing.routes.find((e) => e.routeId === routeId)
                          }
                        />
                        <List.Icon
                          className={tw(
                            'absolute top-6 right-4 h-7 w-7',
                            !editing.routes.find((e) => e.routeId === routeId)
                              ? 'bg-White fill-White stroke-Gray-300'
                              : 'bg-White fill-Primary-400'
                          )}
                          icon={
                            !editing.routes.find((e) => e.routeId === routeId)
                              ? PlusCircleIcon
                              : CheckCircleIcon
                          }
                        />
                      </InputContainer.Label>
                    </InputContainer>
                  </List.Item>
                ))
            )}
            <div
              className={tw(
                'absolute left-1/2 bottom-10 -translate-x-1/2 -translate-y-1/2 rounded-md bg-Gray-600 py-1 px-2 text-center text-Gray-100 transition-opacity',
                isPopupOpen ? 'opacity-100' : 'opacity-0'
              )}
            >
              {!editing.routes.find((e) => e.routeId === targetId)
                ? '제거 '
                : '추가 '}
              되었습니다.
            </div>
          </List>
        </BaseModal.Content>
        <BaseModal.DimBg
          onClick={handleCloseClick}
          className={tw(isModalOpen ? '' : 'hidden')}
        />
      </BaseModal>
    </div>
  );
}
