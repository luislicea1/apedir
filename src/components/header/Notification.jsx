import React, { useState } from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Badge,
} from "@nextui-org/react";
import { NotificationIcon } from "../Icons/NotificationIcon";

export default function Notification() {
    const items = [
        {
            key: "new",
            label: "New file",
        },
        {
            key: "copy",
            label: "Copy link",
        },
        {
            key: "edit",
            label: "Edit file",
        },
        {
            key: "delete",
            label: "Delete file",
        },
    ];
    const [isInvisible, setIsInvisible] = useState(false);

    return (
        <Dropdown>
            <DropdownTrigger>
                <div style={{ marginTop: '10px' }}>
                    <Badge
                        color="danger"
                        content={5}
                        isInvisible={isInvisible}
                        shape="circle"
                    >
                        <NotificationIcon className="fill-current" size={30} color="" />
                    </Badge>
                </div>
            </DropdownTrigger>
            <DropdownMenu items={items}>
                {(item) => (
                    <DropdownItem
                        key={item.key}
                        color={item.key === "delete" ? "danger" : "default"}
                        className={item.key === "delete" ? "text-danger" : ""}
                    >
                        {item.label}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
}