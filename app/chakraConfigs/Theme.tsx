'use client'
import { extendTheme } from "@chakra-ui/react";
import { IconsBtns } from "../components/buttons/BtnStyles/BtnsComIcones";
import { BoxBtns } from "../components/buttons/BtnStyles/BoxBtns";
import { BigBtns } from "../components/buttons/BtnStyles/BigBtns";
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
    Button: IconsBtns,  // Style para botões com ícone
    Button2: BigBtns,  // Style para botões grandes
    Box: BoxBtns,  // Style para box que comporta ícone
    Card: CardNewStyles,
    Switch: SwitchStyle,
    Badge: BadgeStyle,
    Input: InputNewStyles,
    Heading: HeadingStyle,

  }
})

export default theme;
