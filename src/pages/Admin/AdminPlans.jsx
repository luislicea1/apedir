import React, { useState, useEffect,lazy,Suspense } from "react";
//import AdminNavBar from "../../components/Admin/AdminNavBar";
//import PlansTable from "../../components/Admin/PlansTable";
import { getPlans } from "../../api/plans";
import supabase from "../../api/client";

const PlansTable = lazy(() => import("../../components/Admin/PlansTable"));
const AdminNavBar = lazy(() => import("../../components/Admin/AdminNavBar"));
const renderLoader = () => <p>Loading</p>;

export default function AdminPlans() {
  const [plans, setPlans] = useState([]);

  const channelA = supabase
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "plans",
      },
      (payload) => console.log(payload)
    )
    .subscribe();

  useEffect(() => {
    const fetchPlans = async () => {
      const data = await getPlans();
      if (data === null) setPlans([]);
      else setPlans(data);
    };
    fetchPlans();
  }, [channelA]); // users quitado de las dependencias

  return (
    <div>
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
          <PlansTable plans={plans} />
        </Suspense>
      </div>
    </div>
  );
}
