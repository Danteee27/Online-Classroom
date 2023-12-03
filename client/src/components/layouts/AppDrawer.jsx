import * as React from "react";
import List from "@mui/material/List";
import {
    ArchiveOutlined,
    ArrowDropDown,
    ArrowRight,
    AssignmentOutlined,
    CalendarToday,
    SchoolOutlined,
    SourceOutlined
} from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import {Collapse, useTheme} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Settings from "../misc/Settings";
import Avatar from "@mui/material/Avatar";
import {useNavigate} from "react-router-dom";

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
                primary={<div><Typography
                    style={{fontFamily: "Google", fontSize: '0.875rem', fontWeight: 500}}>{props.title}</Typography>
                    {props.subtitle && <Typography
                        style={{
                            fontSize: '0.75rem',
                            fontWeight: 400,
                        }}>{props.subtitle}
                    </Typography>}
                </div>
                }
                sx={{opacity: props.open ? 1 : 0}}/>
        </ListItemButton>
    </ListItem>;
}


export default function AppDrawer({open}) {
    const theme = useTheme();
    const navigate = useNavigate();

    const role = 'teacher';
    const classes = [{
        className: '2310-CLC-AWP-20KTPM2',
        classSubject: 'Advanced Web Programming',
        teacher: 'Michael'
    }, {
        className: '2310-CLC-DSA-20KTPM1',
        classSubject: 'Data Structure and Algorithm',
        teacher: 'Jack'
    }, {
        className: '2310-CLC-ML-20KTPM2',
        classSubject: 'Machine Learning',
        teacher: 'Son'
    }];

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
                    onClick={() => navigate('home')}/>
        <DrawerItem key={'Calendar'}
                    title={'Calendar'}
                    icon={(<CalendarToday/>)}
                    open={open}
                    onClick={() => navigate('calendar')}/>
        <Divider/>
        {
            role === 'student' &&
            <>  <DrawerItem key={'Enrolled'}
                            title={'Enrolled'}
                            icon={(<SchoolOutlined/>)}
                            open={open}
                            left={openEnrolled ? <ArrowDropDown sx={{fontSize: 20}}/> :
                                <ArrowRight sx={{fontSize: 20}}/>}
                            onClick={handleEnrolledClick}/>
                <Collapse in={openEnrolled} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <DrawerItem key={'Todo'}
                                    title={'To-do'}
                                    icon={(<AssignmentOutlined/>)}
                                    open={open}
                                    onClick={() => navigate('todo')}/>
                    </List>
                </Collapse>
                <Divider/></>
        }
        {
            role === 'teacher' && <>
                <DrawerItem key={'Teaching'}
                            title={'Teaching'}
                            icon={(<svg fill={'#5f6368'} focusable="false" width="24" height="24" viewBox="0 0 24 24"
                                        className=" NMm5M">
                                <circle cx="17" cy="12.5" r="2.5"></circle>
                                <path
                                    d="M17 15.62c-1.67 0-5 .84-5 2.5V20h10v-1.88c0-1.66-3.33-2.5-5-2.5zM10 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm1.82 9.17c.01 0 0 0 0 0zM10 13c-2.67 0-8 1.34-8 4v3h8v-2H4v-.99c.2-.72 3.3-2.01 6-2.01.6 0 1.22.07 1.82.17h.01l2.07-1.55c-1.39-.41-2.85-.62-3.9-.62z"></path>
                            </svg>)}
                            open={open}
                            left={open && openEnrolled ? <ArrowDropDown sx={{fontSize: 20}}/> :
                                <ArrowRight sx={{fontSize: 20}}/>}
                            onClick={handleEnrolledClick}/>
                <Collapse in={openEnrolled} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <DrawerItem key={'Toreview'}
                                    title={'To-review'}
                                    icon={(<SourceOutlined/>)}
                                    open={open}
                                    onClick={() => navigate('toreview')}/>
                        {open && classes.map((item) => (
                            <DrawerItem key={item.className}
                                        title={item.className}
                                        icon={(<Avatar sx={{
                                            width: 32,
                                            height: 32,
                                            fontSize: 16,
                                            fontFamily: 'Google',
                                            ml: '-.3rem',
                                            fontWeight: 500,
                                            background: theme.palette.primary.main
                                        }}> {item.className[0]}</Avatar>)}
                                        open={open}
                                        onClick={() => navigate('class')}
                                        subtitle={item.classSubject}
                            />

                        ))}
                    </List>
                </Collapse>
                <Divider/>
            </>}
        <DrawerItem key={'Archived'}
                    title={'Archived Class'}
                    icon={(<ArchiveOutlined/>)}
                    open={open}
                    onClick={() => navigate('archivedClasses')}/>

        <DrawerItem key={'Settings'}
                    title={'Settings'}
                    icon={(<Settings/>)}
                    open={open}
                    onClick={() => navigate('settings')}/>
    </List>);

    return (<Drawer variant="permanent" open={open}>
        {drawerList}
    </Drawer>);
}