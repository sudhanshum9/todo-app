import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskModal from '../TaskModal';

describe('TaskModal Component', () => {
  const mockHandleClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal with children when open is true', () => {
    render(
      <TaskModal open={true} handleClose={mockHandleClose}>
        <div>Modal Content</div>
      </TaskModal>
    );

    // Check that modal content is visible
    expect(screen.getByText(/Modal Content/i)).toBeInTheDocument();
  });

  test('does not render modal when open is false', () => {
    render(
      <TaskModal open={false} handleClose={mockHandleClose}>
        <div>Modal Content</div>
      </TaskModal>
    );

    // Modal content should not be in the document when open is false
    expect(screen.queryByText(/Modal Content/i)).not.toBeInTheDocument();
  });
  
  test('renders children correctly inside the modal', () => {
    render(
      <TaskModal open={true} handleClose={mockHandleClose}>
        <h1>Task Modal Header</h1>
        <p>This is a modal description.</p>
      </TaskModal>
    );

    // Check if children elements are rendered
    expect(screen.getByText(/Task Modal Header/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a modal description/i)).toBeInTheDocument();
  });
});
