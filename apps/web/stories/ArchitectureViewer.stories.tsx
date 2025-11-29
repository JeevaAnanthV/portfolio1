import type { Meta, StoryObj } from '@storybook/react';
import ArchitectureViewerClient from '../components/ArchitectureViewerClient';

const meta: Meta<typeof ArchitectureViewerClient> = {
    title: 'Components/ArchitectureViewer',
    component: ArchitectureViewerClient,
};

export default meta;
type Story = StoryObj<typeof ArchitectureViewerClient>;

// Mock fetch for Storybook
// In a real setup we might use MSW, but for simple stories we can rely on the component handling fetch errors gracefully
// or mock it globally. For now, let's assume the story might fail to load data unless we mock fetch in the story decorator.
// However, since we can't easily inject a decorator here without config, we'll just export the component.
// A better approach for the story is to modify the component to accept data as a prop OR url.
// But sticking to the interface:

export const Default: Story = {
    args: {
        url: '/content/projects/knitibot/architecture.json',
    },
};
