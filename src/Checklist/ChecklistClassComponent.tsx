import React from "react";
import styled from "styled-components";

interface Item {
  description: string;
  completed: boolean;
}

type ChecklistProps = {
  items: Array<Item>;
};

type ChecklistState = {
  checklistItems: Array<Item>;
};

const TasksCompletedMessage = styled.p<{ visible: boolean }>`
  visibility: ${props => (props.visible ? "visible" : "hidden")};
`;

export class Checklist extends React.Component<ChecklistProps, ChecklistState> {
  state = {
    checklistItems: this.props.items
  };

  handleChange = (itemIndex: number) => {
    // Make a shallow copy so we don't mutate state directly
    const toggledItem = { ...this.state.checklistItems[itemIndex] };
    toggledItem.completed = !toggledItem.completed;
    this.setState({
      checklistItems: [
        ...this.state.checklistItems.slice(0, itemIndex),
        toggledItem,
        ...this.state.checklistItems.slice(itemIndex + 1)
      ]
    });
  };

  // Determine if all tasks are completed
  render() {
    const allTasksCompleted = this.state.checklistItems.every(
      ({ completed }) => completed
    );
    return (
      <div>
        <form>
          {this.state.checklistItems.map((item, index) => (
            <React.Fragment key={item.description}>
              <input
                onChange={() => this.handleChange(index)}
                type="checkbox"
                className="checkbox"
                checked={item.completed ? true : false}
                id={item.description}
              />
              <label htmlFor={item.description}>{item.description}</label>
            </React.Fragment>
          ))}
        </form>
        <TasksCompletedMessage
          className="xs-text-4 text-green xs-mt2"
          visible={allTasksCompleted}
        >
          All tasks completed{" "}
          <span role="img" aria-label="checkmark">
            ✅
          </span>
        </TasksCompletedMessage>
      </div>
    );
  }
}
