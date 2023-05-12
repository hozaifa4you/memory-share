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
  IconPlayerPause,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
  IconChevronDown,
  IconHeart,
} from "@tabler/icons-react";

import { useAppSelector, useAppDispatch } from "@/redux/hooks/hooks";
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

        <Menu.Label>Settings</Menu.Label>
        <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
          Account settings
        </Menu.Item>
        <Menu.Item icon={<IconSwitchHorizontal size="0.9rem" stroke={1.5} />}>
          Change account
        </Menu.Item>
        <Menu.Item
          icon={<IconLogout size="0.9rem" stroke={1.5} />}
          onClick={() => dispatch(logout())}
        >
          Logout
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<IconPlayerPause size="0.9rem" stroke={1.5} />}>
          Pause subscription
        </Menu.Item>
        <Menu.Item color="red" icon={<IconTrash size="0.9rem" stroke={1.5} />}>
          Delete account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AuthMenu;
