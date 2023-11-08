// LazyAvatar.js
import React from "react";
import { Avatar } from "@nextui-org/react";

export default function LazyAvatar(props) {
 return (
   <Avatar
     isBordered
     radius="md"
     color="danger"
     src={props.src}
     style={props.style}
   />
 );
}
