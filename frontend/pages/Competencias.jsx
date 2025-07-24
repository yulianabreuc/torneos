import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import CompetenciaForm from '../components/CompetenciaForm'
import axios from 'axios';
import ModalParticipanteCompeticion from '../components/ModalParticipanteCompeticion'

const Competencias = () => {
  const [competencias, setCompetencias] = useState([])
  const [selectedCompetencia, setSelectedCompetencia] = useState(null)
  const [dataCompetenciaEdit, setDataCompetenciaEdit] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState('list')
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [modalQuestion, setModalQuestion] = useState(false);
  const [modalParticipante, setModalParticipante] = useState(false);

  const fetchCompetencias = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://127.0.0.1:3000/api/competencias', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status !== 200) {
        throw new Error('Error al obtener las competencias')
      }
      setCompetencias(response.data)
      setLoading(false)
      console.log(response.data)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCompetencias()
  }, [])

  const isAdmin = localStorage.getItem('rol') === 'userAdmin'

  const setCreatedCompetencia = () => {
    setOptions('created')
    setSelectedCompetencia(null)
  }

  const hasError = (message) => {
    setMessage('');
    setTimeout(() => {
      setMessage(message);
      setIsError(true);
    }, 10);
  };

  const closeModal = () => {
    setMessage('');
    setIsError(false);
  };

  const actionComplete = (data) => {
    if (data._id) {
      let mensaje = ''
      if (dataCompetenciaEdit) {
        setDataCompetenciaEdit(null);
        mensaje = 'Competencia actualizada exitosamente';
      } else {
        mensaje = 'Competencia creada exitosamente';
      }
      setMessage(mensaje);
      setIsError(false);
      setOptions('list');
      setSelectedCompetencia(null);
      fetchCompetencias();
    } else {
      hasError(data.error);
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('es-ES', options);
  };

  const handleDelete = async () => {
    try {
      console.log(selectedCompetencia)
      const token = localStorage.getItem('token')
      const response = await axios.delete(`http://127.0.0.1:3000/api/competencias/${selectedCompetencia._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status !== 200) {
        throw new Error('Error al eliminar la competencia')
      }
      fetchCompetencias()
      setModalQuestion(false)
      setMessage('Competición eliminada exitosamente');
      setIsError(false);
      setOptions('list');
      setSelectedCompetencia(null);
    } catch (err) {
      hasError(err.message)
    }
  }

  const addParticipanteCompeticion = async (data) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(`http://127.0.0.1:3000/api/competencias/${selectedCompetencia._id}/participantes`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status !== 200) {
        throw new Error('Error al registrar el participante')
      }
      fetchCompetencias()
      setModalParticipante(false)
      setMessage('Participante registrado exitosamente');
      setIsError(false);
    } catch (err) {
      hasError(err.message)
    }
  }
  return (
    <>
      <div className="h-screen flex flex-row">
        <Navbar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex flex-row flex-1 p-6 gap-8">
            <div className="w-1/3 p-4 overflow-y-auto rounded-lg shadow-md border-2 border-salmonThema relative">
              <h2 className="text-xl font-semibold mb-8 text-white">Lista de Competencias</h2>
              {loading ? (
                <p className="text-white">Cargando competencias...</p>
              ) : error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : competencias.length > 0 ? (
                <ul className="space-y-2">
                  {competencias.map((competencia) => (
                    <li
                      key={competencia._id}
                      className={`flex items-center p-2 hover:bg-grissThema cursor-pointer rounded-md border-2 border-salmonThema mb-4 ${
                        selectedCompetencia?._id === competencia._id ? 'bg-gray-300 text-black' : 'text-white'
                      }`}
                      onClick={() => setSelectedCompetencia(competencia) || setOptions('list')}
                    >
                      <span
                        className={`block w-2 h-2 rounded-full mr-2 ${
                          competencia.estado === 'abierta' ? 'bg-green-500' : competencia.estado === 'cerrada' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                      />
                      {competencia.nombre} - {formatDate(competencia.fecha_competencia)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white">No hay competencias registradas.</p>
              )}
              {isAdmin && (
                <div className="absolute bottom-4 right-4 justify-end mt-4">
                  <button
                    className="bg-grissThema text-white p-2 rounded-full shadow-md hover:bg-[#37474f] w-10 h-10 hover:cursor-pointer"
                    title="Crear nueva competencia"
                    onClick={setCreatedCompetencia}
                  >
                    +
                  </button>
                </div>
              )}
              <p className="text-white mt-4 flex items-center justify-start absolute bottom-4">
                <span className="bg-green-500 rounded-full w-2 h-2 mx-2" />
                Abierta<br />
                <span className="bg-yellow-500 rounded-full w-2 h-2 mx-2" />
                Cerrada<br />
                <span className="bg-red-500 rounded-full w-2 h-2 mx-2" />
                Terminada
              </p>
            </div>

            <div className="w-2/3 p-4 border-2 rounded-lg shadow-md border-salmonThema">
              <h2 className="text-xl font-semibold mb-4 text-white">Detalles de la Competencia</h2>
              <div className="p-6 rounded-lg flex justify-center items-center">
                {selectedCompetencia && options === 'list' ? (
                  <div>
                    <div className="mb-4 flex flex-col justify-start items-start">
                      <h3 className="text-2xl font-bold text-white mb-2">Competencia: {selectedCompetencia.nombre}</h3>
                      <p className="text-white mb-4"><span className="font-semibold">Descripción:</span> {selectedCompetencia.descripcion || 'No hay descripción para esta competencia.'}</p>
                      <p className="text-white mb-4"><span className="font-semibold">Fecha de la Competencia:</span> {formatDate(selectedCompetencia.fecha_competencia)}</p>
                      <p className="text-white mb-4"><span className="font-semibold">Fecha Límite de Inscripción:</span> {formatDate(selectedCompetencia.fecha_limite_inscripcion)}</p>
                      <p className="text-white mb-4"><span className="font-semibold">Estado:</span> {selectedCompetencia.estado}</p>
                      <p className="text-white mb-4"><span className="font-semibold">Total Participantes:</span> {selectedCompetencia.total_participantes}</p>
                    </div>
                    <div className="mt-4">
                      {isAdmin && (
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer" onClick={() => setModalParticipante(true)}>
                          Registrar Participante
                        </button>
                      )}
                      {isAdmin && (
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4 hover:cursor-pointer" onClick={() =>setOptions('created') || setDataCompetenciaEdit(selectedCompetencia) || setSelectedCompetencia(null)}>
                          Editar
                        </button>
                      )}
                      {isAdmin && (
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4 hover:cursor-pointer" onClick={() => setModalQuestion(true)}>
                          Eliminar
                        </button>
                      )}
                    </div>
                  </div>
                ) : options === 'list' ? (
                  <p className="text-white bg-grissThema shadow-md p-4 rounded-lg">Seleccione una competencia de la lista para ver sus detalles.</p>
                ) : (
                  <CompetenciaForm hasError={hasError} addParticipanteCompeticion={addParticipanteCompeticion} />
                )}
              </div>
            </div>
          </div>
        </div>
        {message && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
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
              <h3 className="text-xl font-bold mb-4">¿Estas seguro de eliminar la competencia?</h3>
              <div className="flex justify-between w-full">
                <button
                  className="mt-2 bg-azulThema text-white px-6 py-2 rounded hover:bg-azulThema/80 transition-colors"
                  onClick={() => setModalQuestion(false)}
                >
                  Cancelar
                </button>
                <button
                  className="mt-2 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
                  onClick={handleDelete}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
        {modalParticipante && (
          <ModalParticipanteCompeticion onHide={() => setModalParticipante(false)} actionComplete={actionComplete} />
        )}
      </div>
    </>
  )
}

export default Competencias

