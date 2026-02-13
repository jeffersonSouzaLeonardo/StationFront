import React, { useMemo } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid2 from '@mui/material/Unstable_Grid2'
import { constantes } from '../fuel-find-constantes.jsx'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

const { columns } = constantes

function DataGridFuel({ rows = [], loading = false, error = null, autoHeight = false, onDelete = null }) {

  const theme = useTheme()
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))

  if (error) {
    console.warn('DataGridFuel recebeu error:', error)
  }

  const displayedColumns = useMemo(() => {
    if (isSmDown) {
      return columns.filter(c => ['id', 'name', 'actions'].includes(c.field))
    }
    return columns
  }, [isSmDown])

  const columnsWithActions = useMemo(() => {
    const actionColumn = {
      field: 'actions',
      headerName: '',
      sortable: false,
      filterable: false,
      width: 72,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const id = params?.row?.id
        return (
          <IconButton
            size="small"
            color="error"
            onClick={(e) => {
              e.stopPropagation()
              if (typeof onDelete === 'function') {
                onDelete(id)
              } else {
                console.warn('onDelete não informado para DataGridFuel')
              }
            }}
            aria-label="excluir"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        )
      }
    }

    // Avoid duplicate if columns already contain actions
    const exists = displayedColumns.some(c => c.field === actionColumn.field)
    return exists ? displayedColumns : [...displayedColumns, actionColumn]
  }, [displayedColumns, onDelete])

  return (
    <Paper sx={{ height: autoHeight ? 'auto' : '100%', width: '100%', overflowX: 'auto', maxWidth: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columnsWithActions}
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