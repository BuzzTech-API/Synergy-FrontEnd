import { extendTheme } from "@chakra-ui/react";
import Card from "../components/cards/CardOne";
import { IconsBtns } from "../components/buttons/BtnStyles/BtnsComIcones";
import { TextBtns } from "../components/buttons/BtnStyles/TextBtns";
import { BoxBtns } from "../components/buttons/BtnStyles/BoxBtns";
import { BigBtns } from "../components/buttons/BtnStyles/BigBtns";

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
    Button: IconsBtns,  // Style para botões com ícone
    Button2: BigBtns,  // Style para botões grandes
    Text: TextBtns,  // Style para texto do botão
    Box: BoxBtns,  // Style para box que comporta ícone

  }
})

export default theme;
