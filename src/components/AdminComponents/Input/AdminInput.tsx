import React from "react";

interface AdminInputProps {
  type: string;
  title: string;
  name: string;
  value: any;
  placeholder: string;
  readonly?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdminInput: React.FC<AdminInputProps> = ({
  title,
  name,
  value,
  placeholder,
  onChange,
  type,
  readonly = false,
}) => {
  return (
    <div className="flex flex-col items-start gap-2 flex-1 self-strech flex-grow">
      <span className="text-sm font-medium leading-5">{title}</span>
      <div className="flex px-4 py-2 items-center gap-[2.5rem] self-stretch bg-gray-50 rounded-lg border-1 border-solid border-gray-300 outline-none">
        <input
          min={0}
          readOnly={readonly}
          type={type}
          name={name}
          class="bg-gray-50 flex flex-1 text-sm font-normal leading-5 outline-none focus-outline-none focus-border-none focus-outline border-transparent focus:border-transparent focus:ring-0 p-0"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onKeyPress={(e) => {
            if (e.key === "-" && type === "number") {
              e.preventDefault();
            }
          }}
        ></input>
      </div>
    </div>
  );
};

export default AdminInput;
