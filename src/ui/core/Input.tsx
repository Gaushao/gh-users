import { useCallback } from "react";

export interface CoreInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onChangeValue?: (v: string) => void;
}

/**
 * @param props
 */
export default function Input({ onChangeValue, ...props }: CoreInputProps) {
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
