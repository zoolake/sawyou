import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const Searchbar = (props) => {
  const [find, setFind] = useState('');



  return (
    <Box
      component="form"
      sx={{height : 35, width : 300, display: "flex", border:1, borderColor:'grey.400', borderRadius: 3, backgroundColor: 'grey.200'}}
    >
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder="검색"
        inputProps={{ "aria-label": "search google maps" }}
        sx={{height : 35, width : 300}}
      />
    </Box>
// import * as React from 'react';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

// export default function SelectLabels() {
//   const [age, setAge] = React.useState('');

//   const handleChange = (event) => {
//     setAge(event.target.value);
//   };

//   return (
//     <div>
      // <FormControl sx={{ m: 1, minWidth: 120 }}>
      //   <Select
      //     value={age}
      //     onChange={handleChange}
      //     displayEmpty
      //     inputProps={{ 'aria-label': 'Without label' }}
      //   >
      //     <MenuItem value={10}>Ten</MenuItem>
      //     <MenuItem value={20}>Twenty</MenuItem>
      //     <MenuItem value={30}>Thirty</MenuItem>
      //   </Select>
      // </FormControl>
//     </div>
//   );
// }

  )
}

export default Searchbar;