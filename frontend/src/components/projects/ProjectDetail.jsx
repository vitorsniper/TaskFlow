import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';

const ProjectDetail = ({match}) => {
    const [project, setProject] = useState(null);
    const [activities, setActivities] = useState([]);

    const projectId = match.params.id;

    useEffect(() => {
        // Carregar os detalhes do projeto
        axios.get(`/api/projects/${projectId}`)
            .then(response => setProject(response.data))
            .catch(error => console.error('Erro ao carregar projeto:', error));

        // Carregar as atividades do projeto
        axios.get(`/api/projects/${projectId}/activities`)
            .then(response => setActivities(response.data))
            .catch(error => console.error('Erro ao carregar atividades:', error));
    }, [projectId]);

    return (
        <div>
            {project && (
                <div>
                    <h1>{project.name}</h1>
                    <p>Início: {project.start_date}</p>
                    <p>Fim: {project.end_date}</p>
                </div>
            )}

            <h2>Atividades</h2>
            {activities.length > 0 ? (
                <ul>
                    {activities.map(activity => (
                        <li key={activity.id}>
                            <p>{activity.name}</p>
                            <p>Início: {activity.start_date}</p>
                            <p>Fim: {activity.end_date}</p>
                            <p>Status: {activity.is_finished ? 'Concluída' : 'Pendente'}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Não há atividades para este projeto.</p>
            )}
        </div>
    );
};

export default ProjectDetail;