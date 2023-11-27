
import React, { useEffect, useState } from 'react';

function AppWrapper(props) {
  const [isIdle, setIsIdle] = useState(false);
  const IDLE_TIMEOUT = 1 * 60 * 1000; // 5 minutos

  useEffect(() => {
    let idleTimer = null;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), IDLE_TIMEOUT);
    };

    resetIdleTimer();
    document.addEventListener('mousemove', resetIdleTimer);
    document.addEventListener('keydown', resetIdleTimer);
    document.addEventListener('scroll', resetIdleTimer);

    return () => {
      // Limpiar el temporizador y los eventos cuando el componente se desmonte
      clearTimeout(idleTimer);
      document.removeEventListener('mousemove', resetIdleTimer);
      document.removeEventListener('keydown', resetIdleTimer);
      document.removeEventListener('scroll', resetIdleTimer);
    };
  }, []);

  if (isIdle) {
    // Recargar la página si el usuario está inactivo
    window.location.reload();
  }

  return <>{props.children}</>;
}

export default AppWrapper;
