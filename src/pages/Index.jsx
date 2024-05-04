import React, { useState } from "react";
import { Container, VStack, Button, Input, useToast, Heading, Box, IconButton, List, ListItem, ListIcon, FormControl, FormLabel } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit, FaSave } from "react-icons/fa";

const Index = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState("");
  const toast = useToast();

  const handleAddEvent = () => {
    if (newEvent === "") {
      toast({
        title: "Error",
        description: "Event description cannot be empty.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setEvents([...events, newEvent]);
    setNewEvent("");
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  const handleEditEvent = (index) => {
    setEditIndex(index);
    setEditText(events[index]);
  };

  const handleSaveEdit = () => {
    const updatedEvents = [...events];
    updatedEvents[editIndex] = editText;
    setEvents(updatedEvents);
    setEditIndex(-1);
    setEditText("");
  };

  return (
    <Container centerContent maxW="container.md" padding={4}>
      <VStack spacing={4} width="100%">
        <Heading>Create, Edit, and Delete Events</Heading>
        <FormControl>
          <FormLabel htmlFor="event-input">Add New Event</FormLabel>
          <Input id="event-input" placeholder="Enter event description" value={newEvent} onChange={(e) => setNewEvent(e.target.value)} />
        </FormControl>
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddEvent}>
          Add Event
        </Button>
        <List spacing={3} width="100%">
          {events.map((event, index) => (
            <ListItem key={index} padding={2} boxShadow="md" borderRadius="md">
              {editIndex === index ? (
                <Box>
                  <Input value={editText} onChange={(e) => setEditText(e.target.value)} />
                  <IconButton aria-label="Save edit" icon={<FaSave />} onClick={handleSaveEdit} />
                </Box>
              ) : (
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Text>{event}</Text>
                  <Box>
                    <IconButton aria-label="Edit event" icon={<FaEdit />} onClick={() => handleEditEvent(index)} />
                    <IconButton aria-label="Delete event" icon={<FaTrash />} onClick={() => handleDeleteEvent(index)} />
                  </Box>
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
