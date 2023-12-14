import ManageAccountsPage from "./ManageAccountsPage";
import * as React from "react";
import Box from "@mui/material/Box";
import {IconButton, Tab, Tabs} from "@mui/material";
import Settings from "../../misc/Settings";
import TabPanel from "../../TabPanel";
import ManageClassesPage from "./ManageClassesPage";


export default function ManagePage() {

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
                        <Tab label="Accounts" sx={{textTransform: 'none', fontWeight: 500, fontFamily: 'Google'}}/>
                        <Tab label="Classes" sx={{textTransform: 'none', fontWeight: 500, fontFamily: 'Google'}}/>
                    </Tabs>
                    <IconButton>
                        <Settings/>
                    </IconButton>
                </Box>
            </div>
            <TabPanel value={value} index={0}>
                <ManageAccountsPage/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ManageClassesPage/>
            </TabPanel></div>
    );
}