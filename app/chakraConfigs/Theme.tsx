import { extendTheme } from "@chakra-ui/react";
import Card from "../components/cards/CardOne";
import { SwitchStyle } from "../components/switch/SwitchStyle";

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#E7E7E7',
        fontSize: '61.5%'
      }
    }
  },
  components: {
    Card,
    Switch: SwitchStyle
  }
})

export default theme;
