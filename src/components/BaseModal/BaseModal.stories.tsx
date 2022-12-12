import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { BaseModal } from './BaseModal';

const meta = {
  component: BaseModal,
  title: 'Components/BaseModal',
  parameters: {
    design: {
      type: 'figma',
      url: 'figmaURL',
    },
  },
} as ComponentMeta<typeof BaseModal>;

export default meta;

export const Default: ComponentStory<typeof BaseModal> = (args) => (
  <BaseModal {...args}>
    <BaseModal.Content
      className="bottom-0 h-[620px] w-full rounded-t-2xl bg-White
    "
    >
      <div>qweqweqw</div>
    </BaseModal.Content>
    <BaseModal.DimBg />
  </BaseModal>
);
