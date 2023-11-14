import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

export default function SelectProvincia() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Santiago de Cuba"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    
    [selectedKeys]
   
  );
  
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          className="capitalize"
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="Santiago de Cuba">Santiago de Cuba</DropdownItem>
        <DropdownItem key="Guantanamo">Guantanamo</DropdownItem>
        <DropdownItem key="Granma">Granma</DropdownItem>
        <DropdownItem key="Holguin">Holguin</DropdownItem>
        <DropdownItem key="Las Tunas">Las Tunas</DropdownItem>
        <DropdownItem key="Sancti Spiritus">Sancti Spiritus</DropdownItem>
        <DropdownItem key="Villa Clara">Villa Clara</DropdownItem>
        <DropdownItem key="Cienfuegos">Cienfuegos</DropdownItem>
        <DropdownItem key="Matanzas">Matanzas</DropdownItem>
        <DropdownItem key="Artemisa">Artemisa</DropdownItem>
        <DropdownItem key="La Habana">La Habana</DropdownItem>
        <DropdownItem key="Mayabeque">Mayabeque</DropdownItem>
        <DropdownItem key="Pinar del Rio">Pinar del Rio</DropdownItem>
        <DropdownItem key="La Isla de la Juventud">La Isla de la Juventud</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
