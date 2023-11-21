// BusinessPage.js
import React, { useState, useEffect } from 'react';
import { loadMoreBussiness } from '../../api/bussiness';
import ComponenteLugar from '../Seccion/ComponenteLugar';
import '../Seccion/seccion.css'

const BusinessPage = () => {
  const [bussinesses, setBussinesses] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Cargar los primeros 6 negocios al montar el componente
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    if (loading) return;

    setLoading(true);

    // Cargar más negocios
    await loadMoreBussiness(offset, setOffset, bussinesses, setBussinesses);

    setLoading(false);
  };

  // Manejar el evento de scroll para cargar más negocios
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadBusinesses();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
    >
     
      <div     
        className="list-container"
        style={{display: 'grid', gridTemplateColumns: "1fr 1fr 1fr"}}
        
        >
        {bussinesses.map((business) => (
          
           <ComponenteLugar
           imagen={business.perfil_pic}
           localizacion={business.province}
           gps_location={business.gps_location}
           nombre={business.name}
           numeroPersonas={business.numeroPersonas}
           url={business.value_url}
           heigth={windowWidth < 713 ? "150px" : "272px"}
         ></ComponenteLugar>
        ))}
      </div>
      {/* {loading && <p>Loading...</p>} */}
    </div>
  );
};

export default BusinessPage;
