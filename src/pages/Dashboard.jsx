import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export default function Dashboard() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Usuários</Typography>
          <Typography variant="h4">1.234</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Receitas</Typography>
          <Typography variant="h4">R$ 12.345</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={12} lg={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Alertas</Typography>
          <Typography>Sem alertas</Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}
