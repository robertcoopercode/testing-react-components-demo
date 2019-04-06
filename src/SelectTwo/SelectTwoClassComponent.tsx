import React from "react";
import styled from "styled-components";

interface Item {
  description: string;
  selected: boolean;
}

type SelectTwoProps = {
  items: Array<Item>;
};

type SelectTwoState = {
  selectTwoItems: Array<Item>;
  indexOfLastSelectedItem: number | null;
  displayWarning: boolean;
};

const WarningMessage = styled.p<{ visible: boolean }>`
  visibility: ${props => (props.visible ? "visible" : "hidden")};
`;

export class SelectTwo extends React.Component<SelectTwoProps, SelectTwoState> {
  state = {
    selectTwoItems: this.props.items,
    indexOfLastSelectedItem: null,
    displayWarning: false
  };

  handleChange = (itemIndex: number) => {
    // Make a shallow copy so we don't mutate state directly
    const selectedItem = { ...this.state.selectTwoItems[itemIndex] };
    selectedItem.selected = !selectedItem.selected;
    let newSetOfItems = [
      ...this.state.selectTwoItems.slice(0, itemIndex),
      selectedItem,
      ...this.state.selectTwoItems.slice(itemIndex + 1)
    ];

    // Count how many items are selected
    const numberOfSelectedItems = newSetOfItems.filter(
      ({ selected }) => selected
    ).length;

    // If there are more than 2 items selected, display a warning and mark any items other than the last 2 selected items as unselected
    if (numberOfSelectedItems > 2) {
      this.setState({ displayWarning: true });
      newSetOfItems = newSetOfItems.map((item, index) => {
        if (
          index === itemIndex ||
          index === this.state.indexOfLastSelectedItem
        ) {
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
      this.setState({ displayWarning: false });
    }

    // Set the newly selected set of items in state
    this.setState({ selectTwoItems: newSetOfItems });
    // Store the index of the currently selected item in order to be able to keep track of the last 2 selected items
    this.setState({ indexOfLastSelectedItem: itemIndex });
  };

  render() {
    return (
      <div>
        <form>
          {this.state.selectTwoItems.map((item, index) => (
            <React.Fragment key={item.description}>
              <input
                className="checkbox"
                onChange={() => this.handleChange(index)}
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
          visible={this.state.displayWarning}
        >
          Warning: you can only select 2 items
        </WarningMessage>
      </div>
    );
  }
}
