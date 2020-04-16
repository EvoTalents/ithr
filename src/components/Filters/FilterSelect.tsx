import * as React from "react";
import Select from "react-select";

type Option<T> = { label: string; value: T };

interface Props<Value extends string> {
  options: Option<Value>[];
  value: Value[];
  onChange: (data: Value[]) => void;
  placeholder?: React.ReactNode;
}

export const FilterSelect = <T extends string>({
  options,
  value,
  onChange,
  placeholder,
}: Props<T>) => (
  <Select<Option<T>>
    options={options}
    isMulti
    placeholder={placeholder}
    value={options.filter((t) => value.includes(t.value))}
    onChange={(data) => {
      console.log("data", data);

      onChange((((data || []) as any) as Option<T>[]).map((c) => c.value));
    }}
  />
);
