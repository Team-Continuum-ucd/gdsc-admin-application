import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import Header from "./components/common/Header";

import { Box, Flex } from "@chakra-ui/react";

const AppRoutes = () => {
  return (
    <Router>
      <Flex direction="column" minH="100vh">
        <Header />
        <Box flex="1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/Projects" element={<ProjectsPage />} />
          </Routes>
        </Box>
      </Flex>
    </Router>
  );
};

export default AppRoutes;
