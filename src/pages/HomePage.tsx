import React from "react";
import {
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
  Container,
} from "@chakra-ui/react";
import GlobeImage from "../assets/Globe Image.svg";

const HomePage: React.FC = () => {
  return (
  <>
      <Container maxW="container.xl" centerContent p={4}>
        <Grid
          templateColumns={{ sm: "1fr", md: "repeat(3, 1fr)"}}
          gap={6}
          px={{ sm: 2, md: 16 }}
          py={10}
          alignItems="center"
          justifyContent="center"
        >
          {/* Text and heading */}
          <GridItem colSpan={{ md: 2 }} w="85%">
            <Heading as="h1" size="lg" mb={4}>
              Welcome to the GDSC Admin Page
            </Heading>
            <Text fontSize="lg" mb={4}>
              Here you will find places to update the main website!
            </Text>
          </GridItem>

          {/* Globe image */}
          <GridItem
            colSpan={{ md: 1 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src={GlobeImage}
              alt="Globe"
              boxSize={{ base: "300px", md: "300px", lg: "300px", xl: "300px" }}
            />{" "}
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
