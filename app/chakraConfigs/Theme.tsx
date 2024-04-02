'use client'
import { extendTheme } from "@chakra-ui/react";
import { SwitchStyle } from "../components/switch/SwitchStyle";
import CardNewStyles from "../components/cards/CardOne";

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
    Card: CardNewStyles,
    Switch: SwitchStyle

  }
})

export default theme;
