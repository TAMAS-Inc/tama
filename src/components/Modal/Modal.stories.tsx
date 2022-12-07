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
} as ComponentMeta<typeof Modal>;

export default meta;

export const Default: ComponentStory<typeof Modal> = (args) => (
  <Modal className="w-[278px] rounded" {...args}>
    <Modal.Content className="flex h-[120px] items-center justify-center rounded-tl rounded-tr text-center text-body2">
      이 정류장을 삭제하시겠습니까?
    </Modal.Content>
    <Modal.Buttons>
      <Modal.TextButton className="h-10 w-6/12 rounded-none rounded-bl border-r border-Gray-100 bg-Primary-300 text-body3 font-bold">
        삭제
      </Modal.TextButton>
      <Modal.TextButton className="h-10 w-6/12 rounded-none rounded-br bg-Primary-300 text-body3 font-bold">
        취소
      </Modal.TextButton>
    </Modal.Buttons>
  </Modal>
);
