import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { MessageModal } from './MessageModal';

const meta = {
  component: MessageModal,
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
} as ComponentMeta<typeof MessageModal>;

export default meta;

export const Delete: ComponentStory<typeof MessageModal> = ({ ...args }) => (
  <MessageModal {...args}>
    <MessageModal.ModalContainer>
      <MessageModal.Content>이 정류장을 삭제하시겠습니까?</MessageModal.Content>
      <MessageModal.ButtonContainer>
        <MessageModal.Button className="br-0 border-Gray-100">
          삭제
        </MessageModal.Button>
        <MessageModal.Button>취소</MessageModal.Button>
      </MessageModal.ButtonContainer>
    </MessageModal.ModalContainer>
    <MessageModal.DimBackground />
  </MessageModal>
);

export const Inquiry: ComponentStory<typeof MessageModal> = ({ ...args }) => (
  <MessageModal {...args}>
    <MessageModal.ModalContainer>
      <MessageModal.Content className="flex flex-col">
        <p>정상적으로 처리되었습니다.</p>
        <p>감사합니다.</p>
      </MessageModal.Content>
      <MessageModal.ButtonContainer>
        <MessageModal.Button>확인</MessageModal.Button>
      </MessageModal.ButtonContainer>
    </MessageModal.ModalContainer>
    <MessageModal.DimBackground />
  </MessageModal>
);
