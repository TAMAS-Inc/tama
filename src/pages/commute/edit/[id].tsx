import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

import {
  BaseModal,
  InputContainer,
  List,
  NavigationHeader,
  StatusButton,
  TextButton,
} from '@/components';
import { useCommutes } from '@/hooks/useCommutes';
import { currentComIdState } from '@/state/atom';
import { tw } from '@/utils/tailwindMerge';

// import { dummyRoutes } from '../searchStation/[id]';
import { useAvailableRoutes } from '../hooks/useAvailableRoutes';
import { animatedBaseModal } from '../../../constants/style';

type CommuteProps<T extends React.ElementType> = Component<T>;

export default function Commute({
  children,
  className,
  ...restProps
}: CommuteProps<'div'>) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const setCurrentComId = useSetRecoilState(currentComIdState);
  const { commutes, editCommute } = useCommutes();

  const { id: comId } = useParams();

  const commute = commutes.find((c) => c.comId === comId) as Commute;

  const {
    // isLoading,
    // isError,
    data: routes,
  } = useAvailableRoutes({ stationId: commute.station?.stationId ?? null });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.value = commute.comName;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!comId) return null;

  const handleOpenClick = () => setIsModalOpen(true);
  const handleCloseClick = () => setIsModalOpen(false);

  const handleComNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    editCommute(comId, {
      ...commute,
      comName: e.target.value,
    });
  };

  const handleRouteCheckChange = (route: Route, checked: boolean) => {
    if (checked) {
      editCommute(comId, {
        ...commute,
        routes: [...commute.routes, route],
      });
    } else {
      editCommute(comId, {
        ...commute,
        routes: commute.routes.filter((r) => r.routeId !== route.routeId),
      });
    }
  };
  const handleRoutesConfirmClick = () => {
    setIsModalOpen(false);
  };

  const handleConfirmClick = () => {
    setCurrentComId(commute.comId);
    navigate('/main');
  };

  return (
    <div className="overflow-hidden" {...restProps}>
      <NavigationHeader className="">출근길 관리</NavigationHeader>
      <div className="mt-8 px-4">
        <h2 className="mb-2 text-body2">내 정류장 별칭 입력</h2>
        <InputContainer className="relative h-12 w-full">
          <InputContainer.Label>
            <InputContainer.Label.Input
              ref={inputRef}
              className="border border-Gray-300"
              onChange={handleComNameChange}
            />
          </InputContainer.Label>
          <InputContainer.ResetButton className="absolute top-3 right-3 h-6 w-6 fill-Gray-500" />
        </InputContainer>
      </div>
      <div className="mt-8 px-4">
        <h2 className="mb-2 text-body2">정류장 이름</h2>
        <Link to={`/commute/searchStation/${comId}`}>
          <TextButton
            className={tw(
              'relative h-12 w-full rounded-lg border border-Gray-300 bg-White text-left text-body2 text-Gray-400',
              !commute.station?.stationName ? '' : 'text-Black'
            )}
          >
            {commute.station?.stationName ?? '정류장 선택'}
          </TextButton>
        </Link>
      </div>
      <div className="mt-8 px-4">
        <h2 className="mb-2 text-body2">버스 번호</h2>
        <TextButton
          disabled={!commute.station}
          onClick={handleOpenClick}
          className={tw(
            'relative h-12 w-full rounded-lg border border-Gray-300 bg-White text-left text-body2 text-Gray-400',
            !commute.routes.map((r) => r.routeName).join(', ')
              ? ''
              : 'text-Black'
          )}
        >
          {commute.routes.map((r) => r.routeName).join(', ') ?? '버스 선택'}
        </TextButton>
      </div>
      <StatusButton
        disabled={!commute.routes.length}
        className="fixed bottom-8 left-4 w-[calc(100%-32px)] px-4"
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
              <List.Title>{commute.station?.stationName}</List.Title>
              <List.Icon icon={ChevronDownIcon} />
            </List.Item>

            {routes?.map(({ routeName, routeId }) => (
              <List.Item key={routeId} className="relative pl-4">
                <InputContainer className="h-full w-full pl-2 text-body1 text-Primary-700">
                  <InputContainer.Label>
                    {routeName}
                    <InputContainer.Label.Input
                      onChange={() => {
                        handleRouteCheckChange(
                          { routeName, routeId },
                          !commute.routes.find((r) => r.routeId === routeId)
                        );
                      }}
                      type="checkbox"
                      className="hidden"
                      checked={
                        !commute.routes.find((r) => r.routeId === routeId)
                      }
                    />
                    <List.Icon
                      className={tw(
                        'absolute top-6 right-4 h-7 w-7',
                        !commute.routes.find((r) => r.routeId === routeId)
                          ? 'bg-White fill-White stroke-Gray-300'
                          : 'bg-White fill-Primary-700'
                      )}
                      icon={
                        !commute.routes.find((r) => r.routeId === routeId)
                          ? PlusCircleIcon
                          : CheckCircleIcon
                      }
                    />
                  </InputContainer.Label>
                </InputContainer>
              </List.Item>
            ))}
          </List>
          <StatusButton
            onClick={handleRoutesConfirmClick}
            disabled={!commute.routes.length}
            className="fixed left-4 bottom-8 w-[calc(100%-32px)]"
          >
            확인
          </StatusButton>
        </BaseModal.Content>
        <BaseModal.DimBg
          onClick={handleCloseClick}
          className={tw(isModalOpen ? '' : 'hidden')}
        />
      </BaseModal>
    </div>
  );
}
