import React from "react";
import Like from "../Like/Like";
import { Button } from "@nextui-org/react";
import TelefonoIcon from "../Icons/Llamada/Telefono";
import { Link } from "@nextui-org/react";
import LocationIcon from "../Icons/Location/Location";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

export default function BotonesEventos() {
  
  
  const margin = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
    
  };

 
  const full = {
    width: "100%",
    color: "black"
  }

  return (
    <div className="flex gap-4 items-center" style={margin}>
      <Link href="#"  style= {full}>
        <Button color="primary"  style={full}>
          <p>Contactenos</p>
          
        </Button>
      </Link>

      
    </div>
  );
}
