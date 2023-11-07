
import React from "react";
import {Accordion, AccordionItem} from "@nextui-org/react";

export default function AyudaInformacionContainer() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Accordion variant="splitted">
      <AccordionItem key="1" aria-label="Accordion 1" title="¿Cómo crear mi negocio?">
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="¿Cómo  realizar el pago?">
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="¿Cómo  añadir mi localización?">
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="4" aria-label="Accordion 4" title="¿Cómo añadir redes como facebook e instagram?">
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="5" aria-label="Accordion 5" title="¿Cómo adquirir un plan?">
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
}
