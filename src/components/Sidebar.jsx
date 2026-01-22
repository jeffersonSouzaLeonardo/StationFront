import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation'
import StorageIcon from '@mui/icons-material/Storage'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Link } from 'react-router-dom'

const drawerWidth = 240

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(prev => !prev)
  }
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', mt: 8 }
      }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <StorageIcon />
          </ListItemIcon>
          <ListItemText primary="Estoque" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/fuel" sx={{ pl: 4 }}>
              <ListItemIcon>
                <LocalGasStationIcon />
              </ListItemIcon>
              <ListItemText primary="Combustível" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
  )
}
