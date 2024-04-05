'use client'
import { extendTheme } from "@chakra-ui/react";
import { SwitchStyle } from "../components/switch/SwitchStyle";
import CardNewStyles from "../components/cards/CardStyles";
import { BadgeStyle } from "../components/badge/BadgeStyles";

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#E7E7E7',
      }
    }
  },
  components: {
    Card: CardNewStyles,
    Switch: SwitchStyle,
    Badge: BadgeStyle,
  }
})

export default theme;
