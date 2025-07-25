import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import ModalParticipanteCrearEditar from '../components/ModalParticipanteCrearEditar'
import axios from 'axios';
import ModalRegistroTiemposCrearEditar from '../components/ModalRegistroTiemposCrearEditar';


const Records = () => {
  const [loading, setLoading] = useState(true)
  const [loadingRegistros, setLoadingRegistros] = useState(true)
  const [error, setError] = useState(null)
  const [participantes, setParticipantes] = useState([])
  const [selectedpart, setSelectedParticipante] = useState(null)
  const [modalParticipante, setModalParticipante] = useState(false)
  const [modalRegistro, setModalRegistro] = useState(false)
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [modalQuestion, setModalQuestion] = useState(false);
  const [modalQuestionRegistro, setModalQuestionRegistro] = useState(null);
  const [registroSelected, setRegistroSelected] = useState(null);
  const [registrosTiempos, setRegistrosTiempos] = useState([]);



  const fetchParticipantes = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://127.0.0.1:3000/api/participantes/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status !== 200) {
        throw new Error('Error al obtener las competencias')
      }
      setParticipantes(response.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setError(err.message)
      setLoading(false)
    }
  }

  const fetchRegistrosTiempos = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://127.0.0.1:3000/api/registros/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status !== 200) {
        throw new Error('Error al obtener las competencias')
      }
      setRegistrosTiempos(response.data)
      setLoadingRegistros(false)
    } catch (err) {
      console.log(err)
      setError(err.message)
      setLoadingRegistros(false)
    }
  }

  useEffect(() => {
    fetchParticipantes();
    fetchRegistrosTiempos();
  }, [])

  const isAdmin = localStorage.getItem('rol') === 'userAdmin'

  const setCrearRecord = () => {
    //abrir modal de registrar record
    setModalRegistro(true)
  }

  const serCrearParticipante = () => {
    //abrir modal de registrar participante
    setModalParticipante(true)
  }

  const closeModal = () => {
    setMessage('');
    setIsError(false);
    setSelectedParticipante(null);
  };

  const hasError = (message) => {
    setMessage('');
    setTimeout(() => {
      setMessage(message);
      setIsError(true);
    }, 10);
  };

  const saveParticipante = async (id, data) => {
    try {
      const token = localStorage.getItem('token')
      const url = id ? `http://127.0.0.1:3000/api/participantes/${id}` : 'http://127.0.0.1:3000/api/participantes/';
      const method = id ? 'put' : 'post';
      const response = await axios({
        method,
        url,
        data,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status !== (id ? 200 : 201)) {
        throw new Error('Error al registrar el participante');
      }
      if (id) {
        setMessage('Participante actualizado exitosamente');
      } else {
        setMessage('Participante registrado exitosamente');
      }
      setIsError(false);
      fetchParticipantes();
      setModalParticipante(false);
    } catch (err) {
      console.log(err.response.data.error);
      setMessage(err.response.data.error);
      setIsError(true);
    }
  }

  const handleDeleteParticipante = () => {
    setModalQuestion(true);
    setSelectedParticipante(part);
  }

  const handleEditParticipante = (part) => {
    setSelectedParticipante(part);
    setModalParticipante(true);
  }


  const DeleteParticipante = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(`http://127.0.0.1:3000/api/participantes/${selectedpart._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status !== 200) {
        throw new Error('Error al eliminar el participante')
      }
      fetchParticipantes()
      setModalQuestion(false)
      setMessage('Participante eliminado exitosamente');
      setIsError(false);
    } catch (err) {
      hasError(err.message)
    }
  }

  const saveRegistro = async (id, data) => {
    try {
      const token = localStorage.getItem('token')
      const url = id ? `http://127.0.0.1:3000/api/registros/${id}` : 'http://127.0.0.1:3000/api/registros/';
      const method = id ? 'put' : 'post';
      const response = await axios({
        method,
        url,
        data,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status !== (id ? 200 : 201)) {
        throw new Error('Error al registrar el registro');
      }
      if (id) {
        setMessage('Registro actualizado exitosamente');
      } else {
        setMessage('Registro registrado exitosamente');
      }
      setIsError(false);
      setModalRegistro(false);
      fetchRegistrosTiempos();
    } catch (err) {
      console.log(err.response.data.error);
      setMessage(err.response.data.error);
      setIsError(true);
    }
  }

  const handleEditRegistro = (registro) => {
    setRegistroSelected(registro);
    setModalRegistro(true);
  }

  const handleDeleteRegistro = (registro) => {
    setRegistroSelected(registro);
    setModalQuestionRegistro(true);
  }

const DeleteRegistro = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`http://127.0.0.1:3000/api/registros/${registroSelected._id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status !== 200) {
      throw new Error('Error al eliminar el registro');
    }
    fetchRegistrosTiempos();
    setModalQuestionRegistro(false);
    setRegistroSelected(null);
    setMessage('Registro eliminado exitosamente');
    setIsError(false);
  } catch (err) {
    hasError(err.message);
  }
};

    
  

  
  return (
    <>
      <div className="h-screen flex flex-row">
        <Navbar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex flex-row flex-1 p-6 gap-8">
            <div className="w-2/3 p-4 rounded-lg shadow-md border-2 border-salmonThema relative">
               <h2 className="text-xl font-semibold mb-8 text-white">Registros de Tiempos</h2>
               {loadingRegistros ? (
                  <p className="text-white">Cargando Registros...</p>
                ) : error ? (
                  <p className="text-red-500">Error: {error}</p>
                ) : registrosTiempos.length > 0 ? (
                  <table className="w-full text-white text-left border-b border-gray-700 shadow">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="p-3">Competencia</th>
                        <th className="p-3">Kilometros</th>
                        <th className="p-3">Tiempo</th>
                        <th className="p-3">Lugar</th>
                        {isAdmin && 
                          <th className="p-3">Acciones</th>
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {registrosTiempos.map((registro) => (
                        <tr
                          key={registro._id}
                          className="hover:bg-[#37474f] hover:cursor-pointer border-b border-gray-800"
                          onClick={() => handleEditRegistro(registro)}
                        >
                          <td className="p-3">{registro.competencia_id.nombre}</td>
                          <td className="p-3">{registro.kilometros}</td>
                          <td className="p-3">{registro.tiempo}</td>
                          <td className="p-3">{registro.lugar}</td>
                          {isAdmin && (
                            <td className="p-3">
                              <button
                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded hover:cursor-pointer text-sm"
                                onClick={(e) => { e.stopPropagation(); handleEditRegistro(registro); }}
                              >
                                Editar
                              </button>
                              <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded hover:cursor-pointer ml-2 text-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteRegistro(registro);
                                }}
                              >
                                Eliminar
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-white">No hay Registros.</p>
                )}
               {isAdmin && (
                <div className="absolute bottom-4 right-4 justify-end mt-4">
                  <button
                    className="bg-salmonThema text-white p-2 rounded-full shadow-md hover:bg-[#37474f] w-8 h-8 hover:cursor-pointer text-2xl flex items-center justify-center"
                    title="Registrar Rercord"
                    onClick={setCrearRecord}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
            <div className="w-1/3 p-4 rounded-lg shadow-md border-2 border-salmonThema relative">
              <h2 className="text-xl font-semibold mb-8 text-white">Lista de Participantes</h2>
              {loading ? (
                <p className="text-white">Cargando Participantes...</p>
              ) : error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : participantes.length > 0 ? (
                <ul className="space-y-2">
                  {participantes.map((part) => (
                    <li
                      key={part._id}
                      className={`flex items-center p-2 hover:bg-grissThema cursor-pointer rounded-md border-2 border-salmonThema mb-4 ${
                        selectedpart?._id === part._id ? 'bg-gray-300 text-black' : 'text-white'
                      }`}
                    >
                      {part.nombre} {part.apellido} - {part.cedula} - {part.categoria} - {part.edad}
                      {isAdmin && (
                        <div className="flex items-center ml-4">
                          <button
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded hover:cursor-pointer text-sm"
                            onClick={() => handleEditParticipante(part)}
                          >
                            Editar
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded hover:cursor-pointer ml-2 text-sm"
                            onClick={() => handleDeleteParticipante(part)}
                          >
                            Eliminar
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white">No hay Participantes.</p>
              )}
              {isAdmin && (
                <div className="absolute bottom-4 right-4 justify-end mt-4">
                  <button
                    className="bg-salmonThema text-white p-2 rounded-full shadow-md hover:bg-[#37474f] w-8 h-8 hover:cursor-pointer text-2xl flex items-center justify-center"
                    title="Registrar Rercord"
                    onClick={serCrearParticipante}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {modalParticipante && (
          <ModalParticipanteCrearEditar
            onHide={() => setModalParticipante(false) || setSelectedParticipante(null)}
            saveParticipante={saveParticipante}
            hasError={hasError}
            participanteEdit={selectedpart}
          />
        )}
        {modalRegistro && (
          <ModalRegistroTiemposCrearEditar
            onHide={() => setModalRegistro(false) || setRegistroSelected(null)}
            saveRegistro={saveRegistro}
            hasError={hasError}
            registroEdit={registroSelected}
          />
        )}
        {message && (
        <div
          className="fixed inset-0 flex items-center justify-center z-100"
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          <div className={`bg-white rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col items-center ${isError ? 'text-red-900' : 'text-green-900'}`}>
            <h3 className="text-xl font-bold mb-4">{message}</h3>
            <button
              className="mt-2 bg-salmonThema text-white px-6 py-2 rounded hover:bg-salmonThema/80 transition-colors"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
        )}
        {modalQuestion && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ background: 'rgba(0,0,0,0.5)' }}
          >
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col items-center">
              <h3 className="text-xl font-bold mb-4">¿Estas seguro de eliminar el Participante?</h3>
              <div className="flex justify-between w-full">
                <button
                  className="mt-2 bg-azulThema text-white px-6 py-2 rounded hover:bg-azulThema/80 transition-colors"
                  onClick={() => setModalQuestion(false) || setSelectedParticipante(null)}
                >
                  Cancelar
                </button>
                <button
                  className="mt-2 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
                  onClick={DeleteParticipante}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
        {modalQuestionRegistro && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ background: 'rgba(0,0,0,0.5)' }}
          >
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col items-center">
              <h3 className="text-xl font-bold mb-4">¿Estas seguro de eliminar el Registro?</h3>
              <div className="flex justify-between w-full">
                <button
                  className="mt-2 bg-azulThema text-white px-6 py-2 rounded hover:bg-azulThema/80 transition-colors"
                  onClick={() => setModalQuestionRegistro(false) || setRegistroSelected(null)}
                >
                  Cancelar
                </button>
                <button
                  className="mt-2 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
                  onClick={DeleteRegistro}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Records
