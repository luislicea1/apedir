import {Input} from "@nextui-org/react";

export default function InputDeFaceBook({value, setValue}){
    return(
        <Input
        type="url"
        label="Facebook"
        placeholder="https://www.facebook.com/username"
        variant="bordered"
        labelPlacement="outside"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small"></span>
          </div>
        }
        onChange={(event) => {
          setValue({
            ...value,
            facebook: event.target.value,
          });
        }}
      />
    
    );
}