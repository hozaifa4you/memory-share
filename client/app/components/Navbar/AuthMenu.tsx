"use client";
import { useState } from "react";
import {
  Menu,
  UnstyledButton,
  Group,
  Avatar,
  Text,
  createStyles,
  rem,
} from "@mantine/core";
import {
  IconLogout,
  IconMessage,
  IconSettings,
  IconStar,
  IconTrash,
  IconChevronDown,
  IconHeart,
  IconPassword,
  IconBrand4chan,
  IconBrandBlogger,
  IconUserCheck,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { selectLogin, logout } from "@/redux/slices/authSlices";

const useStyles = createStyles((theme) => ({
  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
}));

const AuthMenu = () => {
  const { classes, theme, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { user } = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
        >
          <Group spacing={7}>
            <Avatar
              radius="md"
              src={user?.avatar && user.avatar}
              size="md"
              color="indigo"
            />
            <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
              {user?.name}
            </Text>
            <IconChevronDown size={rem(12)} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          icon={
            <IconHeart size="0.9rem" color={theme.colors.red[6]} stroke={1.5} />
          }
        >
          Liked posts
        </Menu.Item>
        <Menu.Item
          icon={
            <IconStar
              size="0.9rem"
              color={theme.colors.yellow[6]}
              stroke={1.5}
            />
          }
        >
          Saved posts
        </Menu.Item>
        <Menu.Item
          icon={
            <IconMessage
              size="0.9rem"
              color={theme.colors.blue[6]}
              stroke={1.5}
            />
          }
        >
          Your comments
        </Menu.Item>
        <Menu.Item
          icon={
            <IconBrand4chan
              size="0.9rem"
              color={theme.colors.pink[6]}
              stroke={1.5}
            />
          }
          onClick={() => router.push("/memories/create")}
        >
          Create Memory
        </Menu.Item>
        <Menu.Item
          icon={
            <IconBrandBlogger
              size="0.9rem"
              color={theme.colors.indigo[6]}
              stroke={1.5}
            />
          }
          onClick={() => ""}
        >
          My Memories
        </Menu.Item>

        <Menu.Label>Settings</Menu.Label>
        <Menu.Item icon={<IconUserCheck size="0.9rem" stroke={1.5} />}>
          Account Profile
        </Menu.Item>
        <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
          Account settings
        </Menu.Item>
        <Menu.Item icon={<IconPassword size="0.9rem" stroke={1.5} />}>
          Change Password
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>

        <Menu.Item color="red" icon={<IconTrash size="0.9rem" stroke={1.5} />}>
          Delete account
        </Menu.Item>
        <Menu.Item
          icon={<IconLogout size="0.9rem" stroke={1.5} />}
          onClick={() => dispatch(logout())}
          color="orange"
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AuthMenu;
