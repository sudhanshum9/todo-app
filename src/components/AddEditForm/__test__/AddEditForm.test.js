import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddEditForm from '..';


const mockSetTaskList = jest.fn();
const mockSetOpenModal = jest.fn();
const mockSetCurrentTask = jest.fn();
const mockSetEditMode = jest.fn();

describe('AddEditForm Component', () => {
  const defaultTask = {
    id: '',
    name: '',
    description: '',
    deadline: '',
    favorite: false,
    status: 'todo',
  };

  test('renders form with default values', () => {
    render(
      <AddEditForm
        taskDetails={defaultTask}
        setCurrentTask={mockSetCurrentTask}
        isEditMode={false}
        setEditMode={mockSetEditMode}
        setOpenModal={mockSetOpenModal}
        setTaskList={mockSetTaskList}
      />
    );

    expect(screen.getByPlaceholderText('Task Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Task Description')).toBeInTheDocument();
  });

  test('adds a new task when form is submitted', () => {
    render(
      <AddEditForm
        taskDetails={defaultTask}
        setCurrentTask={mockSetCurrentTask}
        isEditMode={false}
        setEditMode={mockSetEditMode}
        setOpenModal={mockSetOpenModal}
        setTaskList={mockSetTaskList}
      />
    );

    fireEvent.change(screen.getByLabelText(/Task Name/i), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'New Task Description' } });
    fireEvent.change(screen.getByLabelText(/Task Deadline/i), { target: { value: '2024-12-31' } });
    fireEvent.click(screen.getByTestId('add-task-button'));

    expect(mockSetTaskList).toHaveBeenCalledWith(expect.any(Function)); // Verifying list is updated
    expect(mockSetOpenModal).toHaveBeenCalledWith(false); // Modal should close
  });

  test('updates task when form is submitted in edit mode', () => {
    const taskDetails = {
      id: '1',
      name: 'Existing Task',
      description: 'Existing Task Description',
      deadline: '2024-10-10',
      favorite: true,
      status: 'inProgress',
    };

    render(
      <AddEditForm
        taskDetails={taskDetails}
        setCurrentTask={mockSetCurrentTask}
        isEditMode={true}
        setEditMode={mockSetEditMode}
        setOpenModal={mockSetOpenModal}
        setTaskList={mockSetTaskList}
      />
    );

    fireEvent.click(screen.getByTestId('add-task-button'));

    expect(mockSetTaskList).toHaveBeenCalledWith(expect.any(Function)); // Verifying task update
    expect(mockSetOpenModal).toHaveBeenCalledWith(false); // Modal should close
  });
});
