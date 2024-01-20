import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

test('nome, email, password e pulsante sono definiti in pagina', () => {
  render(<App />);

  const name = screen.getByTestId('name')
  const email = screen.getByTestId('email')
  const password = screen.getByTestId('password')
  const signupBtn = screen.getByTestId('signupBtn')

  expect(name).toBeInTheDocument()
  expect(email).toBeInTheDocument()
  expect(password).toBeInTheDocument()
  expect(signupBtn).toBeInTheDocument()
});

test('mostra gli errori se non vengono compilati i campi', async () => {
  render(<App />)

  const signupBtn = screen.getByTestId('signupBtn')

  userEvent.click(signupBtn)

  await waitFor(() => {
    expect(screen.getByTestId('error-name')).toHaveTextContent('This field is required')
  })

  await waitFor(() => {
    expect(screen.getByTestId('error-email')).toHaveTextContent('This field is required')
  })

  await waitFor(() => {
    expect(screen.getByTestId('error-password')).toHaveTextContent('This field is required')
  })
})

test('restituisce errore se email non valida', async () => {
  render(<App />)

  const email = screen.getByTestId('email')

  userEvent.type(email, 'pippo')

  await waitFor(() => {
    expect(screen.getByTestId('error-email')).toHaveTextContent('The value must be an email')
  })
})

test('viene mostrata la pagina di benvenuti', async () => {
  render(<App />)

  const name = screen.getByTestId('name')
  const email = screen.getByTestId('email')
  const password = screen.getByTestId('password')
  const signupBtn = screen.getByTestId('signupBtn')

  userEvent.type(name, 'pippo')
  userEvent.type(email, 'pippo@email.com')
  userEvent.type(password, 'password123')

  userEvent.click(signupBtn)

  await waitFor(() => {
    expect(screen.getByText('Welcome!')).not.toBeVisible()
  }, { timeout: 2000 })
})