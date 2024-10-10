import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import Header from '../Header';

// describe('Header Component', () => {
//   test('Addes the Add Element in the screen', () => {
//     render(<Header title='Test Title' subtitle='Test SubTitle'/>)
//     // const headerTitleElement = screen.getByText(/Test Title/i);
//     // const headerSubTitleElement = screen.getByText(/Test SubTitle/i);
//     const headerSubTitleElement = screen.getByRole('heading');


//     // expect(headerTitleElement).toBeInTheDocument()
//     expect(headerSubTitleElement).toBeInTheDocument()

//   });
// });

describe('Header Component', () => {
  test('renders the title and subtitle in the header', () => {
    // Render the Header component with test props
    render(<Header title="Test Title" subtitle="Test SubTitle" />);

    // Get both the h2 and h5 elements by their role and content
    const headerTitleElement = screen.getByRole('heading', { level: 2, name: /Test Title/i });
    const headerSubTitleElement = screen.getByRole('heading', { level: 5, name: /Test SubTitle/i });

    // Assert that both the title and subtitle are in the document
    expect(headerTitleElement).toBeInTheDocument();
    expect(headerSubTitleElement).toBeInTheDocument();
  });
});