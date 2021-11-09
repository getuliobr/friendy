import { render, screen } from '@testing-library/react';
import App from './App';

test('Deve possuir o texto de cadastro', () => {
  render(<App />);
  const input = screen.getByText('Não possui uma conta ?');
  expect(input).toBeInTheDocument();
});

test('Deve possuir o texto para registro', () => {
  render(<App />);
  const input = screen.getByText('Cadastrar-se');
  expect(input).toBeInTheDocument();
});