import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { Task } from "./Task";

export default {
  title: "Task",
  component: Task,
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = () => <Task />;

export const Default: ComponentStory<typeof Task> = Template.bind({});

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const input = await canvas.findByTestId("input");
  const view = await canvas.findByTestId("view");

  userEvent.type(input, "hoge");

  expect(view.innerText).toBe("hoge");
};
