import React, { useMemo } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid2 from '@mui/material/Unstable_Grid2'
import { constantes } from '../fuel-find-constantes.jsx'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const { columns } = constantes

function DataGridFuel({ rows = [], loading = false, error = null, autoHeight = false }) {

  const theme = useTheme()
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))

  if (error) {
    return <Box>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {String(error)}
          </Typography>
        </Grid2>
      </Grid2>
    </Box>
  }

  const displayedColumns = useMemo(() => {
    if (isSmDown) {
      return columns.filter(c => ['id', 'name'].includes(c.field))
    }
    return columns
  }, [isSmDown])

  return (
    <Paper sx={{ height: autoHeight ? 'auto' : '100%', width: '100%', overflowX: 'auto', maxWidth: '100%' }}>
      <DataGrid
        rows={rows}
        columns={displayedColumns}
        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection={!isSmDown}
        loading={loading}
        autoHeight={autoHeight}
        sx={{ border: 0, minWidth: '100%', height: autoHeight ? 'auto' : '100%' }}
      />
    </Paper>
  )
}

export default DataGridFuel