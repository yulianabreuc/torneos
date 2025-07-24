import React, { useState } from 'react';
import axios from 'axios';

const CompetenciaForm = ({ hasError, actionComplete, dataCompetenciaEdit }) => {
  const formatDateForInput = (isoDate) => {
    if (!isoDate) {
      return '';
    }
    return new Date(isoDate).toISOString().slice(0, 10);
  };

  const [Nombre, setNombre] = useState(dataCompetenciaEdit ? dataCompetenciaEdit.nombre : '');
  const [Descripcion, setDescripcion] = useState(dataCompetenciaEdit ? dataCompetenciaEdit.descripcion : '');
  const [FechaCompetencia, setFechaCompetencia] = useState(formatDateForInput(dataCompetenciaEdit?.fecha_competencia));
  const [FechaLimiteInscripcion, setFechaLimiteInscripcion] = useState(formatDateForInput(dataCompetenciaEdit?.fecha_limite_inscripcion));
  const [Estado, setEstado] = useState(dataCompetenciaEdit ? dataCompetenciaEdit.estado : '');
  const [TotalParticipantes, setTotalParticipantes] = useState(dataCompetenciaEdit ? dataCompetenciaEdit.total_participantes : '');
  const [Participantes, setParticipantes] = useState(dataCompetenciaEdit ? dataCompetenciaEdit.Participantes : []);

  const handleSubmit = (event) => {
    event.preventDefault();

    //validar que los campos no esten vacios
    if (!Nombre || !Descripcion || !FechaCompetencia || !FechaLimiteInscripcion || !Estado || !TotalParticipantes) {
      hasError('Todos los campos son obligatorios');
      return;
    }

    // validar que la fecha limite de inscripcion no sea por lo menos 3 dias antes a la fecha de la competencia
    const fechaCompetenciaDate = new Date(FechaCompetencia);
    const fechaLimiteInscripcionDate = new Date(FechaLimiteInscripcion);
    const diffTime = fechaCompetenciaDate - fechaLimiteInscripcionDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    if (diffDays < 3) {
      hasError('La fecha límite de inscripción debe ser al menos 3 días antes de la fecha de la competencia');
      return;
    }

    const data = {
      Nombre,
      Descripcion,
      FechaCompetencia,
      FechaLimiteInscripcion,
      Estado,
      TotalParticipantes,
      Participantes
    };

    if (dataCompetenciaEdit) {
      axios.put(`http://127.0.0.1:3000/api/competencias/${dataCompetenciaEdit._id}`, data)
        .then(response => {
          console.log(response.data);
          // Handle success response
          actionComplete(response.data);
        })
        .catch(error => {
          console.log(error);
          hasError(error.response.data.message || 'Error al editar la competencia');
        });
    } else {
      axios.post('http://127.0.0.1:3000/api/competencias', data)
        .then(response => {
          console.log(response.data);
          // Handle success response
          actionComplete(response.data);
        })
        .catch(error => {
          console.log(error);
          hasError(error.response.data.message || 'Error al registrar la competencia');
        });
    }
    console.log('Formulario enviado:', data);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-2 w-1/2">
      <label className="text-lg font-semibold">Fecha de la Competencia:</label>
      <input type="date" placeholder="Fecha de la Competencia" value={FechaCompetencia} onChange={(event) => setFechaCompetencia(event.target.value)} className="p-2 border rounded w-full" />
      <label className="text-lg font-semibold">Fecha Limite de Inscripción:</label>
      <input type="date" placeholder="Fecha Limite de Inscripción" value={FechaLimiteInscripcion} onChange={(event) => setFechaLimiteInscripcion(event.target.value)} className="p-2 border rounded w-full" />
      <input type="text" placeholder="Nombre Competencia" value={Nombre} onChange={(event) => setNombre(event.target.value)} className="p-2 border rounded w-full" />
      <input type="text" placeholder="Descripción" value={Descripcion} onChange={(event) => setDescripcion(event.target.value)} className="p-2 border rounded w-full" />
      <select value={Estado} onChange={(event) => setEstado(event.target.value)} className="p-2 border rounded w-full">
        <option value="">Seleccione estado</option>
        <option value="abierta">Abierta</option>
        <option value="cerrada">Cerrada</option>
        <option value="terminada">Terminada</option>
      </select>
      <input type="number" placeholder="Total Participantes" value={TotalParticipantes} onChange={(event) => setTotalParticipantes(event.target.value)} className="p-2 border rounded w-full" />
      <button
        type="submit"
        className="bg-grissThema text-salmonThema px-4 py-2 hover:bg-salmonThema/80 transition-colors hover:text-white rounded-xl font-semibold cursor-pointer w-32 mt-5"
      >
        {dataCompetenciaEdit ? 'Editar' : 'Guardar'}
      </button>
    </form>
  );
};

export default CompetenciaForm;
