import { MessageModal } from '@/components';
import { tw } from '@/utils/tailwindMerge';

type ConfirmModalProps<T extends React.ElementType> = {
  onDeleteClick: () => void;
  onCancelClick: () => void;
} & Component<T>;

export function ConfirmModal({
  children,
  className,
  onDeleteClick: handleDeleteClick,
  onCancelClick: handleCancelClick,
  ...restProps
}: ConfirmModalProps<'div'>) {
  return (
    <MessageModal className={tw('', className)} {...restProps}>
      <MessageModal.ModalContainer>
        <MessageModal.Content>
          이 정류장을 삭제하시겠습니까?
        </MessageModal.Content>
        <MessageModal.ButtonContainer>
          <MessageModal.Button
            className="br-0 border-Gray-100"
            onClick={handleDeleteClick}
          >
            삭제
          </MessageModal.Button>
          <MessageModal.Button onClick={handleCancelClick}>
            취소
          </MessageModal.Button>
        </MessageModal.ButtonContainer>
      </MessageModal.ModalContainer>
      <MessageModal.DimBackground onClick={handleCancelClick} />
    </MessageModal>
  );
}
