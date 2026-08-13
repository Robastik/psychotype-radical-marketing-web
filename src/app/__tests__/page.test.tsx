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

    it('displays version badge', () => {
      render(<Home />);
      expect(screen.getByText('v19.4_RELEASE')).toBeInTheDocument();
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
      expect(screen.getByText(/визуального кода/)).toBeInTheDocument();
    });

    it('displays call-to-action buttons', () => {
      render(<Home />);
      expect(screen.getByText('Установить расширение')).toBeInTheDocument();
      expect(screen.getByText('Анализ в Telegram')).toBeInTheDocument();
    });

    it('CTA buttons have correct links', () => {
      render(<Home />);
      const chromeButton = screen.getByText('Установить расширение').closest('a');
      const telegramButton = screen.getByText('Анализ в Telegram').closest('a');

      expect(chromeButton).toHaveAttribute('href', 'https://chrome.google.com/webstore');
      expect(telegramButton).toHaveAttribute('href', 'https://t.me/your_eyecard_bot');
    });
  });

  describe('Methodology Section', () => {
    it('renders methodology title', () => {
      render(<Home />);
      expect(screen.getByText('Научный метод анализа eyeCARD')).toBeInTheDocument();
    });

    it('displays pipeline architecture label', () => {
      render(<Home />);
      expect(screen.getByText('PIPELINE_ARCHITECTURE_V3')).toBeInTheDocument();
    });

    it('renders step 1 - ФАКТ', () => {
      render(<Home />);
      expect(screen.getByText(/\[01\]: ФАКТ/)).toBeInTheDocument();
    });

    it('displays analysis description', () => {
      render(<Home />);
      expect(screen.getByText(/Деконструкция кода/)).toBeInTheDocument();
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
