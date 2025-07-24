import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ParticipanteForm = ({ onHide, addParticipanteCompeticion }) => {
  const [Nombre, setNombre] = useState('');
  const [selectedParticipante, setSelectedParticipante] = useState(null);
  const [participantes, setParticipantes] = useState([]);
  const [showFormParticipante, setShowFormParticipante] = useState(false);


    const getParticipantes = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:3000/api/participantes', {
        headers: {
            Authorization: `Bearer ${token}`
        }
        });
        if (response.status !== 200) {
        throw new Error('Error al obtener los participantes');
        }
        console.log(response.data);
        setParticipantes(response.data);
    } catch (err) {
        console.log(err);
    } 
    };
  useEffect(() => {
    getParticipantes();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Nombre,
      Participante: selectedParticipante
    };

    addParticipanteCompeticion(data);
  };

  return (
    <div  className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="bg-azulThema p-8 rounded-2xl shadow-md flex flex-col items-center justify-center w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Registro de Participante</h2>
        </div>
        <form onSubmit={handleSubmit} className='w-full gap-4'>
        {!showFormParticipante ? (
          <div className='w-full'>
            <label className="text-lg font-semibold">Participante:</label>
            <select value={selectedParticipante?.id} onChange={(event) => setSelectedParticipante(participantes.find(participante => participante.id === parseInt(event.target.value)))} className="p-2 border rounded w-full mb-4">
                <option value="">Seleccione un participante</option>
                {participantes.map(participante => (
                <option value={participante.id} key={participante.id}>{participante.nombre}</option>
                ))}
            </select>
          </div>
        ) : (
          <div>
            <label className="text-lg font-semibold">Participante:</label>
            <input type="text" value={Nombre} onChange={(event) => setNombre(event.target.value)} className="p-2 border rounded w-full mb-4" />
          </div>
        )}
            <button onClick={() => setShowFormParticipante(true)} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 hover:cursor-pointer">
                Crear Nuevo
            </button>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 hover:cursor-pointer mr-2">
                Guardar
            </button>
            <button onClick={onHide} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 ml-2 hover:cursor-pointer">
                Cancelar
            </button>
        </form>
      </div>
    </div>
  );
};

export default ParticipanteForm;

