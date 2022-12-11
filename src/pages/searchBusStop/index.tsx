import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, InputContainer } from '@/components';
import { tw } from '@/utils/tailwindMerge';
import { Modal } from '@/components/Modal';

type SearchBusStopProps<T extends React.ElementType> = Component<T>;

export default function SearchBusStop({
  className,
  ...restProps
}: SearchBusStopProps<'div'>) {
  const [showTip, setShowTip] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
        <div
          className="mt-9 ml-4"
          aria-hidden="true"
          onClick={() => setIsOpen(true)}
        >
          <p className="ml-2">기흥여객차고지</p>
          <p className="ml-2 text-Gray-400">50095 | 종점방면</p>
        </div>
      )}
      <Modal isOpened={isOpen} className="absolute top-0">
        <Modal.ModalContainer>
          <Modal.Content className="flex w-full flex-col">
            <div className="">
              <p className="ml-2">기흥여객차고지</p>
              <p className="ml-2 text-Gray-400">50095 | 종점방면</p>
            </div>
            <div className="">
              <p className="ml-2">기흥여객차고지</p>
              <p className="ml-2 text-Gray-400">50095 | 종점방면</p>
            </div>
          </Modal.Content>
          <Modal.ButtonContainer>
            <Link to="/commute" className="w-full">
              <Modal.Button onClick={() => setIsOpen(false)}>확인</Modal.Button>
            </Link>
          </Modal.ButtonContainer>
        </Modal.ModalContainer>
        <Modal.DimBackground />
      </Modal>
    </div>
  );
}
