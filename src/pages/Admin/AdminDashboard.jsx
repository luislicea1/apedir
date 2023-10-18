import AdminNavBar from "../../components/Admin/AdminNavBar";
import UserTable from "../../components/Admin/UsersTable";
import { getUsers } from "../../api/profile";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []); // users quitado de las dependencias

  return (
    <>
      <AdminNavBar />
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
        <UserTable users={users} />
      </div>
    </>
  );
}
