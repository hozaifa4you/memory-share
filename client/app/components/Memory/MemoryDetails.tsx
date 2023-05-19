"use client";
import React from "react";
import {
  Container,
  Title,
  Text,
  Box,
  Flex,
  Stack,
  Loader,
  Alert,
  ActionIcon,
} from "@mantine/core";
import { useQuery } from "react-query";

import {
  MemoryDetailsTable,
  ProfileCard,
  MemoryPhotos,
} from "@/app/components";
import { memoryDetails, type GeneralError } from "@/api-config/API";
import { useAppSelector } from "@/redux/hooks";
import { selectLogin } from "@/redux/slices/authSlices";
import {
  IconAlertCircle,
  IconEdit,
  IconHeart,
  IconPlus,
} from "@tabler/icons-react";
import moment from "moment";

interface PropTypes {
  slug: string;
}

const MemoryDetails = ({ slug }: PropTypes) => {
  const { token } = useAppSelector(selectLogin);
  const { data, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ["memory-details", slug, "token"],
    queryFn: async () => await memoryDetails(slug, token),
  });

  const errors = error as GeneralError;

  if (isFetching && isLoading) {
    return (
      <Container my={50}>
        <Stack align="center" justify="center">
          <Loader size="xl" variant="bars" />
        </Stack>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container my={50}>
        <Stack align="center" justify="center">
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Bummer!"
            color="red"
          >
            {errors.response.data.message}
          </Alert>
        </Stack>
      </Container>
    );
  }

  return (
    <>
      <Container my={20} size="xl">
        <Title align="center" fw={500}>
          A Photo Gallery of The Memory
        </Title>
        <Text align="center" mt={10} size="xl" color="dimmed" component="p">
          The Nature is Beautiful <br /> find your favorite picture around the
          world.
        </Text>

        {/*TODO: Memory Photos */}
        <MemoryPhotos images={data?.images} />
      </Container>
      <Container mt={35}>
        <Box px={50}>
          <Title fw={500} order={2}>
            {data?.title}
          </Title>
        </Box>
        <Flex mb={15} mt={25} justify="space-between">
          <ProfileCard
            image={data?.user.avatar || ""}
            name={data?.user?.name}
            username={data?.user.username}
          />
          <div>
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <ActionIcon variant="outline">
                <IconHeart size={20} color="red" />
              </ActionIcon>
              <ActionIcon variant="outline">
                <IconPlus size={20} color="green" />
              </ActionIcon>
              <ActionIcon variant="outline">
                <IconEdit size={20} color="indigo" />
              </ActionIcon>
            </div>

            <Flex gap={4}>
              <Text fz="sm" color="indigo" align="right" component="p">
                {data?.category}
              </Text>
              <p>&bull;</p>
              <Text fz="sm" color="dimmed" align="right" component="p">
                21 Apr 2023, 10:32PM
              </Text>
            </Flex>
          </div>
        </Flex>
        <Text
          component="p"
          sx={{
            backgroundColor: "rgba(34, 51, 84, 0.02)",
            paddingLeft: 40,
            paddingRight: 40,
            paddingTop: 10,
            paddingBottom: 30,
            marginLeft: 30,
            marginRight: 30,
            borderRadius: "10px",
          }}
        >
          {data?.body}
        </Text>

        <Box
          mx={30}
          my={20}
          bg="#F8F9FA"
          style={{
            paddingLeft: 40,
            paddingRight: 40,
            paddingTop: 10,
            paddingBottom: 30,

            borderRadius: "10px",
          }}
        >
          {data && (
            <MemoryDetailsTable
              address={`${data.place?.state}, ${data.place?.city}, ${data.place?.state}, ${data.place?.country}; Zip: ${data.place?.zip}`}
              category={data.category}
              createAt={moment(data.createdAt).format(
                "MMMM Do YYYY, h:mm:ss A"
              )}
              updatedAt={moment(data.updatedAt).format(
                "MMMM Do YYYY, h:mm:ss A"
              )}
              likes={data.likes?.length || 0}
              readTime={data?.readTime || 0}
              saved={data.saved?.length || 0}
              tags={data.tags}
              type={data.memoryType}
            />
          )}
        </Box>
      </Container>
    </>
  );
};

export default MemoryDetails;
