import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import {Text} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/projects', {
            credentials: "include",
        })
            .then(response => response.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar projetos:', error);
                setLoading(false);
            });
    }, []);

    const calculateCompletionPercentage = (activities) => {
        if (!activities.length) return 0;

        const completedActivities = activities.filter((activity) => activity.is_finished);
        return Math.round((completedActivities.length / activities.length) * 100);
    };

    const checkIfProjectIsDelayed = (activities, projectEndDate) => {
        const maxActivityEndDate = Math.max(
            ...activities.map((activity) => new Date(activity.end_date).getTime())
        );
        return maxActivityEndDate > new Date(projectEndDate).getTime();
    };

    const handleDelete = async (projectId) => {
        const confirmation = window.confirm("Tem certeza que deseja excluir este projeto?");
        if (confirmation) {
            try {
                const response = await fetch(`http://localhost:3000/projects/${projectId}`, {
                    method: 'DELETE',
                    credentials: "include",
                });

                if (response.ok) {
                    // Remover o projeto da lista sem precisar fazer uma nova requisição
                    setProjects(projects.filter(project => project.id !== projectId));
                    alert('Projeto excluído com sucesso');
                } else {
                    alert('Erro ao excluir o projeto');
                }
            } catch (error) {
                console.error('Erro ao excluir o projeto:', error);
                alert('Erro ao excluir o projeto');
            }
        }
    };

    if (loading) {
        return <Text>Carregando projetos...</Text>;
    }

    return (
        <div>
            <Text fontSize="xl" fontWeight="bold" color="black">
                Lista de Projetos
            </Text>

            <div className="project-list">
                <div className="project-header">
                    <div className="header-cell">Nome</div>
                    <div className="header-cell">Início</div>
                    <div className="header-cell">Fim</div>
                    <div className="header-cell">Percentual</div>
                    <div className="header-cell">Atrasado</div>
                    <div className="header-cell">Ações</div>
                </div>

                {projects.map(project => {
                    const activities = project.activities || [];
                    const completion = calculateCompletionPercentage(activities);
                    const delayed = checkIfProjectIsDelayed(activities, project.end_date);

                    return (
                        <div key={project.id} className="project-row">
                            <div className="project-item">{project.name}</div>
                            <div className="project-item">{project.start_date}</div>
                            <div className="project-item">{project.end_date}</div>
                            <div className="project-item">{completion}%</div>
                            <div className="project-item">{delayed ? 'Sim' : 'Não'}</div>
                            <div className="project-item">
                                <Link to={`/projects/${project.id}`}
                                      className="btn btn-info btn-sm me-1">
                                    Ver
                                </Link>
                                <Link to={`/projects/${project.id}/edit`}
                                      className="btn btn-editar btn-sm me-1">
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="btn btn-removal btn-sm me-1"
                                >
                                    Remover
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Botão flutuante para novo projeto */}
            <Link
                to="/projects/new"
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
                    textDecoration: "none",
                    zIndex: 1000,
                }}
            >
                +
            </Link>
        </div>
    );
}

export default ProjectList;
