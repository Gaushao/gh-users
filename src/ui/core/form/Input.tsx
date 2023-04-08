import { useCallback } from "react";

type OnChange = (v: string) => void;

function useOnChange(onChangeValue?: OnChange) {
  return useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const { value } = e.target;
      if (onChangeValue) onChangeValue(value);
    },
    [onChangeValue]
  );
}

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onChangeValue?: OnChange;
}

export default function Input({ onChangeValue, ...props }: InputProps) {
  return (
    <input
      className="p-1 rounded-md bg-slate-200"
      onChange={useOnChange(onChangeValue)}
      {...props}
    />
  );
}

Input.Props = class Props implements InputProps {};
