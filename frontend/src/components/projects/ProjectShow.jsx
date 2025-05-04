import React, {useState, useEffect} from "react";
import {useParams, Link} from "react-router-dom";

function ProjectShow() {
    const {id} = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/projects/${id}`, {
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                setProject(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar projeto:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Carregando projeto...</p>;
    if (!project) return <p>Projeto não encontrado.</p>;

    return (
        <div className="project-container">
            <div className="project-header">
                <h2>{project.name}</h2>
                <div className="project-meta">
                    <p><strong>Início:</strong> {project.start_date}</p>
                    <p><strong>Fim:</strong> {project.end_date}</p>
                    <p><strong>Percentual Completo:</strong> {project.completion_percentage}%</p>
                    <p><strong>Atrasado:</strong> {project.delayed ? "Sim" : "Não"}</p>
                </div>
            </div>

            <div className="activity-section">
                <h3>Atividades</h3>
                {project.activities && project.activities.length > 0 ? (
                    <ul className="activity-list">
                        {project.activities.map((activity) => (
                            <li key={activity.id} className="activity-item">
                                <p><strong>{activity.name}</strong></p>
                                <p>{activity.description}</p>
                                <p><small>{activity.start_date} → {activity.end_date}</small></p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Sem atividades cadastradas.</p>
                )}
            </div>

            <div className="buttons-show">
                <Link to={`/projects/${project.id}/edit`}
                      className="btn btn-editar btn-sm">
                    Editar Projeto
                </Link>
                <Link to="/projects"
                      className="btn btn-info btn-sm me-1">
                    Voltar
                </Link>
            </div>
        </div>
    );
}

export default ProjectShow;