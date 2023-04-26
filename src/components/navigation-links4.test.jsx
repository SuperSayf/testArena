import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavigationLinks from './navigation-links4';

describe('NavigationLinks', () => {
  it('should render navigation links with correct text', () => {
    const props = {
      text: 'Link 1',
      text1: 'Link 2',
      text2: 'Link 3',
      text3: 'Link 4',
      text4: 'Link 5',
    };
    const { getByText } = render(<NavigationLinks {...props} />);
    expect(getByText('Link 1')).toBeInTheDocument();
    expect(getByText('Link 2')).toBeInTheDocument();
    expect(getByText('Link 3')).toBeInTheDocument();
    expect(getByText('Link 4')).toBeInTheDocument();
    expect(getByText('Link 5')).toBeInTheDocument();
  });

  test('renders NavigationLinks component without crashing', () => {
    render(<NavigationLinks />);
  });
  
  test('renders NavigationLinks component with all props passed in', () => {
    const props = {
      rootClassName: 'test-class',
      text: 'Text',
      text1: 'Text1',
      text2: 'Text2',
      text3: 'Text3',
      text4: 'Text4',
    };
  
    render(<NavigationLinks {...props} />);
  });
  
  test('renders NavigationLinks component with only required props passed in', () => {
    const props = {
      text: 'Text',
    };
  
    render(<NavigationLinks {...props} />);
  });
  
  test('renders NavigationLinks component with default props when no props are passed in', () => {
    render(<NavigationLinks />);
  });
  
  test('renders NavigationLinks component with rootClassName prop applied correctly', () => {
    const props = {
      rootClassName: 'test-class',
    };
  
    const { container } = render(<NavigationLinks {...props} />);
    expect(container.firstChild).toHaveClass('test-class');
  });

});


