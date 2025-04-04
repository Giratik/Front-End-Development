import { render, screen } from '@testing-library/react';
import Drum_Machine from './drum_machine';

test('renders learn react link', () => {
  render(<Drum_Machine />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
