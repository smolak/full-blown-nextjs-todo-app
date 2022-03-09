import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { Todo, TodoProps } from "./todo";
import userEvent from "@testing-library/user-event";
import { taskDone, taskNotDone, tasks } from "../fixtures/tasks.fixture";

const defaultProps: TodoProps = {
  onFormSubmit: () => Promise.resolve(taskDone),
  tasks,
  onTaskClick: () => Promise.resolve(taskDone),
};
const getInputField = () => screen.getByPlaceholderText("What do you have to do?");
const getSubmitButton = () => screen.getByRole("button", { name: /add/i });

describe("Todo", () => {
  describe("form", () => {
    it("should have empty input field initially", () => {
      render(<Todo {...defaultProps} />);

      const inputField = getInputField();

      expect(inputField).toHaveValue("");
    });

    it("should have input field focused by default", () => {
      render(<Todo {...defaultProps} />);

      expect(getInputField()).toHaveFocus();
    });

    describe("when a task is typed and 'enter' is pressed", () => {
      it("should submit a task", () => {
        const props = {
          ...defaultProps,
          onFormSubmit: jest.fn(),
        };
        render(<Todo {...props} />);

        userEvent.type(getInputField(), "First task{enter}");

        expect(props.onFormSubmit).toHaveBeenCalledWith("First task");
      });

      it("should clear the form", async () => {
        render(<Todo {...defaultProps} />);

        userEvent.type(getInputField(), "First task{enter}");

        await waitFor(() => {
          expect(getInputField()).toHaveValue("");
        });
      });

      it("should keep the focus on input field", () => {
        render(<Todo {...defaultProps} />);

        userEvent.type(getInputField(), "First task{enter}");

        expect(getInputField()).toHaveFocus();
      });
    });

    describe("when task is not typed in (empty input field)", () => {
      describe("and is tried to be submitted with 'enter' key", () => {
        it("should not submit it", () => {
          const props = {
            ...defaultProps,
            onFormSubmit: jest.fn(),
          };
          render(<Todo {...props} />);

          userEvent.type(getInputField(), "{enter}");

          expect(props.onFormSubmit).not.toHaveBeenCalled();
        });
      });

      describe("and is tried to be submitted with form's submit button", () => {
        it("should not submit it", () => {
          const props = {
            ...defaultProps,
            onFormSubmit: jest.fn(),
          };
          render(<Todo {...props} />);

          userEvent.click(getSubmitButton());

          expect(props.onFormSubmit).not.toHaveBeenCalled();
        });
      });
    });

    describe("when a task is typed and form is submitted using the form's submit button", () => {
      it("should submit a task", () => {
        const props = {
          ...defaultProps,
          onFormSubmit: jest.fn(),
        };
        render(<Todo {...props} />);

        userEvent.type(getInputField(), "First task");
        userEvent.click(getSubmitButton());

        expect(props.onFormSubmit).toHaveBeenCalledWith("First task");
      });

      it("should clear the form", async () => {
        render(<Todo {...defaultProps} />);

        userEvent.type(getInputField(), "First task");
        userEvent.click(getSubmitButton());

        await waitFor(() => {
          expect(getInputField()).toHaveValue("");
        });
      });

      it("should keep the focus on input field", async () => {
        render(<Todo {...defaultProps} />);

        userEvent.type(getInputField(), "First task");
        userEvent.click(getSubmitButton());

        await waitFor(() => {
          expect(getInputField()).toHaveFocus();
        });
      });
    });
  });

  describe("list", () => {
    it("should be empty if no tasks are passed", () => {
      const props = {
        ...defaultProps,
        tasks: [],
      };
      render(<Todo {...props} />);

      expect(screen.getByRole("list")).toBeInTheDocument();
      expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });

    it("should render tasks if passed", () => {
      const props = {
        ...defaultProps,
        tasks,
      };
      render(<Todo {...props} />);

      expect(screen.getByRole("list")).toBeInTheDocument();
      expect(screen.queryAllByRole("listitem")).toHaveLength(props.tasks.length);
    });

    it("should render not done tasks with checkbox not checked", () => {
      const props = {
        ...defaultProps,
        tasks: [taskNotDone],
      };
      const taskNotDoneId = props.tasks[0].id;

      render(<Todo {...props} />);
      const checkboxOfTaskNotDone = screen.getByTestId(taskNotDoneId).querySelector('input[type="checkbox"]');

      expect(checkboxOfTaskNotDone).not.toBeChecked();
    });

    it("should render done tasks with checkbox checked", () => {
      const props = {
        ...defaultProps,
        tasks: [taskDone],
      };
      const taskDoneId = props.tasks[0].id;

      render(<Todo {...props} />);
      const checkboxOfTaskDone = screen.getByTestId(taskDoneId).querySelector('input[type="checkbox"]');

      expect(checkboxOfTaskDone).toBeChecked();
    });

    describe("when task is clicked", () => {
      it("should call onTaskClick callback with task's ID", () => {
        const props = {
          ...defaultProps,
          tasks,
          onTaskClick: jest.fn(),
        };
        const taskIdToToggle = props.tasks[0].id;
        render(<Todo {...props} />);
        const taskToToggle = screen.getByTestId(taskIdToToggle);

        fireEvent.click(taskToToggle);

        expect(props.onTaskClick).toHaveBeenCalledWith(taskIdToToggle);
      });
    });
  });
});
