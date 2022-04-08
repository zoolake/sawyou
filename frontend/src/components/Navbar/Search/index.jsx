import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Search = (props) => {
  const [data, SetData] = useState(props.data.data.hashtagName);
  return (
      <Button sx={{justifyContent:'left'}}>
        <img class="img2" src="/images/baseimg_nav.jpg" />
        <Box sx={{ml:2}}><Typography>{data}</Typography></Box>
      </Button>
  ) 
}

export default Search;
