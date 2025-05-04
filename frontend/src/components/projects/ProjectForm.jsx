import {
    Box,
    Heading,
    Input,
    Button,
    Flex,
    useToastStyles,
} from "@chakra-ui/react";
import {
    FormControl,
    FormLabel
} from "@chakra-ui/form-control"
import {useNavigate, useParams} from "react-router-dom";

function ProjectForm() {
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();
    const toast = useToastStyles();

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3000/projects/${id}`, {credentials: "include"})
                .then((res) => res.json())
                .then((data) => {
                    setName(data.name);
                    setStartDate(data.start_date);
                    setEndDate(data.end_date);
                })
                .catch(() => {
                    toast({
                        title: "Erro ao carregar projeto.",
                        status: "error",
                        isClosable: true,
                    });
                });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const projectData = {
            name,
            start_date: startDate,
            end_date: endDate,
        };

        try {
            const response = await fetch(
                id
                    ? `http://localhost:3000/projects/${id}`
                    : "http://localhost:3000/projects",
                {
                    method: id ? "PUT" : "POST",
                    headers: {"Content-Type": "application/json"},
                    credentials: "include",
                    body: JSON.stringify({project: projectData}),
                }
            );

            if (!response.ok) throw new Error();

            toast({
                title: id ? "Projeto atualizado." : "Projeto criado.",
                status: "success",
                isClosable: true,
            });

            const result = await response.json();
            navigate(`/projects/${result.id}`);
        } catch (error) {
            toast({
                title: "Erro ao salvar projeto.",
                status: "error",
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box maxW="700px" mx="auto" mt={10}>
            <Heading size="lg" mb={6}>
                {id ? "Editar Projeto" : "Novo Projeto"}
            </Heading>

            <form onSubmit={handleSubmit}>
                <FormControl mb={4} isRequired>
                    <FormLabel>Nome do Projeto</FormLabel>
                    <Input value={name} onChange={(e) => setName(e.target.value)}/>
                </FormControl>

                <FormControl mb={4} isRequired>
                    <FormLabel>Data de Início</FormLabel>
                    <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </FormControl>

                <FormControl mb={4} isRequired>
                    <FormLabel>Data de Fim</FormLabel>
                    <Input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </FormControl>

                <Flex mt={6} justify="space-between">
                    <Button onClick={() => navigate("/projects")}>Cancelar</Button>
                    <Button colorScheme="teal" type="submit" isLoading={loading}>
                        {id ? "Atualizar" : "Criar"}
                    </Button>
                </Flex>
            </form>
        </Box>
    );
}

export default ProjectForm;