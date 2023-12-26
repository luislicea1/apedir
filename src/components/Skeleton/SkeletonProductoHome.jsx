import React from "react";
import { Card,Skeleton } from "@nextui-org/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function SkeletonProductosHome(props) {
  return (
    <Card
      isFooterBlurred
      className="w-full h-[300px] col-span-12 sm:col-span-5 card-producto-list-home"
      style={{
        boxShadow: "none",
        position: "relative",
        border: ".8px solid #D4D4D8",
      }}
    >
      <Skeleton
        effect="blur"
        removeWrapper
        alt="Card example background"
        src={props.image}
        style={{ width: "100%", objectFit: "cover" }}
        placeholderSrc={props.imagen}
        useIntersectionObserver={true}
        className="lazyload-producto-home"
      />
      <div className="bg-black-bottom-top"></div>

      
    </Card>
  );
}
