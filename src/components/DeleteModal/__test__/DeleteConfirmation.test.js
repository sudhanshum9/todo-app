import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DeleteConfirmationModal from '../DeleteConfirmation';

describe('DeleteConfirmationModal', () => {
  test('renders correctly when open', () => {
    render(
      <DeleteConfirmationModal
        open={true}
        onDeleteConfirm={jest.fn()}
        handleDeleteClose={jest.fn()}
      />
    );
    
    // Check if the modal content is displayed when open
    expect(screen.getByRole('heading', {selector: 'h6'})).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Confirm Deletion/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel Deletion/i })).toBeInTheDocument();
  });

  test('calls onDeleteConfirm when Confirm is clicked', () => {
    const mockDeleteConfirm = jest.fn();
    render(
      <DeleteConfirmationModal
        open={true}
        onDeleteConfirm={mockDeleteConfirm}
        handleDeleteClose={jest.fn()}
      />
    );
    
    const confirmButton = screen.getByRole('button', { name: /Confirm Deletion/i });
    fireEvent.click(confirmButton);
    
    expect(mockDeleteConfirm).toHaveBeenCalled();
  });

  test('calls handleDeleteClose when Cancel is clicked', () => {
    const mockHandleClose = jest.fn();
    render(
      <DeleteConfirmationModal
        open={true}
        onDeleteConfirm={jest.fn()}
        handleDeleteClose={mockHandleClose}
      />
    );
    
    const cancelButton = screen.getByRole('button', { name: /Cancel Deletion/i });
    fireEvent.click(cancelButton);
    
    expect(mockHandleClose).toHaveBeenCalled();
  });

  test('is accessible with correct aria attributes', () => {
    render(
      <DeleteConfirmationModal
        open={true}
        onDeleteConfirm={jest.fn()}
        handleDeleteClose={jest.fn()}
      />
    );
    
    // Check that aria attributes are present for accessibility
    const modalTitle = screen.getByRole('heading', {selector: 'h6'});

    expect(modalTitle).toHaveAttribute('id', 'delete-task-modal-title');
    expect(modalTitle).toBeInTheDocument();
  });
});