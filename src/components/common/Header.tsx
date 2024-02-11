import {
    Grid,
    GridItem,
    HStack,
    IconButton,
    Image,
    Show,
  } from "@chakra-ui/react";
  import gdscLogo from "../../assets/gdsc-logo.svg";
  import { Link } from "react-router-dom"; // import Link from react-router-dom
  import { Text } from "@chakra-ui/react";
  import { useEffect, useRef, useState } from "react";
  
  const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const headerRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      // Function to prevent scroll whenever the side bar is open
      const preventScroll = () => {
        document.body.style.overflow = "hidden";
        document.body.style.width = "100%";
        document.body.style.position = "fixed";
      };
  
      // Function to allow background scroll
      const allowScroll = () => {
        document.body.style.overflow = "unset";
        document.body.style.width = "unset";
        document.body.style.position = "unset";
      };
  
      // Conditionally determine whether scroll should be enabled
      isSidebarOpen ? preventScroll() : allowScroll();
  
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.clientHeight);
      }
      console.log(headerHeight);
  
      // Clean up function
      return () => allowScroll();
    }, [headerHeight, isSidebarOpen]);
  
    const toggleSideBar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    return (
      <Grid
        ref={headerRef}
        templateColumns={"auto 1fr auto"}
        gap="4"
        px={{ base: 4, lg: 16 }}
        py={{ base: 8, lg: 16 }}
        alignItems="center"
      >
        {/* GDSC home logo */}
        <GridItem>
          <Link to="/Home">
            <Image
              src={gdscLogo}
              alt="GDSC Logo"
              onClick={() => isSidebarOpen && toggleSideBar()}
            />
          </Link>
        </GridItem>
  
        {/* Spacer equivalent */}
        <GridItem display={{ sm: "none", md: "block" }}></GridItem>
  
        {/* When in desktop mode, render all page links on screen */}
        <Show above="sm">
          <GridItem>
            <HStack spacing={5}>
              <Text as={Link} to="/About" gridColumn="span 1">
                About Us
              </Text>
              <Text as={Link} to="/Events" gridColumn="span 1">
                Events
              </Text>
              <Text as={Link} to="/Projects" gridColumn="span 1">
                Projects
              </Text>
              <Text as={Link} to="/FAQ" gridColumn="span 1">
                FAQ's
              </Text>
              <Text gridColumn="span 1">Contact</Text>
              <Text as={Link} to="/Apply" color="#498AF4" gridColumn="span 1">
                Apply
              </Text>
            </HStack>
          </GridItem>
        </Show>
      </Grid>
    );
  };
  
  export default Header;
  