import React, { useState } from "react";
import styled from "styled-components";

interface Item {
  description: string;
  completed: boolean;
}

type ChecklistProps = {
  items: Array<Item>;
};

const TasksCompletedMessage = styled.p<{ visible: boolean }>`
  visibility: ${props => (props.visible ? "visible" : "hidden")};
`;

export const Checklist = ({ items }: ChecklistProps) => {
  const [checklistItems, setChecklistItems] = useState(items);

  const handleClick = (itemIndex: number) => {
    // Make a shallow copy so we don't mutate state directly
    const toggledItem = { ...checklistItems[itemIndex] };
    toggledItem.completed = !toggledItem.completed;
    setChecklistItems([
      ...checklistItems.slice(0, itemIndex),
      toggledItem,
      ...checklistItems.slice(itemIndex + 1)
    ]);
  };

  // Determine if all tasks are completed
  const allTasksCompleted = checklistItems.every(({ completed }) => completed);

  return (
    <div>
      <form>
        {checklistItems.map((item, index) => (
          <React.Fragment key={item.description}>
            <input
              onChange={() => handleClick(index)}
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
};
