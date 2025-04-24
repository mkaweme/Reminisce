import React from "react";
import { render } from "@testing-library/react-native";
import Index from "./app/index";

describe("Index screen", () => {
  it("has 1 child", () => {
    const { toJSON } = render(<Index />);
    const tree = toJSON();
    if (Array.isArray(tree)) {
      fail("Expected tree to be a single object");
    } else {
      expect(tree?.children?.length).toBe(1);
    }
  });

  it("Renders correctly", () => {
    const { toJSON } = render(<Index />);
    expect(toJSON()).toMatchSnapshot();
  });
});
