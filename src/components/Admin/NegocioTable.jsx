import { DeleteIcon } from "../Icons/DeleteIcon/DeleteIcon";
import { EyeIcon } from "../Icons/EyeIcon/EyeIcon";
import { EditIcon } from "../Icons/Edit/EditIcon";
import { Checkbox } from "@nextui-org/react";
import { Pagination, Input } from "@nextui-org/react";
import { SearchIcon } from "../Icons/SearchIcon";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";

const columns = [
  { name: "Nombre", uid: "name" },
  { name: "Dueño", uid: "dueño" },
  { name: "Dirección", uid: "address" },
  { name: "Provincia", uid: "province" },
  { name: "Telefono", uid: "phone" },
  { name: "Acciones", uid: "actions" },
];

const users = [
  {
    id: 1,
    name: "Tony Reichert",
    address:
      "Edificio 77 bloque 3 apt 56 calle 4 entre San Juan y Santa Barbara",
    dueño: "Pepe",
    province: "Santiago de Cuba",
    phone: "55332277",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    address:
      "Edificio 77 bloque 3 apt 56 calle 4 entre San Juan y Santa Barbara",
    dueño: "Pepe",
    province: "Santiago de Cuba",
    phone: "55332277",
    role: "Technical Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    address:
      "Edificio 77 bloque 3 apt 56 calle 4 entre San Juan y Santa Barbara",
    province: "Santiago de Cuba",
    dueño: "Pepe",
    phone: "55332277",
    role: "Senior Developer",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    address:
      "Edificio 77 bloque 3 apt 56 calle 4 entre San Juan y Santa Barbara",
    province: "Santiago de Cuba",
    dueño: "Pepe",
    phone: "55332277",
    role: "Community Manager",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    address:
      "Edificio 77 bloque 3 apt 56 calle 4 entre San Juan y Santa Barbara",
    province: "Santiago de Cuba",
    dueño: "Pepe",
    phone: "55332277",
    role: "Sales Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function NegocioTable() {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <div>
              <Tooltip color="primary" content="Active or deactive">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <Checkbox defaultSelected></Checkbox>
                </span>
              </Tooltip>
            </div>

            <Tooltip color="danger" content="Delete bussiness">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  const [filterValue, setFilterValue] = React.useState("");

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  return (
    <div
      className="py-2 px-2 grid justify-between items-center m-2"
      style={{ justifyContent: "center", padding: "20px" , width: "100%", display: "grid"}}
    >
      <div style={{maxWidth: "1600px"}}>
        <Input
          isClearable
          className="w-full lg:max-w-[40%] mb-2"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}

        />
        <Table
        aria-label="Bussiness Table"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                className="text-white"
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
