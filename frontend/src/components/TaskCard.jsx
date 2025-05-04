import { Box, Button, Text, Stack } from "@chakra-ui/react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function TaskCard({ task, onEdit, onDelete }) {

    const navigate = useNavigate();

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p="5"
            boxShadow="md"
            mb="4"
            bg={task.status === "completed" ? "green.100" : "white"}
        >
            <Stack spacing={3}>
                <Text fontWeight="bold" fontSize="xl">
                    {task.title}
                </Text>
                <Text>{task.description}</Text>
                <Text fontSize="sm" color="gray.500">
                    {task.dueDate}
                </Text>
            </Stack>

            <Stack direction="row" spacing={4} mt="4">
                <Button onClick={() => navigate(`/tasks/edit/${task.id}`)} colorScheme="blue" leftIcon={<FaEdit />}>
                    Editar
                </Button>
                <Button onClick={() => onDelete(task.id)} colorScheme="red" leftIcon={<FaTrashAlt />}>
                    Excluir
                </Button>
            </Stack>
        </Box>
    );
}

export default TaskCard;