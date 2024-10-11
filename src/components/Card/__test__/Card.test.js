import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskCard from '../Card';

const mockTask = {
  id: '1',
  name: 'Testing Task',
  description: 'This is a test task description',
  deadline: '2024-10-15',
  favorite: true,
  status: 'todo'
};

describe('TaskCard Component', () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnFavoriteToggle = jest.fn();
  const mockSetActiveCardId = jest.fn();

  test('renders task card with correct information', () => {
    render(
      <TaskCard
        task={mockTask}
        onEdit={mockOnEdit}
        onClickDelete={mockOnDelete}
        onFavoriteToggle={mockOnFavoriteToggle}
        activeCardId={null}
        setActiveCardId={mockSetActiveCardId}
      />
    );
    
    expect(screen.getByText(/Test Task/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a test task description/i)).toBeInTheDocument();
    expect(screen.getByText(/Deadline: 2024-10-15/i)).toBeInTheDocument();
  });

  test('handles edit button click', () => {
    render(
      <TaskCard
        task={mockTask}
        onEdit={mockOnEdit}
        onClickDelete={mockOnDelete}
        onFavoriteToggle={mockOnFavoriteToggle}
        activeCardId={null}
        setActiveCardId={mockSetActiveCardId}
      />
    );

    const editButton = screen.getByLabelText('Edit Task');
    fireEvent.click(editButton);
    expect(mockOnEdit).toHaveBeenCalledWith('1');
  });

  test('handles delete button click', () => {
    render(
      <TaskCard
        task={mockTask}
        onEdit={mockOnEdit}
        onClickDelete={mockOnDelete}
        onFavoriteToggle={mockOnFavoriteToggle}
        activeCardId={null}
        setActiveCardId={mockSetActiveCardId}
      />
    );

    const deleteButton = screen.getByLabelText('Delete Task');
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  test('handles favorite button click', () => {
    render(
      <TaskCard
        task={mockTask}
        onEdit={mockOnEdit}
        onClickDelete={mockOnDelete}
        onFavoriteToggle={mockOnFavoriteToggle}
        activeCardId={null}
        setActiveCardId={mockSetActiveCardId}
      />
    );

    const favoriteButton = screen.getByLabelText('Add to favorites');
    fireEvent.click(favoriteButton);
    expect(mockOnFavoriteToggle).toHaveBeenCalledWith('1');
  });
});
