import React from "react";
import DataGridFuel from "./compentes/DataGridFuel.jsx";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import fuelFindStyles from './fuel-style.jsx';

/**
 * View de Combustível (Fuel)
 * Renderiza a interface de combustíveis
 */
function FuelFindView({ fuelRows, loading, error, codigo, descricao, onCodigoChange, onDescricaoChange, handlerSearch, handlerFuelNew, handlerClear, handlerDelete }) {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const styles = fuelFindStyles({ isSmDown, theme });

  return (
    <Box component="section" sx={styles.container}>
      <Typography
        variant="h4"
        component="h2"
        sx={styles.title}
      >
        Lista de Combustíveis
      </Typography>
      <Paper elevation={3} sx={styles.paper}>
        <Grid container spacing={2}>
          
            <Grid item xs={12}>
              <Paper elevation={1} sx={styles.filterPaper}>
                <Typography variant="h6" gutterBottom>
                  Filtros
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField fullWidth label="Código" size="small" value={codigo ?? ''} onChange={onCodigoChange} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField fullWidth label="Descrição" size="small" value={descricao} onChange={onDescricaoChange} disabled={codigo !== null} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} sx={styles.filterGridRight}>
                    <Grid item xs={12} sm={12} md={4} sx={styles.filterGridRight}>
                      <Button id="button-consulta" variant="contained" size="small" fullWidth sx={styles.applyButton} onClick={handlerSearch}>
                        Aplicar
                      </Button>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} sx={styles.filterGridRight}>
                      <Button id="button-limpar" variant="contained" size="small" fullWidth sx={styles.applyButton} onClick={handlerClear}>
                        Limpar
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} sx={styles.filterGridRight}>
                      <Button id="button-novo" variant="contained" size="small" fullWidth sx={styles.applyButton} onClick={handlerFuelNew} algn="left">
                        Novo
                      </Button>
                    </Grid>

                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Box sx={styles.dataBox}>
                <DataGridFuel rows={fuelRows} loading={loading} error={error} autoHeight={isSmDown} onDelete={handlerDelete} />
              </Box>
            </Grid>
        </Grid>
        
      </Paper>
    </Box>
  );
}

export default FuelFindView;
