import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Modal } from './Modal';

const meta = {
  component: Modal,
  title: 'Directory/Modal',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
  args: {
    isOpened: true,
  },
} as ComponentMeta<typeof Modal>;

export default meta;

export const Delete: ComponentStory<typeof Modal> = ({ isOpened, ...args }) => (
  <Modal isOpened={isOpened} {...args}>
    <Modal.ModalContainer>
      <Modal.Content className="bg-White">
        이 정류장을 삭제하시겠습니까?
      </Modal.Content>
      <Modal.Buttons>
        <Modal.TextButton className="h-10 w-6/12 rounded-none rounded-bl border-r border-Gray-100 bg-Primary-300">
          삭제
        </Modal.TextButton>
        <Modal.TextButton className="h-10 w-6/12 rounded-none rounded-br bg-Primary-300">
          취소
        </Modal.TextButton>
      </Modal.Buttons>
    </Modal.ModalContainer>
    <Modal.DimBackground />
  </Modal>
);

export const Inquiry: ComponentStory<typeof Modal> = ({
  isOpened,
  ...args
}) => (
  <Modal isOpened={isOpened} {...args}>
    <Modal.ModalContainer>
      <Modal.Content className="flex flex-col bg-White ">
        <p>정상적으로 처리되었습니다.</p>
        <p>감사합니다.</p>
      </Modal.Content>
      <Modal.Buttons>
        <Modal.TextButton className="h-10 w-full rounded-none rounded-br rounded-bl bg-Primary-300">
          확인
        </Modal.TextButton>
      </Modal.Buttons>
    </Modal.ModalContainer>
    <Modal.DimBackground />
  </Modal>
);
