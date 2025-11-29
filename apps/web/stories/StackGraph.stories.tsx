import type { Meta, StoryObj } from '@storybook/react';
import StackGraph from '../components/StackGraph';

const meta: Meta<typeof StackGraph> = {
    title: 'Components/StackGraph',
    component: StackGraph,
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof StackGraph>;

export const Default: Story = {};

export const Dark: Story = {
    parameters: {
        backgrounds: {
            default: 'dark',
        },
    },
};

