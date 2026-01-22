import React from "react";
import { useState, useEffect } from "react";

import FuelFindView from "./fuelFindView";
import fuelFindService from "./fuelFindService";

/**
 * View de Combustível (Fuel)
 * Exibe lista de todos os combustíveis cadastrados no sistema
 * com suas descrições, preços e quantidades em estoque
 */
function Fuel() {
  const [fuelList, setFuelList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    console.log("O estado atualizado do fuelList é:", fuelList);
  }, [fuelList]);

  /**
   * Effect para carregar dados de combustíveis ao montar o componente
   */
  useEffect(() => {
    const loadFuel = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fuelFindService.getAll();

        if (data.success && data.data) {
          setFuelList(data.data);
        } else {
          setError("Falha ao carregar dados de combustíveis");
        }

      } catch (err) {
        setError(err.message || "Erro ao carregar combustíveis");
        console.error("Erro:", err);
      } finally {
        setLoading(false);
      }
    };
    loadFuel();
  }, []);

  return <FuelFindView fuelList={fuelList} loading={loading} error={error} />;
}

export default Fuel;
