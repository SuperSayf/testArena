import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields(props) {
  const { buttonText, onChange, isPassword } = props;

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label={buttonText}
        variant="outlined"
        inputProps={{
          onChange: onChange,
        }}
        type={isPassword ? "password" : "text"}
      />
    </Box>
  );
}
