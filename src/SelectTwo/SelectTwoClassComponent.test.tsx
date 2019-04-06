import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import React from "react";
import { SelectTwo } from "./SelectTwoClassComponent";
import { mount } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

const mockItems = [
  {
    description: "first item",
    selected: false
  },
  {
    description: "second item",
    selected: false
  },
  {
    description: "third item",
    selected: false
  }
];

describe("Select Two Class Component", () => {
  // Test out that all the list items render based on the props we pass (and target those items through element selectors)
  it("should render all list items", () => {
    const wrapper = mount(<SelectTwo items={mockItems} />);
    expect(wrapper.find("label").length).toBe(3);
  });

  // Test out the handleChange method
  describe("handleChange", () => {
    it("should mark the first checklist item as selected after calling handleChange for the index of the first item", () => {
      const wrapper = mount(<SelectTwo items={mockItems} />);
      const instance = wrapper.instance();

      instance.handleChange(0);

      expect(wrapper.state("selectTwoItems")).toEqual([
        {
          description: "first item",
          selected: true
        },
        {
          description: "second item",
          selected: false
        },
        {
          description: "third item",
          selected: false
        }
      ]);
    });

    it("should mark the first two checklist items as selected after calling handleChange for the index of the first two items", () => {
      const wrapper = mount(<SelectTwo items={mockItems} />);
      const instance = wrapper.instance();

      instance.handleChange(0);
      instance.handleChange(1);

      expect(wrapper.state("selectTwoItems")).toEqual([
        {
          description: "first item",
          selected: true
        },
        {
          description: "second item",
          selected: true
        },
        {
          description: "third item",
          selected: false
        }
      ]);
    });

    it("should mark the last two checklist items as selected after calling handleChange for the index of each checklist item", () => {
      const wrapper = mount(<SelectTwo items={mockItems} />);
      const instance = wrapper.instance();

      instance.handleChange(0);
      instance.handleChange(1);
      instance.handleChange(2);

      expect(wrapper.state("selectTwoItems")).toEqual([
        {
          description: "first item",
          selected: false
        },
        {
          description: "second item",
          selected: true
        },
        {
          description: "third item",
          selected: true
        }
      ]);
    });

    it("should display a warning after calling handleChange for 3 different indexes", () => {
      const wrapper = mount(<SelectTwo items={mockItems} />);
      const instance = wrapper.instance();

      instance.handleChange(0);
      instance.handleChange(1);
      instance.handleChange(2);

      expect(wrapper.state("displayWarning")).toBe(true);
    });
  });
});
