import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DropArea from '../DropArea';

describe('DropArea Component', () => {

  test('renders correctly and matches snapshot', () => {
    render(<DropArea onDropTask={jest.fn()} />);
    expect(screen.getByText(/Drop Area/i)).toMatchSnapshot();
  });

  test('changes style when drag enters and leaves', () => {
    render(<DropArea onDropTask={jest.fn()} />);
    const dropArea = screen.getByText(/Drop Area/i);
    
    // Initially, the opacity should be 0 and border dashed
    expect(dropArea).toHaveStyle('opacity: 0');
    expect(dropArea).toHaveStyle('border: 1px dashed #dcdcdc');

    // Simulate drag enter
    fireEvent.dragEnter(dropArea);
    expect(dropArea).toHaveStyle('opacity: 1');
    expect(dropArea).toHaveStyle('border: 2px solid #000');
    expect(dropArea).toHaveStyle('background-color: #f0f0f0');

    // Simulate drag leave
    fireEvent.dragLeave(dropArea);
    expect(dropArea).toHaveStyle('opacity: 0');
    expect(dropArea).toHaveStyle('border: 1px dashed #dcdcdc');
  });

  test('calls onDropTask when an item is dropped', () => {
    const onDropTaskMock = jest.fn();
    render(<DropArea onDropTask={onDropTaskMock} />);
    const dropArea = screen.getByText(/Drop Area/i);

    // Simulate dropping an item
    fireEvent.drop(dropArea);
    
    // Check if the onDropTask function was called
    expect(onDropTaskMock).toHaveBeenCalled();
  });

  test('renders with correct accessible attributes', () => {
    render(<DropArea onDropTask={jest.fn()} />);
    const dropArea = screen.getByLabelText(/drop-area-section/i); // Check for aria-label
    
    // Ensure the section has aria-label="Drop Area" for better accessibility
    expect(dropArea).toBeInTheDocument(); // aria-label should now make this pass
  });

});
