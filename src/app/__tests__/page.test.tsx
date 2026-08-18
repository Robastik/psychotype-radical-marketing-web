import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home Page Component', () => {
  describe('Header Section', () => {
    it('renders the eyeCARD logo', () => {
      render(<Home />);
      const logo = screen.getByAltText('eyeCARD Logo');
      expect(logo).toBeInTheDocument();
    });

    it('renders the eyeCARD brand name', () => {
      render(<Home />);
      const brandElements = screen.getAllByText('eyeCARD');
      expect(brandElements.length).toBeGreaterThan(0);
      expect(brandElements[0]).toBeInTheDocument();
    });

    it('renders navigation menu with all links', () => {
      render(<Home />);
      const methodologyLinks = screen.queryAllByText('Методология');
      const offertaLinks = screen.queryAllByText('Оферта');
      const privacyLinks = screen.queryAllByText('Конфиденциальность');
      
      expect(methodologyLinks.length).toBeGreaterThan(0);
      expect(offertaLinks.length).toBeGreaterThan(0);
      expect(privacyLinks.length).toBeGreaterThan(0);
    });

    it('navigation links have correct hrefs', () => {
      render(<Home />);
      const allLinks = screen.getAllByRole('link');
      
      // Find navigation links by their href
      const methodologyLink = allLinks.find(link => link.getAttribute('href') === '/methodology');
      const offertaLink = allLinks.find(link => link.getAttribute('href') === '/terms');
      const privacyLink = allLinks.find(link => link.getAttribute('href') === '/privacy');

      expect(methodologyLink).toBeInTheDocument();
      expect(offertaLink).toBeInTheDocument();
      expect(privacyLink).toBeInTheDocument();
    });
  });

  describe('Hero Section', () => {
    it('renders hero image', () => {
      render(<Home />);
      const heroImage = screen.getByAltText('eyeCARD Neural Deconstruction');
      expect(heroImage).toBeInTheDocument();
    });

    it('displays main headline', () => {
      render(<Home />);
      expect(screen.getByText(/Дешифровка/)).toBeInTheDocument();
      const headlines = screen.getAllByText(/визуального кода/);
      expect(headlines.length).toBeGreaterThan(0);
      expect(headlines[0]).toBeInTheDocument();
    });

    it('displays call-to-action button', () => {
      render(<Home />);
      const buttons = screen.getAllByText('Установить расширение');
      expect(buttons.length).toBeGreaterThan(0);
      expect(buttons[0]).toBeInTheDocument();
    });

    it('CTA button has correct link', () => {
      render(<Home />);
      const buttons = screen.getAllByText('Установить расширение');
      const chromeButton = buttons[0].closest('a');
      expect(chromeButton).toHaveAttribute('href', 'https://chrome.google.com/webstore');
    });
  });

  describe('Methodology Section', () => {
    it('renders methodology title', () => {
      render(<Home />);
      expect(screen.getByText('Научный метод')).toBeInTheDocument();
    });

    it('renders step 1 - ФАКТ', () => {
      render(<Home />);
      expect(screen.getByText('[01]: ФАКТ')).toBeInTheDocument();
    });

    it('displays analysis description', () => {
      render(<Home />);
      expect(screen.getByText(/Расшифровка визуального кода/)).toBeInTheDocument();
    });
  });

  describe('Layout and Structure', () => {
    it('renders as a valid React component', () => {
      const { container } = render(<Home />);
      expect(container).toBeInTheDocument();
    });

    it('has proper semantic HTML structure with header and main', () => {
      const { container } = render(<Home />);
      expect(container.querySelector('header')).toBeInTheDocument();
      expect(container.querySelector('main')).toBeInTheDocument();
    });
  });
});
