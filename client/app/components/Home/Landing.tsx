"use client";
import { useRouter } from "next/navigation";
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

import image from "/public/images/memory.svg";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,
    width: "400px",

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
  },
}));

export default function Landing() {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <div>
      <Container size="xl">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Share Your <span className={classes.highlight}>Memory</span>
              <br /> through the world.
            </Title>
            <Text color="dimmed" mt="md">
              Share your outstanding memories with thousand of people through
              globe. Or read thousand of created memory with us. Make comment,
              like and share any memory.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck size={rem(12)} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Type based Memory</b> – Lots of public memories you can read
                and create.
              </List.Item>
              <List.Item>
                <b>Create, Read, Update and Delete</b> – Anytime you can create
                any types of memory and perform actions.
              </List.Item>
              <List.Item>
                <b>Like, Comment, Save and Share</b> – You have right to like,
                comment, share and save any type based memories.
              </List.Item>
            </List>

            <Group mt={30}>
              <Button
                onClick={() => router.push("/memories")}
                radius="md"
                size="md"
                className={classes.control}
              >
                Get started
              </Button>
              <Button
                onClick={() => router.push("/memories/create")}
                variant="default"
                radius="md"
                size="md"
                className={classes.control}
              >
                Create One
              </Button>
            </Group>
          </div>
          <Image src={image.src} className={classes.image} alt="Landing" />
        </div>
      </Container>
    </div>
  );
}
