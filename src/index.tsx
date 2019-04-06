import "bf-solid/_lib/solid.scss";
import React from "react";
import styled from "styled-components";
import { Checklist as ChecklistClassComponent } from "./Checklist/ChecklistClassComponent";
import { Checklist as ChecklistFunctionalComponent } from "./Checklist/ChecklistFunctionalComponent";
import { SelectTwo as SelectTwoClassComponent } from "./SelectTwo/SelectTwoClassComponent";
import { SelectTwo as SelectTwoFunctionalComponent } from "./SelectTwo/SelectTwoFunctionalComponent";
import { render } from "react-dom";

const AppWrapper = styled.div`
  width: 800px;
  margin: auto;
  padding: 80px 0;
  max-width: 100%;
`;

const Title = styled.h1``;

const Section = styled.div`
  margin: 40px 0;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const SectionDescription = styled.p`
  margin-bottom: 20px;
`;

const checklistItemsFunctionalComponent = [
  {
    description: "task 1 (functional component)",
    completed: false
  },
  {
    description: "task 2 (functional component)",
    completed: false
  }
];

const checklistItemsClassComponent = [
  {
    description: "task 1 (class component)",
    completed: false
  },
  {
    description: "task 2 (class component)",
    completed: false
  }
];

const selectTwoItemsFunctionalComponent = [
  {
    description: "one (functional component)",
    selected: false
  },
  {
    description: "two (functional component)",
    selected: false
  },
  {
    description: "three (functional component)",
    selected: false
  }
];

const selectTwoItemsClassComponent = [
  {
    description: "one (class component)",
    selected: false
  },
  {
    description: "two (class component)",
    selected: false
  },
  {
    description: "three (class component)",
    selected: false
  }
];

const App = () => (
  <AppWrapper>
    <Title>Testing Functional Components vs Class Components</Title>
    <Section className="card xs-p2">
      <SectionTitle>Checklist - Functional Component</SectionTitle>
      <SectionDescription>
        Check all items in the checklist and see an success message.
      </SectionDescription>
      <ChecklistFunctionalComponent items={checklistItemsFunctionalComponent} />
    </Section>
    <Section className="card xs-p2">
      <SectionTitle>Checklist - Class Component</SectionTitle>
      <SectionDescription>
        Check all items in the checklist and see an success message.
      </SectionDescription>
      <ChecklistClassComponent items={checklistItemsClassComponent} />
    </Section>

    <Section className="card xs-p2">
      <SectionTitle>Select Two - Functional Component</SectionTitle>
      <SectionDescription>
        Select two items from the list and receive a warning if you try to
        select more than 2 items.
      </SectionDescription>
      <SelectTwoFunctionalComponent items={selectTwoItemsFunctionalComponent} />
    </Section>

    <Section className="card xs-p2">
      <SectionTitle>Select Two - Class Component</SectionTitle>
      <SectionDescription>
        Select two items from the list and receive a warning if you try to
        select more than 2 items.
      </SectionDescription>
      <SelectTwoClassComponent items={selectTwoItemsClassComponent} />
    </Section>
  </AppWrapper>
);

const rootElement = document.getElementById("root");
render(<App />, rootElement);
