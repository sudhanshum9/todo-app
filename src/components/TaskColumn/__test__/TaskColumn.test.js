import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskColumn from '../TaskColumn';

const mockTasks = [
  {
    id: '1',
    name: 'Task 1',
    description: 'Description 1',
    deadline: '2024-10-10',
    favorite: false,
    status: 'todo',
  },
  {
    id: '2',
    name: 'Task 2',
    description: 'Description 2',
    deadline: '2024-10-12',
    favorite: true,
    status: 'todo',
  },
];

describe('TaskColumn Component', () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnFavoriteToggle = jest.fn();
  const mockOnDropTask = jest.fn();
  const mockSetActiveCardId = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders column with title and tasks', () => {
    render(
      <TaskColumn
        title="To Do"
        tasks={mockTasks}
        status="todo"
        onEdit={mockOnEdit}
        onClickDelete={mockOnDelete}
        onFavoriteToggle={mockOnFavoriteToggle}
        onDropTask={mockOnDropTask}
        activeCardId={null}
        setactiveCardId={mockSetActiveCardId}
      />
    );

    // Check title is rendered
    expect(screen.getByText(/To Do/i)).toBeInTheDocument();

    // Check tasks are rendered
    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Task 2/i)).toBeInTheDocument();
  });

  test('calls onDropTask when an item is dropped', () => {
    render(
      <TaskColumn
        title="To Do"
        tasks={mockTasks}
        status="todo"
        onEdit={mockOnEdit}
        onClickDelete={mockOnDelete}
        onFavoriteToggle={mockOnFavoriteToggle}
        onDropTask={mockOnDropTask}
        activeCardId={null}
        setactiveCardId={mockSetActiveCardId}
      />
    );

    // Simulate dropping on first DropArea
    const dropArea = screen.getAllByText(/Drop Area/i)[0];
    fireEvent.drop(dropArea);

    // Ensure the onDropTask is called with the correct status and position
    expect(mockOnDropTask).toHaveBeenCalledWith('todo', 0);
  });

  test('calls onEdit when TaskCard edit button is clicked', () => {
    render(
      <TaskColumn
        title="To Do"
        tasks={mockTasks}
        status="todo"
        onEdit={mockOnEdit}
        onClickDelete={mockOnDelete}
        onFavoriteToggle={mockOnFavoriteToggle}
        onDropTask={mockOnDropTask}
        activeCardId={null}
        setactiveCardId={mockSetActiveCardId}
      />
    );

    // Find the edit button for Task 1
    const editButton = screen.getAllByLabelText('Edit task')[0];
    fireEvent.click(editButton);

    // Ensure onEdit is called with the correct task id
    expect(mockOnEdit).toHaveBeenCalledWith('1');
  });

  test('calls onClickDelete when TaskCard delete button is clicked', () => {
    render(
      <TaskColumn
        title="To Do"
        tasks={mockTasks}
        status="todo"
        onEdit={mockOnEdit}
        onClickDelete={mockOnDelete}
        onFavoriteToggle={mockOnFavoriteToggle}
        onDropTask={mockOnDropTask}
        activeCardId={null}
        setactiveCardId={mockSetActiveCardId}
      />
    );

    // Find the delete button for Task 2
    const deleteButton = screen.getAllByLabelText('Delete task')[1];
    fireEvent.click(deleteButton);

    // Ensure onClickDelete is called with the correct task id
    expect(mockOnDelete).toHaveBeenCalledWith('2');
  });

  test('calls onFavoriteToggle when favorite button is clicked', () => {
    render(
      <TaskColumn
        title="To Do"
        tasks={mockTasks}
        status="todo"
        onEdit={mockOnEdit}
        onClickDelete={mockOnDelete}
        onFavoriteToggle={mockOnFavoriteToggle}
        onDropTask={mockOnDropTask}
        activeCardId={null}
        setactiveCardId={mockSetActiveCardId}
      />
    );

    // Find the favorite button for Task 1
    const favoriteButton = screen.getAllByLabelText('Favorite task')[0];
    fireEvent.click(favoriteButton);

    // Ensure onFavoriteToggle is called with the correct task object
    expect(mockOnFavoriteToggle).toHaveBeenCalledWith(mockTasks[0]);
  });
});
