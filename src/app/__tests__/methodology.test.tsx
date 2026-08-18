import React from 'react';
import { render } from '@testing-library/react';
import Methodology from '../methodology/page';

describe('Methodology Page', () => {
  it('renders the page without crashing', () => {
    const { container } = render(<Methodology />);
    expect(container).toBeInTheDocument();
  });

  it('contains page content', () => {
    const { container } = render(<Methodology />);
    const text = container.textContent;
    expect(text).toBeTruthy();
    expect(text!.length).toBeGreaterThan(0);
  });

  it('has valid HTML structure', () => {
    const { container } = render(<Methodology />);
    // Check if container has children
    expect(container.firstChild).toBeTruthy();
  });

  it('contains Russian content', () => {
    const { container } = render(<Methodology />);
    const text = container.textContent;
    // Check for Russian characters
    expect(text).toMatch(/[а-яё]/i);
  });
});
