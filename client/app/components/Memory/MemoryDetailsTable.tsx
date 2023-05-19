"use client";
import { Chip, Table, useMantineTheme } from "@mantine/core";
import {
  IconArrowsJoin2,
  IconCalendarStar,
  IconCategory2,
  IconCurrentLocation,
  IconEdit,
  IconEyeCheck,
  IconHearts,
  IconStatusChange,
  IconTags,
} from "@tabler/icons-react";

import { TableRow } from "@/app/components";

interface PropTypes {
  createAt: string;
  updatedAt: string;
  likes: number;
  saved: number;
  readTime: number;
  category: string;
  type: string;
  tags: string[];
  address: string;
}

export default function MemoryDetailsTable({
  address,
  category,
  createAt,
  likes,
  readTime,
  saved,
  tags,
  type,
  updatedAt,
}: PropTypes) {
  const theme = useMantineTheme();

  const rows = (
    <>
      <TableRow
        body={createAt}
        title="Date"
        icon={IconCalendarStar}
        color={theme.colors.pink[6]}
      />
      <TableRow
        color={theme.colors.blue[6]}
        body={updatedAt}
        title="Edit Date"
        icon={IconEdit}
      />
      <TableRow
        color={theme.colors.cyan[6]}
        body={`${likes} People likes`}
        title="Likes"
        icon={IconHearts}
      />
      <TableRow
        color={theme.colors.grape[6]}
        body={`${saved} People Interested`}
        title="Interested"
        icon={IconArrowsJoin2}
      />
      <TableRow
        color={theme.colors.green[6]}
        body={`${readTime} People read`}
        title="Read"
        icon={IconEyeCheck}
      />
      <TableRow
        color={theme.colors.indigo[6]}
        body={category}
        title="Category"
        icon={IconCategory2}
      />
      <TableRow
        color={theme.colors.lime[6]}
        body="Public"
        title={type}
        icon={IconStatusChange}
      />
      <TableRow
        color={theme.colors.teal[6]}
        body={tags.map((t) => (
          <>
            <Chip size="sm" checked={false}>
              #{t.toLowerCase()}
            </Chip>
          </>
        ))}
        title="Tags"
        icon={IconTags}
      />
      <TableRow
        color={theme.colors.yellow[6]}
        body={address}
        title="Place Location"
        icon={IconCurrentLocation}
      />
    </>
  );

  return (
    <Table horizontalSpacing="xl">
      <thead>
        <tr>
          <td>Details</td>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
