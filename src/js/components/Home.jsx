import React, { useState, useEffect, useRef } from 'react';

import ContadorSegundos from './ContadorSegundos';

const Home = () => {
  const [segundos, setSegundos] = useState(0);
  const [estaCorriendo, setEstaCorriendo] = useState(true);
  const [tiempoAlerta, setTiempoAlerta] = useState(null); // Estado para el tiempo de alerta
  const intervaloRef = useRef(null);

  useEffect(() => {
    if (estaCorriendo) {
      intervaloRef.current = setInterval(() => {
        setSegundos((prevSegundos) => prevSegundos + 1);
      }, 1000);
    } else {
      clearInterval(intervaloRef.current);
    }
    return () => clearInterval(intervaloRef.current);
  }, [estaCorriendo]);

  useEffect(() => {
    if (tiempoAlerta !== null && segundos === tiempoAlerta) {
      alert(`Tiempo alcanzado: ${tiempoAlerta} segundos`);
    }
  }, [segundos, tiempoAlerta]);

  const pararContador = () => setEstaCorriendo(false);
  const reiniciarContador = () => {
    setEstaCorriendo(false);
    setSegundos(0);
    setEstaCorriendo(true);
  };
  const resumirContador = () => setEstaCorriendo(true);
  const manejarCambioAlerta = (e) => setTiempoAlerta(Number(e.target.value));

  return (
    <div className="text-center">
      <ContadorSegundos segundos={segundos} />
      <div className="btn-group mt-3" role="group">
        <button className="btn btn-danger" onClick={pararContador}>Parar</button>
        <button className="btn btn-warning" onClick={reiniciarContador}>Reiniciar</button>
        <button className="btn btn-primary" onClick={resumirContador}>Resumir</button>
      </div>
      <div className="mt-3">
        <label className='tiempoElegido' htmlFor="tiempoAlerta">-Tiempo para la alerta (segundos):-  </label>
        <input type="number" id="tiempoAlerta" onChange={manejarCambioAlerta} />
      </div>
    </div>
  );
};

export default Home;
