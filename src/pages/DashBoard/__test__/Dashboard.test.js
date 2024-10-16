import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import * as React from "react";
import Dashboard from "../DashBoard";

describe("Dashboard Component", () => {
  beforeEach(() => {
    localStorage.clear(); // Clean up localStorage before each test
  });

  test('adds a new task status when input is provided and "Add Status" is clicked', () => {
    render(<Dashboard />);
    const statusInput = screen.getByRole('textbox', { name: /New Task Status/i });
    const addStatusButton = screen.getByRole('button', { name: /Add Status/i });

    fireEvent.change(statusInput, { target: { value: 'review' } });
    fireEvent.click(addStatusButton);

    const newColumn = screen.getByText(/review/i);
    expect(newColumn).toBeInTheDocument();
  });
  
  test('opens TaskModal when "Add Task" button is clicked', async () => {
      render(<Dashboard />);
      
      // Click the "Add Task" button to open the modal
      const addTaskButton = screen.getByRole('button', { name: /Add Task/i });
      fireEvent.click(addTaskButton);
      
      // Wait for the modal to appear and check for a specific element inside it
      await waitFor(() => {
          const modalHeader = screen.getByRole('heading', { name: /Add New Task/i });
          expect(modalHeader).toBeInTheDocument();
      });
  });
  

  test("loads tasks from localStorage", () => {
    const mockTasks = [
      { id: "1", name: "Task 1", status: "todo", description: "Test task" },
      { id: "2", name: "Task 2", status: "inProgress", description: "Another task" },
    ];
    localStorage.setItem("taskList", JSON.stringify(mockTasks));

    render(<Dashboard />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  test("calls onEdit when editing a task", () => {
    const mockTasks = [{ id: "1", name: "Task 1", status: "todo", description: "Test task" }];
    localStorage.setItem("taskList", JSON.stringify(mockTasks));

    render(<Dashboard />);

    fireEvent.click(screen.getByLabelText(/Edit Task/i));

    expect(screen.getByText(/Edit Task/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Task Name/i)).toHaveValue("Task 1");
  });

});
