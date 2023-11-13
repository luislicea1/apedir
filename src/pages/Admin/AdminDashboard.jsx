import React, { lazy, Suspense } from "react";
//import AdminNavBar from "../../components/Admin/AdminNavBar";
//import UserTable from "../../components/Admin/UsersTable";
import { getUsers } from "../../api/profile";
import { useState, useEffect } from "react";
import supabase from "../../api/client";

const UserTable = lazy(() => import("../../components/Admin/UsersTable"));
const AdminNavBar = lazy(() => import("../../components/Admin/AdminNavBar"));
const renderLoader = () => <p>Loading</p>;

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const channelA = supabase
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "profiles",
      },
      (payload) => console.log(payload)
    )
    .subscribe();

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };

    fetchUsers();
  }, [channelA]); // users quitado de las dependencias

  return (
    <>
      <Suspense fallback={renderLoader()}>
        <AdminNavBar />
      </Suspense>

      <div
        className="flex justify-center items-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "40px",
          width: "100%",
        }}
      >
        <Suspense fallback={renderLoader()}>
          <UserTable users={users} />
        </Suspense>
      </div>
    </>
  );
}
