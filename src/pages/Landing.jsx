import React, { useState, useEffect } from 'react';

const Main = () => {
  const [nuevaApuesta, setNuevaApuesta] = useState({ pareja: '', primeroEnCaido: '', segundoEnCaido: '', despechau: '', juntos: '', observaciones: '' });
  const [apuestas, setApuestas] = useState([]);
  const [username, setUsername] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [puntos, setPuntos] = useState({
    Esteban: parseInt(localStorage.getItem('puntosEsteban')) || 0,
    Ana: parseInt(localStorage.getItem('puntosAna')) || 0,
    Maricarmen: parseInt(localStorage.getItem('puntosMaricarmen')) || 0
  });
  const [showUsernameModal, setShowUsernameModal] = useState(false); // Estado para controlar la visibilidad del modal de nombre de usuario

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      setShowUsernameModal(true); // Mostrar el modal si no hay un nombre de usuario almacenado
    }
  }, []);

  useEffect(() => {
    cargarApuestas();
  }, []);

  const cargarApuestas = () => {
    const apuestasGuardadas = JSON.parse(localStorage.getItem('apuestas')) || [];
    setApuestas(apuestasGuardadas);
  };

  const guardarApuestas = (nuevasApuestas) => {
    localStorage.setItem('apuestas', JSON.stringify(nuevasApuestas));
  };

  const guardarPuntos = (nuevosPuntos) => {
    localStorage.setItem('puntosEsteban', nuevosPuntos.Esteban);
    localStorage.setItem('puntosAna', nuevosPuntos.Ana);
    localStorage.setItem('puntosMaricarmen', nuevosPuntos.Maricarmen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaApuesta(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAgregarApuesta = () => {
    const nuevasApuestas = [...apuestas, { ...nuevaApuesta, username }];
    setApuestas(nuevasApuestas);
    guardarApuestas(nuevasApuestas);
    setNuevaApuesta({ pareja: '', primeroEnCaido: '', segundoEnCaido: '', despechau: '', juntos: '', observaciones: '' });
    setShowAlert(true);
  };

  const handleEliminarApuesta = (index) => {
    const nuevasApuestas = [...apuestas];
    nuevasApuestas.splice(index, 1);
    setApuestas(nuevasApuestas);
    guardarApuestas(nuevasApuestas);
  };

  const handleIncrementarPuntos = (jugador) => {
    const nuevosPuntos = { ...puntos, [jugador]: puntos[jugador] + 1 };
    setPuntos(nuevosPuntos);
    guardarPuntos(nuevosPuntos);
  };

  const handleDecrementarPuntos = (jugador) => {
    if (puntos[jugador] > 0) {
      const nuevosPuntos = { ...puntos, [jugador]: puntos[jugador] - 1 };
      setPuntos(nuevosPuntos);
      guardarPuntos(nuevosPuntos);
    }
  };

  const handleUsernameModalSubmit = (newUsername) => {
    if (newUsername) {
      localStorage.setItem('username', newUsername);
      setUsername(newUsername);
      setShowUsernameModal(false); // Cerrar el modal después de que se ha proporcionado un nombre de usuario
    }
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Apuestas</h2>
      {/* Mostrar el mensaje de alerta si showAlert es true */}
      {showAlert && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-lg" role="alert">
          <p className="font-bold">¡Apuesta agregada con éxito!</p>
          <p>¡Tu apuesta se ha guardado correctamente!</p>
        </div>
      )}

      {/* Modal para ingresar el nombre de usuario */}
      {showUsernameModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Por favor, ingresa tu nombre de usuario:</h2>
            <input
              type="text"
              className="w-full px-4 py-2 mb-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => handleUsernameModalSubmit(username)}
            >
              Enviar
            </button>
          </div>
        </div>
      )}

      {/* Resto del contenido de la página */}
      <table className="w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-2">Usuario</th>
            <th className="px-4 py-2">Descripción</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {apuestas.map((apuesta, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td>{apuesta.username}</td>
              <td>
                <div>
                  <strong>Pareja:</strong> {apuesta.pareja}
                </div>
                <div>
                  <strong>Primero en caer:</strong> {apuesta.primeroEnCaido}
                </div>
                <div>
                  <strong>Segundo en caer:</strong> {apuesta.segundoEnCaido}
                </div>
                <div>
                  <strong>Despechau:</strong> {apuesta.despechau}
                </div>
                <div>
                  <strong>Juntos:</strong> {apuesta.juntos}
                </div>
                <div>
                  <strong>Observaciones:</strong> {apuesta.observaciones}
                </div>
              </td>
              <td>
                <button className="px-2 py-1 bg-red-500 text-white rounded-lg" onClick={() => handleEliminarApuesta(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Nueva Apuesta</h3>
        <div className="flex flex-wrap">
          <input className="w-full md:w-1/2 px-4 py-2 mb-2 md:mr-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none" type="text" name="pareja" placeholder="Pareja" value={nuevaApuesta.pareja} onChange={handleInputChange} />
          <input className="w-full md:w-1/2 px-4 py-2 mb-2 md:ml-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none" type="text" name="primeroEnCaido" placeholder="Primero en caer" value={nuevaApuesta.primeroEnCaido} onChange={handleInputChange} />
          <input className="w-full md:w-1/2 px-4 py-2 mb-2 md:mr-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none" type="text" name="segundoEnCaido" placeholder="Segundo en caer" value={nuevaApuesta.segundoEnCaido} onChange={handleInputChange} />
          <input className="w-full md:w-1/2 px-4 py-2 mb-2 md:ml-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none" type="text" name="despechau" placeholder="Despechau" value={nuevaApuesta.despechau} onChange={handleInputChange} />
          <input className="w-full md:w-1/2 px-4 py-2 mb-2 md:mr-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none" type="text" name="juntos" placeholder="Juntos" value={nuevaApuesta.juntos} onChange={handleInputChange} />
          <input className="w-full md:w-1/2 px-4 py-2 mb-2 md:ml-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none" type="text" name="observaciones" placeholder="Observaciones" value={nuevaApuesta.observaciones} onChange={handleInputChange} />
        </div>
        <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" onClick={handleAgregarApuesta}>Agregar Apuesta</button>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Puntos</h3>
        <div className="flex flex-wrap">
          <div className="mr-2 mb-2">
            <p className="font-semibold">Esteban</p>
            <p>{puntos.Esteban}</p>
            <button className="px-2 py-1 bg-blue-500 text-white rounded-lg mr-1" onClick={() => handleIncrementarPuntos('Esteban')}>+</button>
            <button className="px-2 py-1 bg-blue-500 text-white rounded-lg" onClick={() => handleDecrementarPuntos('Esteban')}>-</button>
          </div>
          <div className="mr-2 mb-2">
            <p className="font-semibold">Ana</p>
            <p>{puntos.Ana}</p>
            <button className="px-2 py-1 bg-blue-500 text-white rounded-lg mr-1" onClick={() => handleIncrementarPuntos('Ana')}>+</button>
            <button className="px-2 py-1 bg-blue-500 text-white rounded-lg" onClick={() => handleDecrementarPuntos('Ana')}>-</button>
          </div>
          <div className="mb-2">
            <p className="font-semibold">Maricarmen</p>
            <p>{puntos.Maricarmen}</p>
            <button className="px-2 py-1 bg-blue-500 text-white rounded-lg mr-1" onClick={() => handleIncrementarPuntos('Maricarmen')}>+</button>
            <button className="px-2 py-1 bg-blue-500 text-white rounded-lg" onClick={() => handleDecrementarPuntos('Maricarmen')}>-</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
