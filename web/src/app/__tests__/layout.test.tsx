import React from 'react';
import RootLayout from '../layout';

// Mock the Inter and JetBrains_Mono fonts
jest.mock('next/font/google', () => ({
  Inter: () => ({
    variable: '--font-sans',
    className: 'font-sans',
  }),
  JetBrains_Mono: () => ({
    variable: '--font-mono',
    className: 'font-mono',
  }),
}));

describe('RootLayout Component', () => {
  it('should be importable and defined', () => {
    expect(RootLayout).toBeDefined();
    expect(typeof RootLayout).toBe('function');
  });

  it('should accept children prop', () => {
    // Component signature check
    const component = RootLayout({
      children: <div>Test</div>,
    });
    expect(component).toBeTruthy();
  });
});
