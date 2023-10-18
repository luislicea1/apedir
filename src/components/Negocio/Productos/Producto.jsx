import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function Producto(props){
  const navigate = useNavigate();
    const CardStyles = {
        height: "100%",
        //minHeight: "300px",
        maxHeight: "500px",
      };
      const ImgCardStyle = {
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        aspectRatio: "16 / 9", 
      };
      const ImgStyle = {
        width: "100%",
        height: "100%",
        maxHeight: "400px",
        borderRadius: "10px",
        
      };
    return(
      <Link onClick={() => navigate(`/lugar/${props.localizacion}/${props.nombre}/producto/${props.title}`)}>
        <Card
          shadow="sm"
          key={props.index}
          isPressable
          onPress={() => console.log("item pressed")}
          style={CardStyles}
          className="producto-card"
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

      </Link>
    );
}
