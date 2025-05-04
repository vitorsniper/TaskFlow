import {useState} from 'react';
import {Box, Button, Flex, Heading, Input, Stack, Text} from '@chakra-ui/react';
import {FormControl, FormErrorMessage, FormLabel} from "@chakra-ui/form-control";
import {useToast} from "@chakra-ui/toast";
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const toast = useToast();

    const validate = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'E-mail é obrigatório';
        if (!password) newErrors.password = 'Senha é obrigatória';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({user: {email, password}}),
            });

            const contentType = response.headers.get('content-type');
            let data;

            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                const text = await response.text();
                console.error('Resposta inesperada:', text);
                throw new Error('Resposta não é JSON');
            }

            if (response.ok) {
                localStorage.setItem('token', data.token);
                toast({
                    title: 'Login realizado com sucesso.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                window.location.href = '/';
            } else {
                toast({
                    title: 'Erro ao fazer login.',
                    description: data.error || 'Falha no login.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: 'Erro de rede.',
                description: 'Não foi possível conectar ao servidor.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex minH="100vh" align="center" justify="center">
            <Box bg="white" p={10} rounded="xl" shadow="xl" maxW="md" w="100%">
                <Heading mb={6} textAlign="center" color="teal.600">
                    TaskFlow
                </Heading>
                <form onSubmit={handleLogin}>
                    <Stack spacing={4}>
                        <FormControl isInvalid={!!errors.email}>
                            <FormLabel htmlFor="email">E-mail</FormLabel>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                focusbordercolor="teal.500"
                            />
                            {errors.email && <FormErrorMessage>
                                <Box
                                    bg="red.100"
                                    color="red.800"
                                    borderRadius="md"
                                    p={2}
                                    mt={1}
                                    border="1px solid"
                                    borderColor="red.300"
                                    maxW="100%">
                                    {errors.email}
                                </Box></FormErrorMessage>}
                        </FormControl>

                        <FormControl isInvalid={!!errors.password}>
                            <FormLabel htmlFor="password">Senha</FormLabel>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                focusbordercolor="teal.500"
                            />
                            {errors.password && <FormErrorMessage><Box
                                bg="red.100"
                                color="red.800"
                                borderRadius="md"
                                p={2}
                                mt={1}
                                border="1px solid"
                                borderColor="red.300"
                                maxW="100%">
                                {errors.password}
                            </Box></FormErrorMessage>}
                        </FormControl>

                        <Button type="submit" colorScheme="teal" size="lg" fontWeight="bold">
                            Entrar
                        </Button>
                    </Stack>
                </form>
                <Text mt={4} fontSize="sm" color="gray.500" textAlign="center">
                    Esqueceu sua senha?
                </Text>

                <Button
                    mt={4}
                    w="full"
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => navigate("/cadastro")}
                >
                    Criar Conta
                </Button>
            </Box>
        </Flex>
    );
}

export default Login;