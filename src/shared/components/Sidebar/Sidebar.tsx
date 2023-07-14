import * as React from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { LuUsers, LuLayoutDashboard } from 'react-icons/lu'
import { BsCalendarDate } from 'react-icons/bs'
import { PiStudent } from 'react-icons/pi'
import { BiBookBookmark } from 'react-icons/bi'
import { BsFolder } from 'react-icons/bs'
import { FaUserAstronaut } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import styles from './Sidebar.module.scss'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault()
  console.info('You clicked a breadcrumb.')
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const links = [
  {
    title: 'Account',
    path: '/account',
    icon: <FaUserAstronaut />,
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <LuLayoutDashboard />,
  },
  {
    title: 'Files',
    path: '/files',
    icon: <BsFolder />,
  },
  {
    title: 'Course templates',
    path: '/templates',
    icon: <BiBookBookmark />,
  },
  {
    title: 'Courses',
    path: '/courses',
    icon: <PiStudent />,
  },
  {
    title: 'Users',
    path: '/users',
    icon: <LuUsers />,
  },
  {
    title: 'Calendar',
    path: '/calendar',
    icon: <BsCalendarDate />,
  },
]

export default function ResponsiveDrawer() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        sx={{ bgcolor: 'white' }}
        position='fixed'
        open={open}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon sx={{ color: '#333' }} />
          </IconButton>
          <Typography
            sx={{ color: '#333' }}
            variant='h6'
            noWrap
            component='div'
          >
            <div
              role='presentation'
              onClick={handleClick}
            >
              <Breadcrumbs aria-label='breadcrumb'>
                <Link
                  underline='hover'
                  color='inherit'
                  href='/'
                >
                  HOME
                </Link>
                <Link
                  underline='hover'
                  color='inherit'
                  href='/material-ui/getting-started/installation/'
                >
                  Account
                </Link>
                <Link
                  underline='hover'
                  color='text.primary'
                  href='/signup'
                  aria-current='page'
                >
                  Breadcrumbs
                </Link>
              </Breadcrumbs>
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={styles.xz}
        variant='permanent'
        open={open}
      >
        <DrawerHeader sx={{ bgcolor: '#333' }}>
          <img
            className={styles.logo}
            src="'../../../../public/logo-light.svg"
            alt=''
          />

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon className={styles.iconRight} />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List sx={{ bgcolor: '#333' }}>
          {links.map((data, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: 'block' }}
            >
              <ListItemButton
                component={NavLink}
                to={data.path}
              >
                <ListItemIcon>{data.icon}</ListItemIcon>
                {/* <ListItemText primary={text} onClick={} /> */}
                <p className={styles.pcolor}>{data.title}</p>
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
      </Drawer>
      <Box
        component='main'
        sx={{ flexGrow: 1, p: 3 }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  )
}