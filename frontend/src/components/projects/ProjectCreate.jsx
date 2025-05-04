import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, Input, VStack, Heading, HStack, SimpleGrid} from "@chakra-ui/react";
import {FormControl, FormLabel} from "@chakra-ui/form-control";
import {Checkbox} from "@chakra-ui/checkbox";

function ProjectCreate() {
    const navigate = useNavigate();
    const [project, setProject] = useState({
        name: "",
        start_date: "",
        end_date: "",
    });

    const [activities, setActivities] = useState([
        {name: "", start_date: "", end_date: "", is_finished: false},
    ]);

    const handleProjectChange = (e) => {
        const {name, value} = e.target;
        setProject({...project, [name]: value});
    };

    const handleActivityChange = (index, e) => {
        const {name, value, type, checked} = e.target;
        const newActivities = [...activities];
        newActivities[index][name] = type === "checkbox" ? checked : value;
        setActivities(newActivities);
    };

    const addActivity = () => {
        setActivities([...activities, {name: "", start_date: "", end_date: "", is_finished: false}]);
    };

    const removeActivity = (index) => {
        const newActivities = activities.filter((_, i) => i !== index);
        setActivities(newActivities);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const projectPayload = {
            name: project.name,
            start_date: project.start_date,
            end_date: project.end_date,
        };

        try {
            const projectResponse = await fetch("http://localhost:3000/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({project: projectPayload}),
            });

            if (projectResponse.ok) {
                const projectData = await projectResponse.json();

                const activitiesPayload = activities.map((activity) => ({
                    ...activity,
                    project_id: projectData.id,
                }));

                await Promise.all(
                    activitiesPayload.map(async (activity) => {
                        const activityResponse = await fetch(`http://localhost:3000/projects/${projectData.id}/activities`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            credentials: "include",
                            body: JSON.stringify({activity}),
                        });

                        if (!activityResponse.ok) {
                            throw new Error("Erro ao criar atividade");
                        }
                    })
                );

                navigate("/projects");
            } else {
                console.error("Erro ao criar projeto");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    return (
        <Box maxW="800px" mx="auto" mt={10}>
            <Heading mb={6}>Novo Projeto</Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="flex-start">
                    <HStack spacing={4} width="100%">
                        <FormControl>
                            <FormLabel>Nome</FormLabel>
                            <Input
                                type="text"
                                name="name"
                                value={project.name}
                                onChange={handleProjectChange}
                                required
                                w="full"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Data de Início</FormLabel>
                            <Input
                                type="date"
                                name="start_date"
                                value={project.start_date}
                                onChange={handleProjectChange}
                                required
                                w="full"
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Data de Fim</FormLabel>
                            <Input
                                type="date"
                                name="end_date"
                                value={project.end_date}
                                onChange={handleProjectChange}
                                required
                                w="full"
                            />
                        </FormControl>
                    </HStack>

                    <Heading size="md" mt={6}>Atividades</Heading>

                    <SimpleGrid columns={{base: 1, sm: 2, md: 3, lg: 4}} spacing={4}>
                        {activities.map((activity, index) => (
                            <Box
                                key={index}
                                border="1px solid #ccc"
                                padding="1.5rem"
                                borderRadius="8px"
                                boxShadow="md"
                                display="flex"
                                flexDirection="column"
                            >
                                <FormControl mb={4}>
                                    <FormLabel>Nome da Atividade</FormLabel>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={activity.name}
                                        onChange={(e) => handleActivityChange(index, e)}
                                        required
                                    />
                                </FormControl>

                                <FormControl mb={4}>
                                    <FormLabel>Início</FormLabel>
                                    <Input
                                        type="date"
                                        name="start_date"
                                        value={activity.start_date}
                                        onChange={(e) => handleActivityChange(index, e)}
                                        required
                                    />
                                </FormControl>

                                <FormControl mb={4}>
                                    <FormLabel>Fim</FormLabel>
                                    <Input
                                        type="date"
                                        name="end_date"
                                        value={activity.end_date}
                                        onChange={(e) => handleActivityChange(index, e)}
                                        required
                                    />
                                </FormControl>
                                <FormControl mb={4} display="flex" alignItems="center">
                                    <FormLabel ml={2} htmlFor={`activity-checkbox-${index}`}>
                                        Concluída?
                                    </FormLabel>
                                    <Checkbox
                                        name="is_finished"
                                        isChecked={activity.is_finished}
                                        onChange={(e) => handleActivityChange(index, e)}
                                        colorScheme="teal"
                                        size="lg"
                                        border="1px solid #ccc" // Fixo, estilo de borda
                                        minWidth="24px" // Garantindo que o quadrado tenha tamanho fixo
                                        minHeight="24px"
                                        height="24px" // Tamanho fixo
                                        width="24px" // Tamanho fixo
                                    />
                                </FormControl>
                                <Button
                                    mt={2}
                                    colorScheme="red"
                                    onClick={() => removeActivity(index)}
                                >
                                    Remover
                                </Button>
                            </Box>
                        ))}
                    </SimpleGrid>

                    <Button colorScheme="teal" mt={4} onClick={addActivity}>
                        Adicionar Atividade
                    </Button>

                    <Button colorScheme="teal" type="submit" mt={4}>
                        Criar Projeto
                    </Button>
                </VStack>
            </form>
        </Box>
    );
}

export default ProjectCreate;
