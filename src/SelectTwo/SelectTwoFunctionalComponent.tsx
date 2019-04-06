import React, { useState } from "react";
import styled from "styled-components";

interface Item {
  description: string;
  selected: boolean;
}

type SelectTwoProps = {
  items: Array<Item>;
};

const WarningMessage = styled.p<{ visible: boolean }>`
  visibility: ${props => (props.visible ? "visible" : "hidden")};
`;

export const SelectTwo = ({ items }: SelectTwoProps) => {
  const [selectTwoItems, setSelectTwoItems] = useState(items);
  const [indexOfLastSelectedItem, setIndexOfLastSelectedItem] = useState();
  const [displayWarning, setDisplayWarning] = useState(false);

  const handleChange = (itemIndex: number) => {
    // Make a shallow copy so we don't mutate state directly
    const selectedItem = { ...selectTwoItems[itemIndex] };
    selectedItem.selected = !selectedItem.selected;
    let newSetOfItems = [
      ...selectTwoItems.slice(0, itemIndex),
      selectedItem,
      ...selectTwoItems.slice(itemIndex + 1)
    ];

    // Count how many items are selected
    const numberOfSelectedItems = newSetOfItems.filter(
      ({ selected }) => selected
    ).length;

    // If there are more than 2 items selected, display a warning and mark any items other than the last 2 selected items as unselected
    if (numberOfSelectedItems > 2) {
      setDisplayWarning(true);
      newSetOfItems = newSetOfItems.map((item, index) => {
        if (index === itemIndex || index === indexOfLastSelectedItem) {
          return item;
        } else {
          return {
            description: item.description,
            selected: false
          };
        }
      });
    } else {
      // Don't show a warning if the user did not try to select more than 2 items
      setDisplayWarning(false);
    }

    // Set the newly selected set of items in state
    setSelectTwoItems(newSetOfItems);
    // Store the index of the currently selected item in order to be able to keep track of the last 2 selected items
    setIndexOfLastSelectedItem(itemIndex);
  };

  return (
    <div>
      <form>
        {selectTwoItems.map((item, index) => (
          <React.Fragment key={item.description}>
            <input
              className="checkbox"
              onChange={() => handleChange(index)}
              type="checkbox"
              checked={item.selected ? true : false}
              id={item.description}
            />
            <label htmlFor={item.description}>{item.description}</label>
          </React.Fragment>
        ))}
      </form>
      <WarningMessage
        className="xs-text-4 text-orange xs-mt2"
        visible={displayWarning}
      >
        Warning: you can only select 2 items
      </WarningMessage>
    </div>
  );
};
