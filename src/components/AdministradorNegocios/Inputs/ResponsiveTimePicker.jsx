import React, { useState, useCallback } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { Card } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  placeItems: "center",
  minHeight: "100px",
  width: "100%",
  gap: "10px",
  padding: "10px",
};
const gridContainer = {
  display: 'grid',
  gridTemplateColumns: "repeat(1,1fr)",
  placeItems: 'center',
  gap: "10px"
}

const diaTitle = {
  fontSize: "20px",
  fontWeight: "bold"
}


const CardComponent = React.memo(function CardComponent({ dia, index, dias, setDias }) {
  const handleCheckboxChange = useCallback((event) => {
    setDias(
      dias.map((d, i) =>
        i === index ? { ...d, trabaja: event.target.checked } : d
      )
    );
  }, [dias]);

  const handleTimePickerChange = useCallback((newValue, key) => {
    setDias(
      dias.map((d, i) =>
        i === index ? { ...d, [key]: newValue } : d
      )
    );
  }, [dias]);

  return (
    <Card style={grid} key={index} className="card-horarios-picker">
      <div>
        <h2 style={diaTitle}>{dia.dia}</h2>
      </div>
      <div>
        <Checkbox
          checked={dia.trabaja}
          color="secondary"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="">Trabaja</label>
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoItem label="Hora de Entrada">
          <MobileTimePicker
            defaultValue={dayjs("2022-04-17T15:30")}
            onChange={(newValue) => handleTimePickerChange(newValue, 'entrada')}
          />
        </DemoItem>

        <DemoItem label="Hora de Salida">
          <MobileTimePicker
            defaultValue={dayjs("2022-04-17T15:30")}
            onChange={(newValue) => handleTimePickerChange(newValue, 'salida')}
          />
        </DemoItem>
      </LocalizationProvider>
    </Card>
  );
});

export default function ResponsiveTimePickers() {


  const [dias, setDias] = useState([
    { dia: "Lunes", entrada: null, salida: null, trabaja: true },
    { dia: "Martes", entrada: null, salida: null, trabaja: true },
    { dia: "Miercoles", entrada: null, salida: null, trabaja: true },
    { dia: "Jueves", entrada: null, salida: null, trabaja: true },
    { dia: "Viernes", entrada: null, salida: null, trabaja: true },
    { dia: "Sábado", entrada: null, salida: null, trabaja: true },
    { dia: "Domingo", entrada: null, salida: null, trabaja: true },
    // Repite para los demás días de la semana
  ]);

  const handleClick = () => {
    dias.forEach((d) => {
      if (d.trabaja) {
        alert(`${d.dia}: Entrada: ${d.entrada}, Salida: ${d.salida}`);
      } else {
        alert(`${d.dia}: No se trabaja`);
      }
    });
  };



  return (
    <div style={gridContainer}>
      {dias.map((dia, index) => (
        <CardComponent dia={dia} index={index} dias={dias} setDias={setDias} />
      ))}
      <button onClick={handleClick}>Mostrar horarios</button>
    </div>
  );
}
