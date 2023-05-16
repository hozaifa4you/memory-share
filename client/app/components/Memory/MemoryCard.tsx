"use client";
import Link from "next/link";
import {
  createStyles,
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
  rem,
  Box,
} from "@mantine/core";
import { IconHeart, IconBookmark, IconShare } from "@tabler/icons-react";

const backend_origin = process.env.NEXT_PUBLIC_BACKEND_ORIGIN as string;

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  link: {
    textDecoration: "none",
    transition: "all .4s ease-in-out",
    ":hover": {
      textDecoration: "underline",
    },
  },
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.colors.dark[5],
  },
  footer: {
    padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

interface CardProps {
  image: string;
  title: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    username: string;
  };
  category: string;
  slug: string;
  readTime: number;
}

export default function ArticleCardFooter({
  image,
  category,
  title,
  slug,
  author,
  readTime,
}: CardProps) {
  const { classes, theme } = useStyles();

  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <Card.Section mb="sm">
        <Image
          src={`${backend_origin}/public/memory/${image}`}
          alt={title}
          height={180}
        />
      </Card.Section>

      <Badge color="blue">{category}</Badge>

      <Box
        className={classes.link}
        display="block"
        component={Link}
        href={`/memories/read/${slug}`}
      >
        <Text fw={700} className={classes.title} mt="xs" component="h3">
          {title}
        </Text>
      </Box>

      <Group mt="lg">
        <Avatar src={author.avatar} radius="sm" color="pink" />
        <Link
          href={"/users/@username"}
          style={{ display: "block", textDecoration: "none" }}
        >
          <Text fw={500} color="blue">
            {author.name}
          </Text>
          <Text fz="xs" c="dimmed">
            I have 6 memories
          </Text>
        </Link>
      </Group>

      <Card.Section className={classes.footer}>
        <Group position="apart">
          <Text fz="xs" c="dimmed">
            {`${readTime} people watched this`}
          </Text>
          <Group spacing={0}>
            <ActionIcon>
              <IconHeart
                size="1.2rem"
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon>
              <IconBookmark
                size="1.2rem"
                color={theme.colors.yellow[6]}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon>
              <IconShare
                size="1.2rem"
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
