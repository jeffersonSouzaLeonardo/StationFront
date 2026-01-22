import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1565c0'
    },
    secondary: {
      main: '#00acc1'
    },
    background: {
      default: '#f4f6f8'
    }
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 2
      }
    }
  }
})

export default theme
