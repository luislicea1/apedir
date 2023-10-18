import { Image } from "@nextui-org/react";

export default function EventoCard() {
  const img = {
    height: "70vh",
    width: "100%",
    objectFit: "cover",
  };

  const center = {
    width: "100%",
    height: "100%",
    display: "grid",
    placeItems: "center",
  };
  return (
    <div style={center}>
      <Image
        style={img}
        src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
        alt="NextUI Album Cover Image with delay"
        classNames="m-5"
      />
    </div>
  );
}
