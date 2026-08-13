import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './page';

// Note: This is a basic example test.
// For more comprehensive tests, see the testing documentation.

describe('Home page', () => {
  it('renders the eyeCARD branding', () => {
    render(<Home />);
    const logo = screen.getByAltText('eyeCARD Logo');
    expect(logo).toBeInTheDocument();
  });

  it('contains navigation links', () => {
    render(<Home />);
    expect(screen.getByText('Методология')).toBeInTheDocument();
    expect(screen.getByText('Оферта')).toBeInTheDocument();
    expect(screen.getByText('Конфиденциальность')).toBeInTheDocument();
  });
});
