import type { Meta, StoryObj } from '@storybook/react';
import HeroCanvas from '../components/HeroCanvas';

const meta: Meta<typeof HeroCanvas> = {
    title: 'Components/HeroCanvas',
    component: HeroCanvas,
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof HeroCanvas>;

export const Default: Story = {};

export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};
