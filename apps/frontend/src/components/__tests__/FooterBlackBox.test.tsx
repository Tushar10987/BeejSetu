import { render, screen } from '@testing-library/react';
import FooterBlackBox from './FooterBlackBox';

describe('FooterBlackBox', () => {
  it('renders with correct role and aria-label', () => {
    render(<FooterBlackBox />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveAttribute('aria-label', 'Site footer');
  });

  it('contains all required sections', () => {
    render(<FooterBlackBox />);
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Stay Updated')).toBeInTheDocument();
  });

  it('has newsletter subscription form', () => {
    render(<FooterBlackBox />);
    expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });

  it('has visitor metrics section', () => {
    render(<FooterBlackBox />);
    expect(screen.getByText('Platform Metrics')).toBeInTheDocument();
    expect(screen.getByText("Today's Visitors")).toBeInTheDocument();
    expect(screen.getByText('Monthly Visitors')).toBeInTheDocument();
  });
});