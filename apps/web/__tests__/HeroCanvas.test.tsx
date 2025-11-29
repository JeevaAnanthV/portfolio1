import { render, screen } from '@testing-library/react';
import HeroCanvas from '../components/HeroCanvas';

// Mock next/dynamic
jest.mock('next/dynamic', () => () => {
    const DynamicComponent = () => <div data-testid="hero-canvas-client">Mocked Hero Client</div>;
    return DynamicComponent;
});

// Mock next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => <img {...props} alt={props.alt} />,
}));

describe('HeroCanvas', () => {
    it('renders without crashing', () => {
        render(<HeroCanvas />);
        expect(screen.getByTestId('hero-canvas-client')).toBeInTheDocument();
    });

    it('renders fallback image for mobile/no-js', () => {
        render(<HeroCanvas />);
        const fallbackImage = screen.getByAltText('Jeeva Ananth V Portfolio Hero');
        expect(fallbackImage).toBeInTheDocument();
    });

    it('renders monogram', () => {
        render(<HeroCanvas />);
        const monogram = screen.getByAltText('JA Monogram');
        expect(monogram).toBeInTheDocument();
    });
});
