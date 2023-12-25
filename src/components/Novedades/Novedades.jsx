import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";

export default function Novedades(props) {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <Card className="max-w-[340px]" style={{width: "90%", boxShadow: "none", border: ".8px solid #D4D4D8"}}>
      <CardHeader className="justify-between" style={{marginBottom: "10px"}}>
        <div className="flex gap-5" style={{gap: "15px"}}>
          <Avatar isBordered radius="full" size="md" src="/avatars/avatar-1.png" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{props.name}</h4>
            <h5 className="text-small tracking-tight text-default-400">{props.province}</h5>
          </div>
        </div>
        {/* <Button
          className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button> */}
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400" style={{marginBottom: "10px"}}>
        <p>
          {props.novedad}
        </p>
        
      </CardBody>
      {/* <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">4</p>
          <p className=" text-default-400 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">97.1K</p>
          <p className="text-default-400 text-small">Followers</p>
        </div>
      </CardFooter> */}
    </Card>
  );
}

