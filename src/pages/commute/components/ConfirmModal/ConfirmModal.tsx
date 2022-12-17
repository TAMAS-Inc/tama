import { MessageModal } from '@/components';
import { useCommutes } from '@/hooks/useCommutes';
import { tw } from '@/utils/tailwindMerge';

type ConfirmModalProps<T extends React.ElementType> = {
  onClose: () => void;
  deleteId: Commute['comId'];
} & Component<T>;

export function ConfirmModal({
  children,
  className,
  onClose: handleClose,
  deleteId,
  ...restProps
}: ConfirmModalProps<'div'>) {
  const { deleteCommute } = useCommutes();

  const handleDeleteClick = () => {
    deleteCommute(deleteId);
    handleClose();
  };

  const handleCancelClick = () => {
    handleClose();
  };

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
