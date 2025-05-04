import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, Input, VStack, Heading, HStack, Textarea} from "@chakra-ui/react";
import {FormControl, FormLabel} from "@chakra-ui/form-control";
import {Select} from "@chakra-ui/select";

function TaskNew() {
    const navigate = useNavigate();
    const [task, setTask] = useState({
        title: "",
        description: "",
        status: 0,
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTask((prev) => ({
            ...prev,
            [name]: name === "status" ? parseInt(value, 10) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:3000/tasks`, {
                method: "POST",
                credentials: "include",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({task}),
            });
            navigate("/tasks");
        } catch (err) {
            console.error("Erro ao criar task:", err);
        }
    };

    return (
        <Box maxW="800px" mx="auto" mt={10}>
            <HStack spacing={4} justify="space-between" mb={6}>
                <Heading size="lg">Nova Tarefa</Heading>
                <FormControl width="200px">
                    <FormLabel>Status</FormLabel>
                    <Select
                        name="status"
                        value={task.status}
                        onChange={handleChange}
                        required
                        w="full"
                    >
                        <option value={0}>Pendente</option>
                        <option value={1}>Em Andamento</option>
                        <option value={2}>Concluída</option>
                    </Select>
                </FormControl>
            </HStack>

            <form onSubmit={handleSubmit}>
                <VStack spacing={6} align="flex-start">
                    <FormControl width="100%">
                        <FormLabel>Título</FormLabel>
                        <Input
                            type="text"
                            name="title"
                            value={task.title}
                            onChange={handleChange}
                            required
                            w="full"
                            borderColor="gray.300"
                            _hover={{borderColor: "teal.500"}}
                            _focus={{borderColor: "teal.500"}}
                        />
                    </FormControl>

                    <FormControl width="100%">
                        <FormLabel>Descrição</FormLabel>
                        <Textarea
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                            required
                            w="full"
                            minHeight="150px"
                            borderColor="gray.300"
                            _hover={{borderColor: "teal.500"}}
                            _focus={{borderColor: "teal.500"}}
                        />
                    </FormControl>

                    <Button colorScheme="teal" type="submit" mt={4}>
                        Criar Tarefa
                    </Button>
                </VStack>
            </form>
        </Box>
    );
}

export default TaskNew;
