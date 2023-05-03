import { useState } from "react";

interface Props extends React.HTMLProps<HTMLHeadingElement> {
  text: string;
  onEditDone: (value: string) => unknown;
}

const EditableH1 = ({ text, onEditDone, onDoubleClick, ...props }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(text);

  return (
    <>
      {isEditing ? (
        <div className="flex w-full overflow-x-hidden">
          <input
            className={props.className + " flex-1 text-2xl"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onSubmit={() => {
              onEditDone(value);
              setIsEditing(false);
            }}
          />
          <button
            onClick={() => {
              onEditDone(value);
              setIsEditing(false);
            }}
          >
            Done
          </button>
        </div>
      ) : (
        <h1
          {...props}
          onDoubleClick={(e) => {
            setIsEditing(true);
            if (onDoubleClick) onDoubleClick(e);
          }}
        >
          {text}
        </h1>
      )}
    </>
  );
};

export default EditableH1;
