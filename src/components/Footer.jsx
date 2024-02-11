import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold mb-2">Creado por er elegy</h2>
          <p>Correo electrónico: quepicara@HOTmail.com</p>
          <p>Teléfono: 666</p>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-2">Haciendo el baina desde el 92</h2>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-300 hover:text-blue-400">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </a>
            <a href="#" className="text-blue-300 hover:text-blue-400">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l-7-7 7-7 7 7-7 7zm0 0v-8"
                />
              </svg>
            </a>
            {/* Agrega más íconos y enlaces a otras redes sociales aquí */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
