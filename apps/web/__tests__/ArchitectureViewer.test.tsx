import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ArchitectureViewer from '../components/ArchitectureViewer';
import '@testing-library/jest-dom';

// Mock next/dynamic
jest.mock('next/dynamic', () => () => {
    const DynamicComponent = (props: any) => <div data-testid="arch-viewer-client" data-url={props.url}>Mocked Client</div>;
    return DynamicComponent;
});

describe('ArchitectureViewer', () => {
    it('renders wrapper without crashing', () => {
        render(<ArchitectureViewer url="/content/projects/knitibot/architecture.json" />);
        expect(screen.getByTestId('arch-viewer-client')).toBeInTheDocument();
        expect(screen.getByTestId('arch-viewer-client')).toHaveAttribute('data-url', '/content/projects/knitibot/architecture.json');
    });
});
