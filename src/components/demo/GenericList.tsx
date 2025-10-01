import React from "react";

type GenericListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
};

export function GenericList<T>({ items, renderItem }: GenericListProps<T>) {
  return (
    <ul>
      {items.map((item, idx) => (
        <li key={idx}>{renderItem(item, idx)}</li>
      ))}
    </ul>
  );
}
