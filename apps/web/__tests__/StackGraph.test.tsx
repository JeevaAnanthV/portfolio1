import { render, screen } from '@testing-library/react';
import StackGraph from '../components/StackGraph';

jest.mock('../components/StackGraphClient', () => {
    return function MockStackGraphClient() {
        return <div data-testid="stack-graph-client">StackGraph Client</div>;
    };
});

describe('StackGraph', () => {
    it('renders the StackGraph component', () => {
        render(<StackGraph />);
        expect(screen.getByTestId('stack-graph-client')).toBeInTheDocument();
    });
});

