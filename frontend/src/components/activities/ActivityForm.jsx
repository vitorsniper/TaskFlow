import React from 'react';

export default function ActivityForm({activity, onChange, onSubmit}) {
    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label className="form-label">Nome da Atividade</label>
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={activity.name || ''}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Data de Início</label>
                <input
                    type="date"
                    className="form-control"
                    name="start_date"
                    value={activity.start_date || ''}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Data de Fim</label>
                <input
                    type="date"
                    className="form-control"
                    name="end_date"
                    value={activity.end_date || ''}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="form-check mb-3">
                <input
                    type="checkbox"
                    className="form-check-input"
                    name="completed"
                    checked={activity.completed || false}
                    onChange={e => onChange({target: {name: 'completed', value: e.target.checked}})}
                />
                <label className="form-check-label">Finalizada?</label>
            </div>

            <button type="submit" className="btn btn-primary">Salvar</button>
        </form>
    );
}