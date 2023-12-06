import React, { useState } from "react";
import {
  Button,
  Textarea,
  Image,
  Input,
  useDisclosure,
  Modal,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "@nextui-org/react";
import { grid_1_col, grid_2_col } from "../styles/styles";
import { resizeImage } from "../../api/helpers/image";
import { removeImage, uploadImage } from "../../api/images";
import { toast, Toaster } from "sonner";
import InputGmail from "./Inputs/InputGmail";
import InputPhoneNumber from "./Inputs/InputPhoneNumber";
import { deleteEvent, upsertEvent } from "../../api/events";
import { DeleteIcon } from "../Icons/DeleteIcon/DeleteIcon";
import Loader from "../Loader/Loader";

export default function EventCard({ bussinessId, event }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState(null);
  const [render, setRender] = useState(0);
  const defaultEventValues = {
    id: "",
    bussiness:
      bussinessId !== null && bussinessId !== undefined ? bussinessId : "",
    name: "",
    image: "",
    description: "",
    email: "",
    phone_number: "",
  };

  const eventInput = React.useRef(
    event !== null && event !== undefined ? event : defaultEventValues
  );

  const handleDelete = async () => {
    await deleteEvent(event.id);
  };

  const handleAddEvent = async () => {
    setIsLoading(true);
    let eventImage = "";
    if (
      eventInput.current.image !== null &&
      (eventInput.current.image !== "") &
        (eventInput.current.image instanceof Blob)
    ) {
      await removeImage(eventInput.current.image, "events");
      eventImage = await uploadImage(
        eventInput.current.image,
        imageName,
        "events"
      );
      eventImage = eventImage !== null ? eventImage.path : "";
    }
    const updatedEvent = {
      ...eventInput.current,
      image: eventImage,
    };
    await upsertEvent(updatedEvent);
    toast.success("Evento actualizado satisfactoriamente");
    setIsLoading(false);
  };

  const handleImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(URL.createObjectURL(file));

      const extension = file.name.split(".").pop();
      const lowerCaseExtension = extension.toLowerCase();
      const newFileName = file.name.replace(extension, lowerCaseExtension);

      const resizedImage = await resizeImage(file, 500, 500);

      setImageName(newFileName);
      eventInput.current = {
        ...eventInput.current,
        image: resizedImage,
      };
      setRender((render) => render + 1);
    }
  };
  return (
    <div style={{ padding: "5px" }}>
      {event && (
        <section
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <span className="text-danger" onClick={onOpen}>
            <DeleteIcon />
          </span>
        </section>
      )}

      <br />
      <Input
        type="text"
        label="Nombre del evento"
        variant="bordered"
        placeholder="Escribe el nombre del evento"
        labelPlacement="outside"
        value={eventInput.current.name}
        onChange={(event) => {
          eventInput.current = {
            ...eventInput.current,
            name: event.target.value,
          };
          setRender((render) => render + 1);
        }}
      />
      <div>
        <input
          type="file"
          id="logoImageUpload"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <br />
        <div style={grid_1_col}>
          <Image
            width={272}
            height={272}
            alt="Imagen del evento"
            src={image || eventInput.current.image}
          />
        </div>

        <Button
          style={{ color: "white" }}
          // style={white}
          color={"secondary"}
          onClick={() => document.getElementById("logoImageUpload").click()}
          className="mt-2"
        >
          Subir foto del evento
        </Button>
        <br />
        <br />
        <Textarea
          label="Descripción"
          labelPlacement="outside"
          style={{ width: "300px", height: "230px" }}
          placeholder="Escribe la descripción del evento"
          variant="bordered"
          value={eventInput.current.description}
          onChange={(event) => {
            eventInput.current = {
              ...eventInput.current,
              description: event.target.value,
            };
            setRender((render) => render + 1);
          }}
        />
      </div>

      <br />

      <div style={grid_2_col} className="mt-2 mb-2">
        <InputGmail value={eventInput}></InputGmail>
        <InputPhoneNumber value={eventInput}></InputPhoneNumber>
      </div>
      <br />
      {isLoading && <Loader text={"Espere mientras se crea el evento"} />}
      <Button
        color="secondary"
        className="text-white mt-2"
        onClick={handleAddEvent}
      >
        Agregar Evento
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Eliminar {event.name}
              </ModalHeader>
              <ModalBody>
                <p>Si eliminas este evento no podrás recuperarlo.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  cerrar
                </Button>
                <Button color="primary" onClick={handleDelete}>
                  Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Toaster
        richColors
        duration={3000}
        position="bottom-center"
        theme="dark"
      />
    </div>
  );
}
