import React from "react";
import { mount } from "enzyme";
import { Checklist } from "./ChecklistClassComponent";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const mockItems = [
  {
    description: "first item",
    completed: false
  },
  {
    description: "second item",
    completed: false
  },
  {
    description: "third item",
    completed: false
  }
];

describe("Checklist Class Component", () => {
  it("should render all 3 list items", () => {
    const wrapper = mount(<Checklist items={mockItems} />);

    expect(wrapper.find("label").length).toBe(3);
  });

  describe("handleChange", () => {
    it("should check two out the three checklist items", () => {
      const wrapper = mount(<Checklist items={mockItems} />);
      const instance = wrapper.instance();

      instance.handleChange(0);
      instance.handleChange(1);

      expect(wrapper.state("checklistItems")).toEqual([
        {
          description: "first item",
          completed: true
        },
        {
          description: "second item",
          completed: true
        },
        {
          description: "third item",
          completed: false
        }
      ]);
    });

    it("should display a message when all items are completed", () => {
      const wrapper = mount(<Checklist items={mockItems} />);
      const instance = wrapper.instance();

      instance.handleChange(0);
      instance.handleChange(1);
      instance.handleChange(2);
      wrapper.update();

      expect(
        wrapper
          .find(".text-green")
          .first()
          .props().visible
      ).toBe(true);
    });
  });
});
