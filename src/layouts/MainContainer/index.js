import { Container, useTheme } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import { useEffect } from "react";

function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}


export default function MainContainer({ titulo = "Proactive App", children }) {

  const width = useWidth();

  useEffect(() => {
    document.title = `${titulo} | Proactive`;
  }, []);

  return (

    <Container style={{ paddingTop: 50, paddingLeft: 10, paddingRight: 10 }} maxWidth={width} className="bg-gray-100" >
      {children}
    </Container>


  );
}

MainContainer.propTypes = {
  titulo: PropTypes.string,
  children: PropTypes.element,
}