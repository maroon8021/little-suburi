import { ChangeEvent, useState } from "react";

export const Task = () => {
  const [text, setText] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <div className="task-input">
        <div>
          <label>入力: </label>
        </div>
        <div>
          <input data-testid="input" type="text" onChange={onChange} />
        </div>
      </div>
      <p data-testid="view">{text}</p>
    </div>
  );
};
