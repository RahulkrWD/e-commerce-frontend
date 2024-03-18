import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function Tabs({ item }) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Description" value="1" />
            <Tab label="Details" value="2" />
          </TabList>
        </Box>
        {item
          ? item.map((data, index) => (
              <div key={index}>
                <TabPanel value="1">{data.description}</TabPanel>
                <TabPanel value="2">{data.details}</TabPanel>
              </div>
            ))
          : ""}
      </TabContext>
    </Box>
  );
}
