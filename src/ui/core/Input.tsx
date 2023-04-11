import { useCallback } from "react";

type OnChange = (v: string) => void;

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onChangeValue?: OnChange;
}

export default function Input({ onChangeValue, ...props }: InputProps) {
  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (onChangeValue) onChangeValue(value);
    },
    [onChangeValue]
  );
  return (
    <input
      className="p-1 rounded-md bg-slate-200"
      onChange={onChange}
      {...props}
    />
  );
}
Input.onChangeValue = (s: string) => {};
