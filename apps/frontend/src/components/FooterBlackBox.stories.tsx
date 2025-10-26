import type { Meta, StoryObj } from '@storybook/react';
import FooterBlackBox from './FooterBlackBox';

const meta: Meta<typeof FooterBlackBox> = {
  title: 'Components/FooterBlackBox',
  component: FooterBlackBox,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof FooterBlackBox>;

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Print: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    media: 'print',
  },
};