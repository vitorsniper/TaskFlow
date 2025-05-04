import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import '../App.css';
import {Text} from "@chakra-ui/react";

function TaskEdit() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({title: "", description: "", status: 0});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/tasks/${id}`, {
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Erro ao buscar tarefa");
                return res.json();
            })
            .then((data) => {
                setTask(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erro ao buscar task:", err);
                setLoading(false);
            });
    }, [id]);

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
            await fetch(`http://localhost:3000/tasks/${id}`, {
                method: "PUT",
                credentials: "include",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({task}),
            });
            navigate("/tasks");
        } catch (err) {
            console.error("Erro ao editar task:", err);
        }
    };

    if (loading) return <p>Carregando tarefa...</p>;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <Text fontSize="xl" fontWeight="bold" color="black">
                        Editar Tarefa
                    </Text>

                    <div className="input-group-horizontal">
                        <div className="input-field title-field">
                            <label htmlFor="title">Título:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={task.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-field status-field">
                            <label htmlFor="status">Status:</label>
                            <select
                                id="status"
                                name="status"
                                value={task.status}
                                onChange={handleChange}
                                required
                            >
                                <option value={0}>Pendente</option>
                                <option value={1}>Em Andamento</option>
                                <option value={2}>Concluída</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-field full-width">
                        <label htmlFor="description">Descrição:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                            maxLength={200}
                            required
                            className="large-textarea"
                        />
                    </div>
                </div>

                <button type="submit" className="btn-save">
                    Salvar Alterações
                </button>
                <button type="button" onClick={() => navigate("/tasks")} className="btn-cancel">
                    Cancelar
                </button>
            </form>
        </div>
    );
}

export default TaskEdit;