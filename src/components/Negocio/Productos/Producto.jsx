import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function Producto(props){
    const CardStyles = {
        height: "100%",
        maxHeight: "400px",
      };
      const ImgCardStyle = {
        height: "100%",
        display: "grid",
        placeItems: "center",
      };
      const ImgStyle = {
        maxHeight: "200px",
        borderRadius: "20px",
      };
    return(
        <Card
          shadow="sm"
          key={props.index}
          isPressable
          onPress={() => console.log("item pressed")}
          style={CardStyles}
        >
          <CardBody className="overflow-visible p-0" style={ImgCardStyle}>
            <Image
              radius="lg"
              width="100%"
              alt="Card background NextUI hero Image with delay"
              className="object-cover rounded-xl"
              src={props.img}
              style={ImgStyle}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{props.title}</b>
            <p className="text-default-500">{props.price}</p>
          </CardFooter>
        </Card>
    );
}