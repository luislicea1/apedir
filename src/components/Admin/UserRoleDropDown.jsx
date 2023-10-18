import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function UserRoleDropDown({ role }) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([role]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <Dropdown className="ml-2">
      <DropdownTrigger>
        <Button
          variant="shadow"
          color="secondary"
          className="capitalize text-white w-4"
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="user role selection"
        color="secondary"
        variant="shadow"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="user">Usuario</DropdownItem>
        <DropdownItem key="merchant">Comerciante</DropdownItem>
        <DropdownItem key="admin">Admin</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
