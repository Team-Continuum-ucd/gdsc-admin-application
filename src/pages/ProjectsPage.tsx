import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Image,
  Container,
  Select,
  Textarea,
  Input,
  Stack,
} from "@chakra-ui/react";
import RightDesign from "../assets/rightdesign.svg";
import LeftDesign from "../assets/leftdesign.svg";



const ProjectsPage = () => {
    const [projectName, setProjectName] = useState('');
    const [authors, setAuthors] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    
     const [projects, setProjects] = useState([]);
     const [selectedProjectForDeletion, setSelectedProjectForDeletion] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://35.185.209.10:5000/projects');
                if (!response.ok) throw new Error('Network response was not ok.');
                const projects = await response.json();
                setProjects(projects.map(({ _id, projectName }) => ({ _id, projectName })));
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error);
            }
        };

        fetchProjects();
    }, []);

    const handleSubmit = async (event: any) => {
        event.preventDefault(); 
      
        if (!projectName.trim() || !authors.trim() || !description.trim() || !category) {
          alert('Please fill in all fields.');
          return; 
        }
      
        const projectData = { projectName, authors, description, category };
      
        try {
          const response = await fetch('http://35.185.209.10:5000/projects', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
          });
      
          if (response.ok) {
            alert('Project added successfully');
            setProjectName('');
            setAuthors('');
            setDescription('')
            setCategory('');
          } else {
            alert('Failed to add project. Please try again.');
          }
        } catch (error) {
          console.error('Error submitting the form:', error);
          alert('Error submitting the form. Please check the console for more details.');
        }
      };

    const handleDelete = async (event) => {
        event.preventDefault();

        if (!selectedProjectForDeletion) {
            alert('Please select a project to delete.');
            return;
        }

        try {
            const response = await fetch(`http://35.185.209.10:5000/projects/${selectedProjectForDeletion}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Project deleted successfully');
                setProjects(projects.filter(project => project._id !== selectedProjectForDeletion));
                setSelectedProjectForDeletion('');
            } else {
                alert('Failed to delete project. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting the project:', error);
            alert('Error deleting the project. Please check the console for more details.');
        }
    };
      
      
  return (
    <>
      <Box
        position="relative"
        width="full"
        height="150px" // Set a fixed height for the design
        my="10px" // Margin for spacing above and below the design
      >
        <Image
          src={RightDesign}
          alt="Right Design"
          position="absolute"
          right="0"
          top="50%"
          transform="translateY(-35%)"
          height="150px" // Fixed height
          width="auto" // Width is automatic to maintain aspect ratio
          maxW="100%" // Ensure it doesn't exceed the viewport width
        />
      </Box>
      <Container maxW="container.sm" centerContent p={4}>
        <Box textAlign="left" p={4}>
          <Heading size="xl" mb={4}>Update Projects</Heading>
          <Text mb={4}>
            Add projects from the MongoDB Database which will reflect the main website in real time!
          </Text>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Input placeholder="Project Name" width="full" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
              <Input placeholder="Authors" width="full" value={authors} onChange={(e) => setAuthors(e.target.value)} />
              <Textarea 
                    placeholder="Short Description" 
                    width="full" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                />
              <Select placeholder="Select category" width="full" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="AI/ML">AI/ML</option>
                <option value="App Dev">App Dev</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Data Science">Data Science</option>
                <option value="Web Dev">Web Dev</option>
              </Select>
              <Button colorScheme="blue" variant="solid" width="full" type="submit">
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
      {/* UI for deleting a project */}
      <Container maxW="container.sm"  p={4}>
                <Box textAlign="left" p={4}>
                    <Heading size="xl" mb={4}>Delete Project</Heading>
                    <Text mb={4}>
                        Delete projects from the MongoDB Database which will reflect the main website in real time!
                    </Text>
                    <form onSubmit={handleDelete}>
                        <Stack spacing={4}>
                            <Select placeholder="Select project to delete" value={selectedProjectForDeletion} onChange={(e) => setSelectedProjectForDeletion(e.target.value)}>
                                {projects.map(project => (
                                    <option key={project._id} value={project._id}>{project.projectName}</option>
                                ))}
                            </Select>
                            <Button colorScheme="red" variant="solid" width="full" type="submit">
                                Delete
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Container>
      <Box
        position="relative"
        width="full"
        height="150px" // Set a fixed height for the design
        my="10px" // Margin for spacing above and below the design
      >
        <Image
          src={LeftDesign}
          alt="Left Design"
          position="absolute"
          left="0"
          height="150px" // Fixed height
          width="auto" // Width is automatic to maintain aspect ratio
          maxW="100%" // Ensure it doesn't exceed the viewport width
        />
        </Box>
    </>
  );
};

export default ProjectsPage;
