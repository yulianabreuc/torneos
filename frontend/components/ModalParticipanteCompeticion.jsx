import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModalParticipanteCompeticion = ({ onHide, addParticipanteCompeticion, hasError, participanteCompetencia }) => {
  const [Nombre, setNombre] = useState('');
  const [Apellido, setApellido] = useState('');
  const [Correo, setCorreo] = useState('');
  const [Cedula, setCedula] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [Edad, setEdad] = useState(null);
  const [Sexo, setSexo] = useState('');
  const [Pais, setPais] = useState('');
  const [Categoria, setCategoria] = useState('');
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
    let data = {};
    if (showFormParticipante) {
      data = {
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
      //validar que los campos no esten vacios
      if (!Nombre || !Apellido || !Correo || !Cedula || !Telefono || !Edad || !Sexo || !Pais || !Categoria) {
        hasError('Todos los campos son obligatorios');
        return;
      }
      addParticipanteCompeticion(data);
    } else {
      const idParticipante = selectedParticipante._id;
      participanteCompetencia(idParticipante, true);
    }
    
  };

  return (
    <div  className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="bg-azulThema p-8 rounded-2xl shadow-md flex flex-col items-center justify-center w-3/5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Registro de Participante</h2>
        </div>
        <form onSubmit={handleSubmit} className='w-1/2'>
        {!showFormParticipante ? (
          <div className='w-full'>
            <select value={selectedParticipante?._id} onChange={(event) => setSelectedParticipante(participantes.find(participante => participante._id === event.target.value))} className="p-2 border rounded w-full mb-4">
                <option value="">Seleccione un participante</option>
                {participantes.map(participante => (
                <option value={participante._id} key={participante._id}>{participante.nombre}</option>
                ))}
            </select>
          </div>
        ) : (
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
                <option value="">Seleccione categoria</option>
                <option value="">Seleccione una categoría</option>
                <option value="infantil">Infantil</option>
                <option value="junior">Junior</option>
                <option value="senior">Senior</option>
                <option value="máster">Máster</option>
                <option value="élite">Élite</option>
            </select>
          </div>
        )}
            <button onClick={() => setShowFormParticipante(!showFormParticipante)} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 hover:cursor-pointer mr-4 mt-4" type="button">
                {showFormParticipante ? 'Agregar uno que ya existe' : 'Crear Nuevo'}
            </button>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 hover:cursor-pointer mr-2">
                Guardar
            </button>
            <button onClick={onHide} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 ml-2 hover:cursor-pointer" type="button">
                Cancelar
            </button>
        </form>
      </div>
    </div>
  );
};

export default ModalParticipanteCompeticion;

