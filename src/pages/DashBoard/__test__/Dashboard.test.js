import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "../Dashboard";
import '@testing-library/jest-dom';
import * as React from "react";

describe("Dashboard Component", () => {
  beforeEach(() => {
    localStorage.clear(); // Clean up localStorage before each test
  });

  test("renders Dashboard with correct columns", () => {
    render(<Dashboard />);

    expect(screen.getByText(/To Do/i)).toBeInTheDocument();
    expect(screen.getByText(/In Progress/i)).toBeInTheDocument();
    expect(screen.getByText(/Done/i)).toBeInTheDocument();
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

  test("opens the Add Task modal when clicking 'Add Task'", () => {
    render(<Dashboard />);

    fireEvent.click(screen.getByText(/Add Task/i));

    expect(screen.getByText(/Add New Task/i)).toBeInTheDocument();
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
