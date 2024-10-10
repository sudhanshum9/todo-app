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
        setactiveCardId={mockSetActiveCardId}
      />
    );
    
    expect(screen.getByText(/Test Task/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a test task description/i)).toBeInTheDocument();
    expect(screen.getByText(/Deadline: 2024-10-15/i)).toBeInTheDocument();
  });


  test('handles drag start and end correctly', () => {
    render(
      <TaskCard
        task={mockTask}
        onEdit={mockOnEdit}
        onClickDelete={mockOnDelete}
        onFavoriteToggle={mockOnFavoriteToggle}
        activeCardId={1}
        setactiveCardId={mockSetActiveCardId}
      />
    );

    // Use a more accessible query to find the card's container
    const card = screen.getByRole('article'); // Assuming your Card has a role like 'article' or 'button'

    // Simulate drag start
    fireEvent.dragStart(card);
    expect(mockSetActiveCardId).toHaveBeenCalledWith('1');

    // Simulate drag end
    fireEvent.dragEnd(card);
    expect(mockSetActiveCardId).toHaveBeenCalledWith('1');
  });

  test('handles edit button click', () => {
    render(
      <TaskCard
        task={mockTask}
        onEdit={mockOnEdit}
        onClickDelete={mockOnDelete}
        onFavoriteToggle={mockOnFavoriteToggle}
        activeCardId={null}
        setactiveCardId={mockSetActiveCardId}
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
        setactiveCardId={mockSetActiveCardId}
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
        setactiveCardId={mockSetActiveCardId}
      />
    );

    const favoriteButton = screen.getByLabelText('Add to favorites');
    fireEvent.click(favoriteButton);
    expect(mockOnFavoriteToggle).toHaveBeenCalledWith('1');
  });
});
