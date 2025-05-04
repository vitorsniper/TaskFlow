import {
    Box,
    Flex,
    HStack,
    Button,
    useDisclosure,
    Text,
    Spacer,
} from '@chakra-ui/react';

import {useNavigate} from 'react-router-dom';

function Header() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3000/logout', {
                method: 'DELETE',
                credentials: 'include',
            });
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    const navigateTo = (path) => navigate(path);

    return (
        <Box bg="teal.600" px={4} shadow="md">
            <Flex h={16} alignItems="center" justifyContent="space-between">
                {/* Nome/Logo da aplicação */}
                <HStack spacing={8} alignItems="center" cursor="pointer" onClick={() => navigateTo('/')}>
                    <Text fontSize="xl" fontWeight="bold" color="white">
                        TaskFlow
                    </Text>
                </HStack>

                <Spacer/>

                <HStack
                    spacing={4}
                    display={{base: 'none', md: 'flex'}}
                    color="white"
                >
                    <Button variant="ghost" color="black" onClick={() => navigateTo('/tasks')}>
                        Tarefas
                    </Button>
                    <Button variant="ghost" color="black" onClick={() => navigateTo('/projects')}>
                        Projetos
                    </Button>
                    <Button variant="outline" colorScheme="red" onClick={handleLogout}>
                        Logout
                    </Button>
                </HStack>
            </Flex>
        </Box>
    );
}

export default Header;