'use client'
import { extendTheme } from "@chakra-ui/react";
import { SwitchStyle } from "../components/switch/SwitchStyle";
import CardNewStyles from "../components/cards/CardStyles";
import { BadgeStyle } from "../components/badge/BadgeStyles";
import InputNewStyles from "../components/inputs/Input";
import { HeadingStyle } from "../components/heading/HeadingStyle";

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#E7E7E7',
        fontFamily: "Poppins",
        fontSize: '1rem'
      }
    }
  },
  components: {
    Card: CardNewStyles,
    Switch: SwitchStyle,
    Badge: BadgeStyle,
    Input: InputNewStyles,
    Heading: HeadingStyle,

  }
})

export default theme;
