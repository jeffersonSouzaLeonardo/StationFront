import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'codigo', headerName: 'Código', width: 120 },
  { field: 'descricao', headerName: 'Descrição', flex: 1, minWidth: 180 },
  { field: 'preco', headerName: 'Preço', width: 120, type: 'number' },
  { field: 'quantidade', headerName: 'Quantidade', width: 120, type: 'number' },
]

function DataGridFuel({ fuels = [], loading = false, error = null }) {
  const rows = Array.isArray(fuels)
    ? fuels.map((f, idx) => ({
        id: f.id ?? idx,
        codigo: f.codigo ?? f.code ?? f.id ?? '',
        descricao: f.descricao ?? f.name ?? f.description ?? '',
        preco: typeof f.preco !== 'undefined' ? f.preco : f.price ?? f.valor ?? null,
        quantidade: f.quantidade ?? f.stock ?? f.quantity ?? 0,
      }))
    : []

  if (error) {
    return <div style={{ color: 'red' }}>{String(error)}</div>
  }

  return (
    <Paper sx={{ height: 480, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        loading={loading}
        sx={{ border: 0 }}
      />
    </Paper>
  )
}

export default DataGridFuel