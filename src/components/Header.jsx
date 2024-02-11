import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="https://www.lecturas.com/medio/2021/01/19/la-isla-de-las-tentaciones-logo_2904b3d2_1280x720.jpg" alt="Logo" className="w-30 h-20 mr-2" />
        <h1 className="text-xl font-bold">Putiapuestas</h1>
      </div>
      <nav>
        <ul className="flex">
          <li className="ml-4">
            {username ? `Bienvenido, ${username} a la putiapp de apuestas` : 'Bienvenido a la putiapp de apuestas'}
          </li>
          
          {/* Agrega más enlaces según sea necesario */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
