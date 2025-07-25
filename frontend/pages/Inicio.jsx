import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import axios from 'axios';

const Inicio = () => {
    const [competencias, setCompetencias] = useState([]);
    const [participantes, setParticipantes] = useState([]);
    const [selectedCompetencia, setSelectedCompetencia] = useState('');
    const [selectedParticipante, setSelectedParticipante] = useState('');
    const [dataSearch, setDataSearch] = useState([]);

    useEffect(() => {
        const fetchCompetencias = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3000/api/competencias');
                setCompetencias(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchParticipantes = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3000/api/participantes');
                setParticipantes(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCompetencias();
        fetchParticipantes();
    }, []);

    const searchData = async () => {
        if (!(selectedCompetencia || selectedParticipante)) {
            console.log('No se están pasando los parámetros correctos');
            setDataSearch([]);
            return;
        }
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/search', {
            params: {
                competencia: selectedCompetencia,
                participante: selectedParticipante
            }
            });
            console.log('Se recibió la respuesta de la API');
            console.log(response.data);
            setDataSearch(response.data);
        } catch (err) {
            console.error(err);
            setDataSearch([]);
        }
        };

    return (
        <>
            <div className="h-screen flex flex-row">
                <Navbar />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <div className="flex flex-col flex-1 p-6 gap-8 justify-start items-center">
                        <div className="w-11/12 p-4 rounded-lg shadow-md border-2 border-salmonThema flex flex-col justify-center items-center">
                            <div className="flex flex-row items-center gap-4 justify-center">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="competencia" className="text-salmonThema">Competencia</label>
                                    <select id="competencia" className="p-2 rounded-md border-2 border-salmonThema" value={selectedCompetencia} onChange={(e) => setSelectedCompetencia(e.target.value)}>
                                        <option value="">Seleccione una competencia</option>
                                        {competencias.map((competencia) => (
                                            <option key={competencia._id} value={competencia._id}>{competencia.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="participante" className="text-salmonThema">Participante</label>
                                    <select id="participante" className="p-2 rounded-md border-2 border-salmonThema" value={selectedParticipante} onChange={(e) => setSelectedParticipante(e.target.value)}>
                                        <option value="">Seleccione un participante</option>
                                        {participantes.map((participante) => (
                                            <option key={participante._id} value={participante._id}>{participante.nombre} {participante.apellido}</option>
                                        ))}
                                    </select>
                                </div>
                                <button className="bg-salmonThema text-white p-2 rounded-md mt-8 cursor-pointer" onClick={searchData}>Buscar</button>
                            </div>
                        </div>
                        {dataSearch.participantes && (
                            <div className="w-11/12 p-4 rounded-lg shadow-md border-2 border-salmonThema flex flex-col justify-center items-center">
                                <h2 className="text-2xl font-bold mb-4">Participantes</h2>
                                <table className="table-auto w-full text-left text-grissThema">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2">Nombre</th>
                                            <th className="px-4 py-2">Apellido</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataSearch.participantes.map((participante) => (
                                            <tr key={participante._id}>
                                                <td className="border px-4 py-2">{participante.nombre}</td>
                                                <td className="border px-4 py-2">{participante.apellido}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {dataSearch.competencias && (
                            <div className="w-11/12 p-4 rounded-lg shadow-md border-2 border-salmonThema flex flex-col justify-center items-center">
                                <h2 className="text-2xl font-bold mb-4">Competencias</h2>
                                <table className="table-auto w-full text-left text-grissThema">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2">Nombre</th>
                                            <th className="px-4 py-2">Descripcion</th>
                                            <th className="px-4 py-2">Fecha de la competencia</th>
                                            <th className="px-4 py-2">Fecha Limite</th>
                                            <th className="px-4 py-2">Estado</th>
                                            <th className="px-4 py-2">limite de participantes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataSearch.competencias.map((competencia) => (
                                            <tr key={competencia._id}>
                                                <td className="border px-4 py-2">{competencia.nombre}</td>
                                                <td className="border px-4 py-2">{competencia.descripcion}</td>
                                                <td className="border px-4 py-2">{competencia.fecha_competencia}</td>
                                                <td className="border px-4 py-2">{competencia.fecha_limite_inscripcion}</td>
                                                <td className="border px-4 py-2">{competencia.estado}</td>
                                                <td className="border px-4 py-2">{competencia.total_participantes}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {dataSearch.registros && (
                            <div className="w-11/12 p-4 rounded-lg shadow-md border-2 border-salmonThema flex flex-col justify-center items-center">
                                <h2 className="text-2xl font-bold mb-4">Registros</h2>
                                <table className="table-auto w-full text-left text-grissThema">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2">Kilometros</th>
                                            <th className="px-4 py-2">Tiempo</th>
                                            <th className="px-4 py-2">Lugar</th>
                                            <th className="px-4 py-2">Fecha de registro</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataSearch.registros.map((registro) => (
                                            <tr key={registro._id}>
                                                <td className="border px-4 py-2">{registro.kilometros}</td>
                                                <td className="border px-4 py-2">{registro.tiempo}</td>
                                                <td className="border px-4 py-2">{registro.lugar}</td>
                                                <td className="border px-4 py-2">{registro.fecha_registro}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inicio;


