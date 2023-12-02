import * as React from "react";
import List from "@mui/material/List";
import {
    ArchiveOutlined,
    ArrowDropDown,
    ArrowRight,
    AssignmentOutlined,
    CalendarToday,
    SchoolOutlined
} from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import {Collapse} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Settings from "../misc/Settings";

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
            <ListItemIcon sx={{minWidth: '1.25rem', margin: '0 0 0 -1.25rem', padding: 0}}>{props.left}</ListItemIcon>
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
                primary={<Typography style={{fontFamily: "Google", fontSize: '0.875rem', fontWeight:500}}>{props.title}</Typography>}
                sx={{opacity: props.open ? 1 : 0}}/>
        </ListItemButton>
    </ListItem>;
}


export default function AppDrawer({open}) {
    const [openEnrolled, setOpenEnrolled] = React.useState(true);

    const handleEnrolledClick = () => {
        setOpenEnrolled(!openEnrolled);
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
                    left={openEnrolled ? <ArrowDropDown sx={{fontSize: 20}}/> : <ArrowRight sx={{fontSize: 20}}/>}
                    onClick={handleEnrolledClick}/>
        <Collapse in={openEnrolled} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <DrawerItem key={'Todo'}
                            title={'To-do'}
                            icon={(<AssignmentOutlined/>)}
                            open={open}
                            onClick={() => {
                            }}/>
            </List>
        </Collapse>
        <Divider/>
        <DrawerItem key={'Archived'}
                    title={'Archived Class'}
                    icon={(<ArchiveOutlined/>)}
                    open={open}
                    onClick={() => {
                    }}/>

        <DrawerItem key={'Settings'}
                    title={'Settings'}
                    icon={(<Settings/>)}
                    open={open}
                    onClick={() => {
                    }}/>
    </List>);

    return (<Drawer variant="permanent" open={open}>
        {drawerList}
    </Drawer>);
}