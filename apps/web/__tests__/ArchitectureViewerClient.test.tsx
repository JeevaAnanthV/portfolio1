import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ArchitectureViewerClient from '../components/ArchitectureViewerClient';

const mockJson = {
  slug: 'test-project',
  layers: [
    { id: 'l1', label: 'Layer 1', description: 'Desc 1', snippet: 'l1.py', tech: ['Tech A'] },
    { id: 'l2', label: 'Layer 2', description: 'Desc 2', snippet: 'l2.py', tech: ['Tech B'] }
  ],
};

beforeEach(() => {
  // mock fetch for architecture json and snippet files
  global.fetch = jest.fn((url) => {
    if (url.endsWith('architecture.json')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockJson),
      });
    }
    if (url.endsWith('repro/snippets/l1.py')) {
      return Promise.resolve({ ok: true, text: () => Promise.resolve('# l1 snippet') });
    }
    if (url.endsWith('repro/snippets/l2.py')) {
      return Promise.resolve({ ok: true, text: () => Promise.resolve('# l2 snippet') });
    }
    return Promise.resolve({ ok: true, text: () => Promise.resolve('') });
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

test('fetches data and renders layers', async () => {
  render(<ArchitectureViewerClient url="/mock/architecture.json" />);

  // Wait for system layers header to be present
  await screen.findByRole('heading', { name: /System Layers/i });

  // Now find the first layer button by accessible name (title)
  const layer1Btn = screen.getByRole('button', { name: /Layer 1/i });
  expect(layer1Btn).toBeInTheDocument();
  expect(screen.getByText('Desc 1')).toBeInTheDocument();
  expect(screen.getByText('Tech A')).toBeInTheDocument();
});

test('toggles active layer', async () => {
  render(<ArchitectureViewerClient url="/mock/architecture.json" />);

  const layer1Btn = await screen.findByRole('button', { name: /Layer 1/i });

  // click layer 2
  const layer2Btn = screen.getByRole('button', { name: /Layer 2/i });
  fireEvent.click(layer2Btn);

  // assert that snippet filename is shown in code pane
  await waitFor(() => expect(screen.getByText(/\.(py|tsx|sql|ts)$/)).toBeInTheDocument());
});
