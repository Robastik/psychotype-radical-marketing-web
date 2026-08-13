import React from 'react';
import { render } from '@testing-library/react';
import Privacy from '../privacy/page';
import Terms from '../terms/page';

describe('Privacy Page', () => {
  it('renders without crashing', () => {
    const { container } = render(<Privacy />);
    expect(container).toBeInTheDocument();
  });

  it('displays content', () => {
    const { container } = render(<Privacy />);
    const text = container.textContent;
    expect(text).toBeTruthy();
  });
});

describe('Terms Page', () => {
  it('renders without crashing', () => {
    const { container } = render(<Terms />);
    expect(container).toBeInTheDocument();
  });

  it('displays content', () => {
    const { container } = render(<Terms />);
    const text = container.textContent;
    expect(text).toBeTruthy();
  });
});
