import React from "react";
import {Card, CardFooter, Image, Button} from "@nextui-org/react";

export default function ProductosHome(props) {
    console.log(props.image)
  return (
    <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
    
    <Image
      removeWrapper
      alt="Card example background"
      className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
      src={props.image}
      width={300}
      height={30}
      style={{zIndex: "3000", background: "gray"}}
    />

    <img src={props.image} alt="" />
    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
      <div>
        <p className="text-black text-tiny">{props.name}</p>
        <p className="text-black text-tiny">Get notified.</p>
      </div>
      <Button className="text-tiny" color="primary" radius="full" size="sm">
        Notify Me
      </Button>
    </CardFooter>
  </Card>
  );
}
