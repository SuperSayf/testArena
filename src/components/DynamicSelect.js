import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DynamicSelect({ menuItems, onSelectionChange }) {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    onSelectionChange(selectedValue);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="dynamic-select-label">Select</InputLabel>
        <Select
          labelId="dynamic-select-label"
          id="dynamic-select"
          value={value}
          label="Select"
          onChange={handleChange}
        >
          {menuItems.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
