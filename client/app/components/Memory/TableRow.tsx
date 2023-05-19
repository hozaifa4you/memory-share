import React from "react";
import type { Icon } from "@tabler/icons-react";

interface PropTypes {
  title: string;
  body: string | JSX.Element[];
  icon: Icon;
  iconSize?: number;
  color?: string;
}

const TableRow = ({ body, title, icon, iconSize = 20, color }: PropTypes) => {
  const Icon = icon;

  return (
    <tr>
      <td
        style={{
          border: "none",
          color: "var(--color-dimmed)",
          width: "150px",
        }}
      >
        {title}
      </td>
      <td
        style={{
          border: "none",
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Icon size={iconSize} color={color} />
        {body}
      </td>
    </tr>
  );
};

export default TableRow;
