import { render, screen } from '@testing-library/react';
import App from './App';

test('Deve possuir o texto de cadastro', () => {
  render(<App />);
  const input = screen.getByText('Don\'t have an account?');
  expect(input).toBeInTheDocument();
});

test('Deve possuir o link para registro', () => {
  render(<App />);
  const input = screen.getByText('Register');
  expect(input).toBeInTheDocument();
});
