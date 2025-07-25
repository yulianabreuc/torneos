import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModalRegistroTiemposCrearEditar = ({ onHide, saveRegistro, hasError, registroEdit }) => {
  const [participantes, setParticipantes] = useState([]);
  const [competencias, setCompetencias] = useState([]);
  const [ParticipanteId, setParticipanteId] = useState(registroEdit ? registroEdit.participantes_id._id : '');
  const [CompetenciaId, setCompetenciaId] = useState(registroEdit ? registroEdit.competencia_id._id : '');
  const [Kilometros, setKilometros] = useState(registroEdit ? registroEdit.kilometros : '');
  const [Tiempo, setTiempo] = useState(registroEdit ? registroEdit.tiempo : '');
  const [Lugar, setLugar] = useState(registroEdit ? registroEdit.lugar : '');

  useEffect(() => {
    const getParticipantes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/participantes/');
        setParticipantes(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getCompetencias = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/competencias/');
        setCompetencias(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getParticipantes();
    getCompetencias();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      participantes_id: ParticipanteId,
      competencia_id: CompetenciaId,
      kilometros: Kilometros,
      tiempo: Tiempo,
      lugar: Lugar
    };
    if (!ParticipanteId || !CompetenciaId || !Kilometros || !Tiempo || !Lugar) {
      hasError('Todos los campos son obligatorios');
      return;
    }
    if (registroEdit) {
      saveRegistro(registroEdit._id, data);
    } else {
      saveRegistro(null, data);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="bg-azulThema p-8 rounded-2xl shadow-md flex flex-col items-center justify-center w-3/5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{registroEdit ? 'Editar Registro de Tiempo' : 'Crear Registro de Tiempo'}</h2>
        </div>
        <form onSubmit={handleSubmit} className='w-1/2'>
          <div className='w-full flex flex-col gap-4'>
            <select value={ParticipanteId} onChange={(event) => setParticipanteId(event.target.value || '')} className="p-2 border rounded w-full">
              <option value="">Seleccione un participante</option>
              {participantes.map(participante => (
                <option key={participante._id} value={participante._id}>{`${participante.nombre} ${participante.apellido}`}</option>
              ))}
            </select>
            <select value={CompetenciaId} onChange={(event) => setCompetenciaId(event.target.value || '')} className="p-2 border rounded w-full">
              <option value="">Seleccione una competencia</option>
              {competencias.map(competencia => (
                <option key={competencia._id} value={competencia._id}>{competencia.nombre}</option>
              ))}
            </select>
            <input type="number" placeholder="Kilómetros" value={Kilometros} onChange={(event) => setKilometros(event.target.value)} className="p-2 border rounded w-full" />
            <input type="text" placeholder="Tiempo" value={Tiempo} onChange={(event) => setTiempo(event.target.value)} className="p-2 border rounded w-full" />
            <input type="text" placeholder="Lugar" value={Lugar} onChange={(event) => setLugar(event.target.value)} className="p-2 border rounded w-full" />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 hover:cursor-pointer mr-2 mt-4">
            {registroEdit ? 'Actualizar' : 'Guardar'}
          </button>
          <button onClick={onHide} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 ml-2 hover:cursor-pointer" type="button">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalRegistroTiemposCrearEditar;

