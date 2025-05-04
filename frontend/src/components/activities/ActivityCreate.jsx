import React, {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import ActivityForm from './ActivityForm';

export default function ActivityCreate() {
    const {id: projectId} = useParams();
    const [activity, setActivity] = useState({});
    const navigate = useNavigate();

    const handleChange = e => {
        setActivity({...activity, [e.target.name]: e.target.value});
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.post(`/projects/${projectId}/activities`, {...activity});
        navigate(`/projects/${projectId}`);
    };

    return (
        <div>
            <h2>Nova Atividade</h2>
            <ActivityForm activity={activity} onChange={handleChange} onSubmit={handleSubmit}/>
        </div>
    );
}