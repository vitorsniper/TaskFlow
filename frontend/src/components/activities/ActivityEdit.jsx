import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import ActivityForm from './ActivityForm';

export default function ActivityEdit() {
    const {id: projectId, activityId} = useParams();
    const [activity, setActivity] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/projects/${projectId}/activities/${activityId}`).then(res => {
            setActivity(res.data);
        });
    }, [projectId, activityId]);

    const handleChange = e => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setActivity({...activity, [e.target.name]: value});
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.put(`/projects/${projectId}/activities/${activityId}`, activity);
        navigate(`/projects/${projectId}`);
    };

    return (
        <div>
            <h2>Editar Atividade</h2>
            {activity && (
                <ActivityForm activity={activity} onChange={handleChange} onSubmit={handleSubmit}/>
            )}
        </div>
    );
}