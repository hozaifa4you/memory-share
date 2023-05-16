/* eslint-disable indent */
"use client";
import { GetStaticProps } from "next";
import {
  Grid,
  Container,
  Stack,
  Pagination,
  Box,
  Title,
  Loader,
} from "@mantine/core";
import { QueryClient, useQuery, dehydrate } from "react-query";

import { MemoryCard2, SideMenu } from "@/app/components";
import { allMemories } from "@/api-config/API";
import { selectLogin } from "@/redux/slices/authSlices";
import { useAppSelector } from "@/redux/hooks";

const Memories = () => {
  const { token } = useAppSelector(selectLogin) as { token: string };
  const { data } = useQuery({
    queryKey: ["memories", token],
    queryFn: async () => await allMemories(token),
  });

  return (
    <main style={{ marginTop: "50px", marginBottom: "100px" }}>
      <Container size="xl">
        <Box sx={{ width: "100%" }}>
          <Title pb={15}>Present Memories</Title>
          <Box
            sx={{
              width: "145px",
              height: "4px",
              background: "var(--fix-pink)",
              marginBottom: "20px",
            }}
          />
        </Box>
        <Grid>
          <Grid.Col sm={4} md={3}>
            <SideMenu />
          </Grid.Col>
          <Grid.Col sm={8} md={9}>
            <Grid>
              {data?.length ? (
                data.map((memory) => (
                  <Grid.Col sm={4} key={memory.id}>
                    <MemoryCard2
                      author={memory.user}
                      comments={memory.comments?.length}
                      image={memory.images[0]}
                      slug={memory.slug}
                      title={memory.title}
                      views={memory.readTime || 0}
                    />
                  </Grid.Col>
                ))
              ) : (
                <Stack
                  align="center"
                  justify="center"
                  sx={{ width: "100%", height: "100px" }}
                >
                  <Loader color="pink" size="xl" />
                </Stack>
              )}

              <Grid.Col>
                <Stack align="center" mt={25}>
                  <Pagination total={10} color="pink" withEdges size="md" />
                </Stack>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
};

export default Memories;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["memories"], () => allMemories("token"));

  return { props: { dehydratedState: dehydrate(queryClient) } };
};
