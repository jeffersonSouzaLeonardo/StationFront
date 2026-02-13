import React from "react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('error');

  const [codigo, setCodigo] = useState(null);
  const [descricao, setDescricao] = useState('');
  const navigate = useNavigate();

  const handleCodigoChange = (e) => {
    const val = e.target.value;
    setCodigo(val === '' ? null : val);
  };

  const handlerClear = (e) => {
    setCodigo(null);
    setDescricao('');
    setError(null);
  };

  const handleDescricaoChange = (e) => setDescricao(e.target.value);

  const handlerSearch = async () => {
    if (codigo != null) {
      return handlerSearchId();
    } else {
      return handlerSearchDescription();
    }

  };

  const handlerSearchId = async () => {
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
  }

  const handlerFuelNew = () => {
    navigate('/fuel/new');
  }

  const handlerDelete = async (id) => {
    if (!id) return;
    const confirmed = window.confirm('Confirma exclusão deste combustível?');
    if (!confirmed) return;
    setLoading(true);
    setError(null);
    try {
      await fuelFindService.delete(id);
      setFuelList(prev => (Array.isArray(prev) ? prev.filter(f => f.id !== id) : []));
    } catch (err) {
      console.error('Erro ao excluir combustível:', err);
      const message = (err && err.message) ? String(err.message) : 'Erro ao excluir combustível.';
      setSnackMessage(message);
      setSnackSeverity('error');
      setSnackOpen(true);
      setError(null);
    } finally {
      setLoading(false);
    }
  }

  const handlerSearchDescription = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fuelFindService.fetchByDescription(descricao);
      if (data.success && data.data) {
        setFuelList(data.data);
      } else {
        setError(`Combustível com código ${descricao} não encontrado.`);
        setFuelList([]);
      }
    } catch (err) {
      console.error("Erro ao buscar combustível por descrição:", err);
      setError("Erro ao buscar combustível.");
    } finally {
      setLoading(false);
    }  
  }


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
    <>
      <FuelFindView
        fuelRows={fuelRows}
        loading={loading}
        error={error}
        codigo={codigo}
        descricao={descricao}
        onCodigoChange={handleCodigoChange}
        onDescricaoChange={handleDescricaoChange}
        handlerSearch={handlerSearch}
        handlerFuelNew={handlerFuelNew}
        handlerDelete={handlerDelete}
        handlerClear={handlerClear}
      />

      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackOpen(false)} severity={snackSeverity} sx={{ width: '100%' }}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Fuel;
