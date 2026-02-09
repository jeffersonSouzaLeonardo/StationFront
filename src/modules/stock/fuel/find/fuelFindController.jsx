import React from "react";
import { useState, useEffect, useMemo } from "react";

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

  const [codigo, setCodigo] = useState(null);
  const [descricao, setDescricao] = useState('');

  const handleCodigoChange = (e) => {
    const val = e.target.value;
    setCodigo(val === '' ? null : val);
  };

  const handleDescricaoChange = (e) => setDescricao(e.target.value);

  const handlerSearch = async () => {
    if (codigo == null) return;

    setLoading(true);
    setError(null);
    try {
      const data = await fuelFindService.fetchById(codigo);
      if (data.success && data.data) {
        setFuelList([data.data]);
      } else {
        setError(`Combustível com código ${codigo} não encontrado.`);
        setFuelList([]);
      }
    } catch (err) {
      console.error("Erro ao buscar combustível por código:", err);
      setError("Erro ao buscar combustível.");
    } finally {
      setLoading(false);
    }
  };

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
        setError("Combustíveis não disponíveis no momento.");
      } finally {
        setLoading(false);
      }
    };
    loadFuel();
  }, []);

  const fuelRows = useMemo(() => fuelFindService.constructionRows(fuelList), [fuelList]);

  return (
    <FuelFindView
      fuelRows={fuelRows}
      loading={loading}
      error={error}
      codigo={codigo}
      descricao={descricao}
      onCodigoChange={handleCodigoChange}
      onDescricaoChange={handleDescricaoChange}
      handlerSearch={handlerSearch}
    />
  );
}

export default Fuel;
