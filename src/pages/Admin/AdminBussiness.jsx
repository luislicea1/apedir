import React from "react";
// import { getUsers } from "../../api/profile";
// import { useState, useEffect } from "react";
// import supabase from "../../api/client";
import NegocioTable from "../../components/Admin/NegocioTable";
import { useAdminBussiness } from "../../hooks/useStore";
import { fetchAllBussiness } from "../../api/bussiness";

export default function AdminBussiness() {
  const bussiness = useAdminBussiness((state) => state.bussiness);
  const setBussiness = useAdminBussiness((state) => state.setBussiness);

  React.useEffect(() => {
    const getAllBussinesses = async () => {
      const bList = await fetchAllBussiness();
      setBussiness(bList);
    };
    if (bussiness.length === 0) {
      getAllBussinesses();
    }
  }, []);

  return (
    <>
      <NegocioTable bussinessList={bussiness} setBussinessList={setBussiness} />
    </>
  );
}
