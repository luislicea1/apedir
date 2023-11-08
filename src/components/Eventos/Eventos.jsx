import React, { lazy, Suspense } from "react";
import { Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { EventoCardStyles, eventoMargin, badge } from "../styles/styles";
import { Skeleton } from "@nextui-org/react";

const LazyAvatar = lazy(() => import("./LazyAvatar"));

export default function Eventos(props) {
  const navigate = useNavigate();

  return (
    <div className="" style={eventoMargin}>
      <Link onClick={() => navigate(`/evento/${props.nombre}`)}>
        <Suspense
          fallback={
            <Skeleton className="rounded-lg">
              <div className="h-24 rounded-lg bg-default-300"></div>
            </Skeleton>
          }
        >
          <LazyAvatar src={props.imagen} style={EventoCardStyles} />
        </Suspense>
      </Link>
    </div>
  );
}
