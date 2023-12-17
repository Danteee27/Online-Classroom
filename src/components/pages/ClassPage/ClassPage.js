import * as React from 'react';
import {IconButton, Tab, Tabs} from "@mui/material";
import Box from "@mui/material/Box";
import TabPanel from "../../TabPanel";
import ClassPageStreamTab from "./ClassPageStreamTab";
import Settings from "../../misc/Settings";
import ClassPagePeopleTab from "./ClassPagePeopleTab";
import GradeView from './GradeView';


export default function ClassPage() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <div style={{borderBottom: '0.0625rem solid rgb(218,220,224)'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2ch'}}>
                    <Tabs value={value} onChange={handleChange}
                          sx={{
                              '& .MuiTabs-indicator': {
                                  minHeight: '.25rem',
                                  justifyContent: 'center',
                                  borderTopLeftRadius: 20,
                                  borderTopRightRadius: 20,
                              }
                          }}
                    >
                        <Tab label="Stream" sx={{textTransform: 'none', fontWeight: 500, fontFamily: 'Google'}}/>
                        <Tab label="Classwork" sx={{textTransform: 'none', fontWeight: 500, fontFamily: 'Google'}}/>
                        <Tab label="People" sx={{textTransform: 'none', fontWeight: 500, fontFamily: 'Google'}}/>
                        <Tab label="Grades" sx={{textTransform: 'none', fontWeight: 500, fontFamily: 'Google'}}/>
                    </Tabs>
                    <IconButton>
                        <Settings/>
                    </IconButton>
                </Box>
            </div>
            <TabPanel value={value} index={0}>
                <ClassPageStreamTab/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <GradeView/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ClassPagePeopleTab/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel></div>
    );
}