import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function SelectorProvincia({ value, setValue }) {
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set([value.province !== "" ? value.province : "Santiago de Cuba"])
  );

  const handleSelectionChange = (selectedKeys) => {
    setSelectedKeys(selectedKeys);
    const selectedValue = Array.from(selectedKeys)[0];
    setValue((prevState) => {
      const updatedState = {
        ...prevState,
        province: selectedValue,
      };

      return updatedState;
    });
  };
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),

    [selectedKeys]
  );

  return (
    <Dropdown aria-label="menu de provincias dropdown">
      <DropdownTrigger aria-label="trigger menu provincias">
        <Button variant="bordered" className="capitalize">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="menu provincias"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
      >
        <DropdownItem aria-label="santiago" key="Santiago de Cuba">
          Santiago de Cuba
        </DropdownItem>
        <DropdownItem aria-label="guantanamo" key="Guantanamo">
          Guantanamo
        </DropdownItem>
        <DropdownItem aria-label="granma" key="Granma">
          Granma
        </DropdownItem>
        <DropdownItem aria-label="holguin" key="Holguin">
          Holguin
        </DropdownItem>
        <DropdownItem aria-label="las tunas" key="Las Tunas">
          Las Tunas
        </DropdownItem>
        <DropdownItem aria-label="sancti spiritus" key="Sancti Spiritus">
          Sancti Spiritus
        </DropdownItem>
        <DropdownItem aria-label="villa clara" key="Villa Clara">
          Villa Clara
        </DropdownItem>
        <DropdownItem aria-label="cienfuegos" key="Cienfuegos">
          Cienfuegos
        </DropdownItem>
        <DropdownItem aria-label="matanzas" key="Matanzas">
          Matanzas
        </DropdownItem>
        <DropdownItem aria-label="artemisa" key="Artemisa">
          Artemisa
        </DropdownItem>
        <DropdownItem aria-label="la habana" key="La Habana">
          La Habana
        </DropdownItem>
        <DropdownItem aria-label="mayabeque" key="Mayabeque">
          Mayabeque
        </DropdownItem>
        <DropdownItem aria-label="pinar del rio" key="Pinar del Rio">
          Pinar del Rio
        </DropdownItem>
        <DropdownItem
          aria-label="isla de la juventud"
          key="La Isla de la Juventud"
        >
          La Isla de la Juventud
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
