import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ArchitectureViewerClient from '../components/ArchitectureViewerClient';
import '@testing-library/jest-dom';

// Mock fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            slug: 'test-project',
            layers: [
                { id: 'l1', label: 'Layer 1', description: 'Desc 1', tech: ['Tech A'], snippet: 'l1.py' },
                { id: 'l2', label: 'Layer 2', description: 'Desc 2', tech: ['Tech B'], snippet: 'l2.py' }
            ]
        }),
    })
) as jest.Mock;

describe('ArchitectureViewerClient', () => {
    it('fetches data and renders layers', async () => {
        render(<ArchitectureViewerClient url="/mock.json" />);

        await waitFor(() => expect(screen.getByText('Layer 1')).toBeInTheDocument());
        expect(screen.getByText('Desc 1')).toBeInTheDocument();
        expect(screen.getByText('Tech A')).toBeInTheDocument();
    });

    it('toggles active layer', async () => {
        render(<ArchitectureViewerClient url="/mock.json" />);

        await waitFor(() => expect(screen.getByText('Layer 1')).toBeInTheDocument());

        const layer2Btn = screen.getByText('Layer 2').closest('button');
        fireEvent.click(layer2Btn!);

        expect(screen.getByText('Active: Layer 2')).toBeInTheDocument();
    });
});
