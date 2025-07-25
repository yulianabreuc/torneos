import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModalParticipanteCrearEditar = ({ onHide, saveParticipante, hasError, participanteEdit }) => {
  const [Nombre, setNombre] = useState(participanteEdit ? participanteEdit.nombre : '');
  const [Apellido, setApellido] = useState(participanteEdit ? participanteEdit.apellido : '');
  const [Correo, setCorreo] = useState(participanteEdit ? participanteEdit.correo : '');
  const [Cedula, setCedula] = useState(participanteEdit ? participanteEdit.cedula : '');
  const [Telefono, setTelefono] = useState(participanteEdit ? participanteEdit.telefono : '');
  const [Edad, setEdad] = useState(participanteEdit ? participanteEdit.edad : null);
  const [Sexo, setSexo] = useState(participanteEdit ? participanteEdit.sexo : '');
  const [Pais, setPais] = useState(participanteEdit ? participanteEdit.pais : '');
  const [Categoria, setCategoria] = useState(participanteEdit ? participanteEdit.categoria : '');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      nombre: Nombre,
      apellido: Apellido,
      correo: Correo,
      cedula: Cedula,
      telefono: Telefono,
      edad: Edad,
      sexo: Sexo,
      pais: Pais,
      categoria: Categoria
    };
    // Validar que los campos no estén vacíos
    if (!Nombre || !Apellido || !Correo || !Cedula || !Telefono || !Edad || !Sexo || !Pais || !Categoria) {
      hasError('Todos los campos son obligatorios');
      return;
    }
    if (participanteEdit) {
      saveParticipante(participanteEdit._id, data);
    } else {
      saveParticipante(null, data);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="bg-azulThema p-8 rounded-2xl shadow-md flex flex-col items-center justify-center w-3/5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{participanteEdit ? 'Editar Participante' : 'Crear Participante'}</h2>
        </div>
        <form onSubmit={handleSubmit} className='w-1/2'>
          <div className='w-full flex flex-col gap-4'>
            <input type="text" placeholder="Nombre" value={Nombre} onChange={(event) => setNombre(event.target.value)} className="p-2 border rounded w-full" />
            <input type="text" placeholder="Apellido" value={Apellido} onChange={(event) => setApellido(event.target.value)} className="p-2 border rounded w-full" />
            <input type="email" placeholder="Correo electrónico" value={Correo} onChange={(event) => setCorreo(event.target.value)} className="p-2 border rounded w-full" />
            <input type="text" placeholder="Cedula" value={Cedula} onChange={(event) => setCedula(event.target.value)} className="p-2 border rounded w-full" />
            <input type="text" placeholder="Telefono" value={Telefono} onChange={(event) => setTelefono(event.target.value)} className="p-2 border rounded w-full" />
            <input type="number" placeholder="Edad" value={Edad} onChange={(event) => setEdad(event.target.valueAsNumber)} className="p-2 border rounded w-full" />
            <select value={Sexo} onChange={(event) => setSexo(event.target.value)} className="p-2 border rounded w-full">
              <option value="">Seleccione sexo</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
            <input type="text" placeholder="Pais" value={Pais} onChange={(event) => setPais(event.target.value)} className="p-2 border rounded w-full" />
            <select value={Categoria} onChange={(event) => setCategoria(event.target.value)} className="p-2 border rounded w-full">
              <option value="">Seleccione una categoría</option>
              <option value="infantil">Infantil</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
              <option value="máster">Máster</option>
              <option value="élite">Élite</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 hover:cursor-pointer mr-2 mt-4">
            {participanteEdit ? 'Actualizar' : 'Guardar'}
          </button>
          <button onClick={onHide} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 ml-2 hover:cursor-pointer" type="button">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalParticipanteCrearEditar;

