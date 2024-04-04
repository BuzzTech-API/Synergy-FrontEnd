import { extendTheme } from "@chakra-ui/react";
import Card from "../components/cards/CardOne";
import { IconsBtns } from "../components/buttons/BtnsComIcones";
import { TextBtns } from "../components/buttons/TextBtns";
import { BoxBtns } from "../components/buttons/BoxBtns";

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
    Button: IconsBtns,
    Text: TextBtns,
    Box: BoxBtns

  }
})

export default theme;
