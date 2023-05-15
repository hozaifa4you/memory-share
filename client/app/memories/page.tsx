"use client";
import React from "react";
import { Grid, Container, Stack, Pagination, Box, Title } from "@mantine/core";

import { MemoryCard, SideMenu } from "@/app/components";
import { theme } from "@/utils/theme";

const cardData = {
  image: "https://i.imgur.com/Cij5vdL.png",
  link: "https://mantine.dev/",
  title: "Resident Evil Village review",
  rating: "outstanding",
  description:
    "Resident Evil Village is a direct sequel to 2017’s Resident Evil 7, but takes a very different direction to its predecessor, namely the fact that this time round instead of fighting against various mutated zombies, you’re now dealing with more occult enemies like werewolves and vampires.",
  author: {
    name: "Bill Wormeater",
    image:
      "https://images.unsplash.com/photo-1593229874334-90d965f27c42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  },
};

const Memories = () => {
  return (
    <main style={{ marginTop: "50px", marginBottom: "100px" }}>
      <Container size="xl">
        <Box sx={{ width: "100%" }}>
          <Title pb={15}>Present Memories</Title>
          <Box
            sx={{
              width: "145px",
              height: "4px",
              background: "#FF00A1",
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
              <Grid.Col sm={4}>
                <MemoryCard
                  author={cardData.author}
                  description={cardData.description}
                  image={cardData.image}
                  link={cardData.link}
                  rating={cardData.rating}
                  title={cardData.title}
                  // about={cardData.}
                />
              </Grid.Col>
              <Grid.Col sm={4}>
                <MemoryCard
                  author={cardData.author}
                  description={cardData.description}
                  image={cardData.image}
                  link={cardData.link}
                  rating={cardData.rating}
                  title={cardData.title}
                  // about={cardData.}
                />
              </Grid.Col>
              <Grid.Col sm={4}>
                <MemoryCard
                  author={cardData.author}
                  description={cardData.description}
                  image={cardData.image}
                  link={cardData.link}
                  rating={cardData.rating}
                  title={cardData.title}
                  // about={cardData.}
                />
              </Grid.Col>
              <Grid.Col sm={4}>
                <MemoryCard
                  author={cardData.author}
                  description={cardData.description}
                  image={cardData.image}
                  link={cardData.link}
                  rating={cardData.rating}
                  title={cardData.title}
                  // about={cardData.}
                />
              </Grid.Col>
              <Grid.Col sm={4}>
                <MemoryCard
                  author={cardData.author}
                  description={cardData.description}
                  image={cardData.image}
                  link={cardData.link}
                  rating={cardData.rating}
                  title={cardData.title}
                  // about={cardData.}
                />
              </Grid.Col>
              <Grid.Col sm={4}>
                <MemoryCard
                  author={cardData.author}
                  description={cardData.description}
                  image={cardData.image}
                  link={cardData.link}
                  rating={cardData.rating}
                  title={cardData.title}
                  // about={cardData.}
                />
              </Grid.Col>
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
