import React from "react";
import { getUsers } from "../../api/profile";
import { useState, useEffect } from "react";
import supabase from "../../api/client";
import NegocioTable from "../../components/Admin/NegocioTable";

export default function AdminBussiness() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const channelA = supabase
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "profiles",
      },
      (payload) => fetchUsers()
    )
    .subscribe();

  useEffect(() => {
    fetchUsers();
  }, [channelA]); // users quitado de las dependencias

  return (
    <>
      <NegocioTable />
    </>
  );
}
