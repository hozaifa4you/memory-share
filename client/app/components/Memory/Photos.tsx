"use client";
import { Grid, Image, createStyles } from "@mantine/core";

const backend_origin = process.env.NEXT_PUBLIC_BACKEND_ORIGIN as string;

interface PropTypes {
  images?: string[];
}

const useStyles = createStyles(() => ({
  imageWrap: {
    height: "450px",
    width: "100%",
  },
  image: {
    height: "100%",
  },
}));

const Photos = ({ images }: PropTypes) => {
  const { classes } = useStyles();

  return (
    <Grid my={25} gutter={5} justify="center">
      {images?.map((image, i) => (
        <Grid.Col
          xs={images.length > 4 && i === 2 ? 4 : 2}
          className={classes.imageWrap}
          key={i}
        >
          <Image
            src={`${backend_origin}/public/memory/${image}`}
            alt="main image"
            height="450px"
          />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default Photos;
