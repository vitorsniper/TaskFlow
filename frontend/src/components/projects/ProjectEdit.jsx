import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import "../../App.css";
import {Text} from "@chakra-ui/react";

function ProjectEdit() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/projects/${id}`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setProject({
                    ...data,
                    activities: data.activities || [],
                });
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erro ao buscar projeto:", err);
                setLoading(false);
            });
    }, [id]);

    const handleActivityChange = (index, field, value) => {
        const updatedActivities = [...project.activities];
        updatedActivities[index] = {
            ...updatedActivities[index],
            [field]: value,
        };

        setProject((prevState) => ({
            ...prevState,
            activities: updatedActivities,
        }));
    };

    const handleRemoveActivity = async (indexToRemove) => {
        const updatedActivities = project.activities.filter((_, index) => index !== indexToRemove);
        setProject({...project, activities: updatedActivities});

        try {
            const response = await fetch(
                `http://localhost:3000/projects/${id}/activities/${project.activities[indexToRemove].id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao remover a atividade.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        for (const activity of project.activities) {
            if (!activity.name || !activity.start_date || !activity.end_date) {
                alert("Todos os campos de atividade são obrigatórios.");
                return;
            }
        }

        const projectPayload = {
            id: project.id,
            name: project.name,
            start_date: project.start_date,
            end_date: project.end_date,
            completion_percentage: project.completion_percentage,
            delayed: project.delayed,
        };

        try {
            const response = await fetch(`http://localhost:3000/projects/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({project: projectPayload}),
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar o projeto.");
            }

            await Promise.all(
                project.activities.map(async (activity) => {
                    const activityPayload = {
                        name: activity.name,
                        start_date: activity.start_date,
                        end_date: activity.end_date,
                        is_finished: activity.is_finished,
                    };

                    if (activity.id) {
                        const activityResponse = await fetch(
                            `http://localhost:3000/projects/${id}/activities/${activity.id}`,
                            {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                credentials: "include",
                                body: JSON.stringify({activity: activityPayload}),
                            }
                        );

                        if (!activityResponse.ok) {
                            throw new Error(`Erro ao atualizar a atividade ${activity.id}.`);
                        }
                    } else {
                        const activityResponse = await fetch(
                            `http://localhost:3000/projects/${id}/activities`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                credentials: "include",
                                body: JSON.stringify({activity: activityPayload}),
                            }
                        );

                        if (!activityResponse.ok) {
                            throw new Error("Erro ao criar nova atividade.");
                        }
                    }
                })
            );

            navigate(`/projects/${id}`);
        } catch (error) {
            console.error(error);
        }
    };

    if (loading || !project) return <p>Carregando...</p>;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <Text fontSize="xl" fontWeight="bold" color="black">
                        Editar Projeto
                    </Text>

                    <div className="input-group">
                        <div className="input-field">
                            <label>Nome:</label>
                            <input
                                type="text"
                                value={project.name}
                                onChange={(e) => setProject({...project, name: e.target.value})}
                                required
                            />
                        </div>

                        <div className="input-field">
                            <label>Data de Início:</label>
                            <input
                                type="date"
                                value={project.start_date}
                                onChange={(e) => setProject({...project, start_date: e.target.value})}
                                required
                            />
                        </div>

                        <div className="input-field">
                            <label>Data de Fim:</label>
                            <input
                                type="date"
                                value={project.end_date}
                                onChange={(e) => setProject({...project, end_date: e.target.value})}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="form-container">
                    <h3>Atividades</h3>

                    <table className="activity-table">
                        <thead>
                        <tr>
                            <th>Nome da Atividade</th>
                            <th>Data de Início</th>
                            <th>Data de Fim</th>
                            <th>Concluída?</th>
                            <th>Ação</th>
                        </tr>
                        </thead>
                        <tbody>
                        {project.activities && project.activities.length > 0 ? (
                            project.activities.map((activity, index) => (
                                <tr key={index}>
                                    <td>
                                        <input
                                            type="text"
                                            value={activity.name}
                                            onChange={(e) =>
                                                handleActivityChange(index, "name", e.target.value)
                                            }
                                            placeholder="Nome da atividade"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            value={activity.start_date || ""}
                                            onChange={(e) =>
                                                handleActivityChange(index, "start_date", e.target.value)
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            value={activity.end_date || ""}
                                            onChange={(e) =>
                                                handleActivityChange(index, "end_date", e.target.value)
                                            }
                                        />
                                    </td>
                                    <td style={{textAlign: "center"}}>
                                        <input
                                            type="checkbox"
                                            checked={activity.is_finished}
                                            onChange={(e) =>
                                                handleActivityChange(index, "is_finished", e.target.checked)
                                            }
                                        />
                                    </td>
                                    <td>
                                        <button
                                            className="btn-removal"
                                            type="button"
                                            onClick={() => handleRemoveActivity(index)}
                                        >
                                            Remover
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">Nenhuma atividade disponível.</td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                    <button
                        type="button"
                        onClick={() =>
                            setProject({
                                ...project,
                                activities: [
                                    ...project.activities,
                                    {name: "", start_date: "", end_date: "", is_finished: false},
                                ],
                            })
                        }
                        className="btn-add-activity"
                    >
                        Nova Atividade
                    </button>
                </div>

                <button type="submit" className="btn-save">
                    Salvar Alterações
                </button>
                <button type="button" onClick={() => navigate(`/projects/${id}`)} className="btn-cancel">
                    Cancelar
                </button>
            </form>
        </div>
    );
}

export default ProjectEdit;
