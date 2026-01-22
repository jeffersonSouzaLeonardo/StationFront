import React from "react";
import DataGridFuel from "./compentes/DataGridFuel.jsx";

/**
 * View de Combustível (Fuel)
 * Renderiza a interface de combustíveis
 */
function FuelFindView({ fuelList, loading, error }) {
  return (
    <>
      {/* Fuel List */}
      <DataGridFuel fuels={fuelList} loading={loading} error={error} />
    </>
  );
}

export default FuelFindView;
