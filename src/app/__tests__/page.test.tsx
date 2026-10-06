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
      const guideLinks = screen.getAllByText('Методический справочник');
      const termsLinks = screen.getAllByText('Пользовательское соглашение');
      const privacyLinks = screen.getAllByText('Политика конфиденциальности');

      expect(guideLinks.length).toBeGreaterThan(0);
      expect(termsLinks.length).toBeGreaterThan(0);
      expect(privacyLinks.length).toBeGreaterThan(0);
    });

    it('navigation links have correct hrefs', () => {
      render(<Home />);
      const allLinks = screen.getAllByRole('link');

      // Find navigation links by their href
      const guideLink = allLinks.find(link => link.getAttribute('href') === '/guide');
      const termsLink = allLinks.find(link => link.getAttribute('href') === '/terms');
      const privacyLink = allLinks.find(link => link.getAttribute('href') === '/privacy');

      expect(guideLink).toBeInTheDocument();
      expect(termsLink).toBeInTheDocument();
      expect(privacyLink).toBeInTheDocument();
    });
  });

  describe('Hero Section', () => {
    it('renders hero image', () => {
      render(<Home />);
      const heroImage = screen.getByAltText('ИИ-анализ карточек товаров Wildberries Ozon — eyeCARD');
      expect(heroImage).toBeInTheDocument();
    });

    it('displays main headline', () => {
      render(<Home />);
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveTextContent(/ИИ-анализ/);
      expect(h1).toHaveTextContent(/карточек товаров/);
      expect(h1).toHaveTextContent(/Wildberries и Ozon/);
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
      expect(chromeButton).toHaveAttribute('href', 'https://chromewebstore.google.com/detail/eyecard/fdmglgodmnjklcbkdjmnlbphccjcppdp');
    });
  });

  describe('Methodology Section', () => {
    it('renders methodology title', () => {
      render(<Home />);
      expect(screen.getByText(/Научный метод анализа карточек товаров/)).toBeInTheDocument();
    });

    it('renders step 1 - ФАКТ', () => {
      render(<Home />);
      expect(screen.getByText('[01]: ФАКТ')).toBeInTheDocument();
    });

    it('displays analysis description', () => {
      render(<Home />);
      expect(screen.getByText(/Анализ визуальных элементов карточки/)).toBeInTheDocument();
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
