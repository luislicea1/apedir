import React from "react";
import { Card, CardHeader, CardBody, Avatar } from "@nextui-org/react";

export default function Novedades({ novedad }) {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <Card className="max-w-[340px]" style={{ width: "90%", boxShadow: "none", border: ".5px solid #E2E2E2" }}>
      <CardHeader className="justify-between" style={{ marginBottom: "10px" }}>
        <div className="flex gap-5" style={{ gap: "15px" }}>
          <Avatar isBordered radius="full" size="md" src={novedad.perfil_pic} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{novedad.name}</h4>
            <h5 className="text-small tracking-tight text-default-400">{novedad.province}</h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400" style={{ marginBottom: "10px" }}>
        <p>
          {novedad.text}
        </p>
      </CardBody>
    </Card>
  );
}

