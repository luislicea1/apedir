import { Card, Input, Textarea, Button } from "@nextui-org/react";

export default function InputsPedido() {
    const styles = {
        display: 'grid',
        gap: '20px'
    }
  return (
    <Card className="p-5" style={styles}>
      <Input
        type="text"
        variant="bordered"
        label="Nombre"
        placeholder="Escriba el nombre de la persona encargada de resivir el pedido"
        labelPlacement="outside"
      />

      <Textarea
        variant="bordered"
        label="Dirección"
        labelPlacement="outside"
        placeholder="Dirección a donde enviar el pedido"
        className="col-span-12 md:col-span-6 mb-6 md:mb-0"
      />

      <Textarea
        variant="bordered"
        label="Algun otro detalle"
        labelPlacement="outside"
        placeholder="Existe algun otro detalle como tocar el timbre, cuidado que hay perro, segunda planta etc que quieras añadir"
        className="col-span-12 md:col-span-6 mb-6 md:mb-0"
      />
      <Button color="primary" className="mt-2">Realizar el Pedido</Button>
    </Card>
  );
}
