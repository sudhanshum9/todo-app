import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../DashBoard';
import '@testing-library/jest-dom';

describe('Dashboard Component', () => {
  test('opens the Add Task modal when the Add Task button is clicked', () => {
    render(<Dashboard />);

    // Use getByRole to specifically target the button
    const addButton = screen.getByRole('button', { name: /Add Task/i });
    expect(addButton).toBeInTheDocument();  // Ensure button exists

    // Click the "Add Task" button
    fireEvent.click(addButton);

    // Check if the modal title is shown
    const modalTitle = screen.getByText(/Add task/i);  // Match the modal title accurately
    expect(modalTitle).toBeInTheDocument();
  });
});

test('adds a new task and displays it in the To Do column', () => {
    render(<Dashboard />);
  
    // Open the modal by clicking the Add Task button
    const addButton = screen.getByText(/Add Task/i);
    fireEvent.click(addButton);
  
    // Fill in the task details
    fireEvent.change(screen.getByPlaceholderText('name'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByPlaceholderText('description'), { target: { value: 'New Task Description' } });
    fireEvent.change(screen.getByPlaceholderText('deadline'), { target: { value: '2024-10-21' } });
  
    // Submit the form
    const submitButton = screen.getByTestId('add-task-button');
    fireEvent.click(submitButton);
  
    // Check if the new task appears in the To Do column
    expect(screen.getByText('New Task')).toBeInTheDocument();
    expect(screen.getByText('New Task Description')).toBeInTheDocument();
  });
  