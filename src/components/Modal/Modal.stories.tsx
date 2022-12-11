import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Modal } from './Modal';

const meta = {
  component: Modal,
  title: 'Components/Modal',
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
      <Modal.Content>이 정류장을 삭제하시겠습니까?</Modal.Content>
      <Modal.ButtonContainer>
        <Modal.Button className="br-0 border-Gray-100">삭제</Modal.Button>
        <Modal.Button>취소</Modal.Button>
      </Modal.ButtonContainer>
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
      <Modal.Content className="flex flex-col">
        <p>정상적으로 처리되었습니다.</p>
        <p>감사합니다.</p>
      </Modal.Content>
      <Modal.ButtonContainer>
        <Modal.Button>확인</Modal.Button>
      </Modal.ButtonContainer>
    </Modal.ModalContainer>
    <Modal.DimBackground />
  </Modal>
);
