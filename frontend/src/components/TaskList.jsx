import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useToast} from "@chakra-ui/toast"
import {Text} from "@chakra-ui/react";

function TaskList() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const toast = useToast();

    useEffect(() => {
        fetch("http://localhost:3000/tasks", {
            credentials: "include", // importante se o backend requer cookies
        })
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch((err) => console.error("Erro ao carregar tasks:", err));
    }, []);

    const handleEdit = (id) => {
        navigate(`/tasks/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir esta tarefa?")) return;

        try {
            const response = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: "DELETE",
                credentials: "include", // se usar cookies
            });

            if (response.ok) {
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
                toast({
                    title: "Tarefa excluída.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Erro ao excluir tarefa.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("Erro ao excluir:", error);
            toast({
                title: "Erro ao se comunicar com o servidor.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const statusLabels = {
        0: 'Pendente',
        1: 'Em andamento',
        2: 'Concluída'
    };

    return (
        <div>
            <Text fontSize="xl" fontWeight="bold" color="black">
                Lista de Tarefas
            </Text>

            <div className="project-list">
                <div className="project-header">
                    <div className="header-cell">Título</div>
                    <div className="header-cell">Descrição</div>
                    <div className="header-cell">Status</div>
                    <div className="header-cell">Ações</div>
                </div>

                {tasks.map((task) => (
                    <div key={task.id} className="project-row">
                        <div className="project-item">{task.title}</div>
                        <div className="project-item">{task.description}</div>
                        <div className="project-item">{statusLabels[task.status]}</div>
                        <div className="project-item">
                            <button
                                className="btn btn-editar btn-sm"
                                onClick={() => handleEdit(task.id)}
                            >
                                Editar
                            </button>
                            <button
                                className="btn btn-removal btn-sm me-1"
                                onClick={() => handleDelete(task.id)}
                            >
                                Remover
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Botão flutuante para nova tarefa */}
            <button
                onClick={() => navigate("/tasks/new")}
                style={{
                    position: "fixed",
                    bottom: "30px",
                    right: "30px",
                    width: "60px",
                    height: "60px",
                    borderRadius: "20%",
                    backgroundColor: "#3182ce",
                    color: "#fff",
                    fontSize: "36px",
                    textAlign: "center",
                    lineHeight: "53px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    border: "none",
                    cursor: "pointer",
                    zIndex: 1000,
                }}
            >
                +
            </button>
        </div>
    );
}

export default TaskList;