import { render, screen } from '@testing-library/react';
import Markdown_Previewer from './markdown_previewer';

test('renders learn react link', () => {
  render(<Markdown_Previewer />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
