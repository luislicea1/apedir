import React from "react";
import {Image} from "@nextui-org/react";

export const NegocioLogo = (props) => (
  <Image src={props.logo} alt="" width={'50px'} className="ml-2" style={{minWidth: "50px"}}/>
);
