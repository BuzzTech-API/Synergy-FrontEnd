import { extendTheme } from "@chakra-ui/react";
import Card from "../components/cards/CardOne";

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#E7E7E7',
      }
    }
  },
  components: {
    Card,

  }
})

export default theme;
