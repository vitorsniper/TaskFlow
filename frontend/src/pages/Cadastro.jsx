import {Box, Button, Flex, Heading, Input, Stack} from '@chakra-ui/react';
import {FormControl, FormLabel, FormErrorMessage} from '@chakra-ui/form-control';
import {useState} from 'react';
import {useToast} from '@chakra-ui/toast';

function Cadastro() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const toast = useToast();

    const validate = () => {
        const newErrors = {};

        // Validação do campo e-mail
        if (!email) {
            newErrors.email = 'E-mail é obrigatório';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|com.br)$/.test(email)) {
            newErrors.email = 'Formato incorreto (ex.: exemplo@hotmail.com)';
        }

        // Validação do campo senha
        if (!password) {
            newErrors.password = 'Senha é obrigatória';
        } else if (password.length < 6) {
            newErrors.password = 'A senha deve ter no mínimo 6 caracteres';
        }

        // Validação do campo de confirmação de senha
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Confirme a senha';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'As senhas não coincidem';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCadastro = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        email,
                        password,
                        password_confirmation: confirmPassword
                    }
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast({
                    title: 'Usuário cadastrado com sucesso!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                window.location.href = '/';
            } else {
                toast({
                    title: 'Erro ao cadastrar',
                    description: data.error || 'Não foi possível cadastrar o usuário.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: 'Erro de rede',
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
                    Criar Conta
                </Heading>
                <form onSubmit={handleCadastro}>
                    <Stack spacing={4}>
                        <FormControl isInvalid={!!errors.email}>
                            <FormLabel>E-mail</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && (
                                <FormErrorMessage>
                                    <Box
                                        bg="red.100"
                                        color="red.800"
                                        borderRadius="md"
                                        p={2}
                                        mt={1}
                                        border="1px solid"
                                        borderColor="red.300"
                                        maxW="100%"
                                    >
                                        {errors.email}
                                    </Box>
                                </FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl isInvalid={!!errors.password}>
                            <FormLabel>Senha</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && (
                                <FormErrorMessage>
                                    <Box
                                        bg="red.100"
                                        color="red.800"
                                        borderRadius="md"
                                        p={2}
                                        mt={1}
                                        border="1px solid"
                                        borderColor="red.300"
                                        maxW="100%"
                                    >
                                        {errors.password}
                                    </Box>
                                </FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl isInvalid={!!errors.confirmPassword}>
                            <FormLabel>Confirme a Senha</FormLabel>
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {errors.confirmPassword && (
                                <FormErrorMessage>
                                    <Box
                                        bg="red.100"
                                        color="red.800"
                                        borderRadius="md"
                                        p={2}
                                        mt={1}
                                        border="1px solid"
                                        borderColor="red.300"
                                        maxW="100%"
                                    >
                                        {errors.confirmPassword}
                                    </Box>
                                </FormErrorMessage>
                            )}
                        </FormControl>

                        <Button type="submit" colorScheme="teal" size="lg" fontWeight="bold">
                            Cadastrar
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Flex>
    );
}

export default Cadastro;
