import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PrimaryAppBar from "./PrimarySearchAppBar";
import {
    ArchiveOutlined,
    CalendarToday,
    Home,
    HomeMax,
    HomeMini,
    HomeOutlined,
    HomeRounded,
    HomeWorkOutlined,
    SchoolOutlined, Settings, SettingsOutlined
} from "@mui/icons-material";
import '../../App.css';
import * as PropTypes from "prop-types";
import {SvgIcon} from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
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
    }),
);

function DrawerItem(props) {
    return <ListItem key={props.key} disablePadding sx={{display: "block"}}>
        <ListItemButton
            sx={{
                minHeight: 48,
                justifyContent: props.open ? "initial" : "center",
                px: 2.5,
            }}
            onClick={props.onClick}
        >
            <ListItemIcon
                sx={{
                    minWidth: 0,
                    mr: props.open ? 3 : "auto",
                    justifyContent: "center",
                }}
            >
                {props.icon}
            </ListItemIcon>
            <ListItemText
                disableTypography
                primary={<Typography style={{fontFamily: "Google"}}>{props.title}</Typography>}
                sx={{opacity: props.open ? 1 : 0}}/>
        </ListItemButton>
    </ListItem>;
}

export default function MiniDrawer() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpenOrClosed = () => {
        setOpen(!open);
    };

    const drawerList = (<List sx={{paddingTop: '4rem'}}>

        <DrawerItem key={'Home'}
                    title={'Home'}
                    icon={(<svg focusable="false" width="24" height="24" viewBox="0 0 24 24">
                        <path fill='#5f6368' d="M12 3L4 9v12h16V9l-8-6zm6 16h-3v-6H9v6H6v-9l6-4.5 6 4.5v9z"></path>
                    </svg>)}
                    open={open}
                    onClick={() => {
                    }}/>
        <DrawerItem key={'Calendar'}
                    title={'Calendar'}
                    icon={(<CalendarToday/>)}
                    open={open}
                    onClick={() => {
                    }}/>
        <Divider/>
        <DrawerItem key={'Enrolled'}
                    title={'Enrolled'}
                    icon={(<SchoolOutlined/>)}
                    open={open}
                    onClick={() => {
                    }}/>
        <Divider/>
        <DrawerItem key={'Archived'}
                    title={'Archived Class'}
                    icon={(<ArchiveOutlined/>)}
                    open={open}
                    onClick={() => {
                    }}/>

        <DrawerItem key={'Settings'}
                    title={'Settings'}
                    icon={(<svg focusable="false" width="24" height="24" viewBox="0 0 24 24" className=" NMm5M">
                        <path fill='#5f6368'
                              d="M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z">
                        </path>
                        <circle fill='#5f6368' cx="12" cy="12" r="3.5"></circle>
                    </svg>)}
                    open={open}
                    onClick={() => {
                    }}/>
    </List>);

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <PrimaryAppBar onClick={handleDrawerOpenOrClosed}/>
            <Drawer variant="permanent" open={open}>
                {drawerList}
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <DrawerHeader/>
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                    enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                    imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                    Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                    nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                    leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                    feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                    consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                    eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                    neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                    tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                    tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                    gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                    et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                    eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                    posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
            </Box>
        </Box>
    );
}