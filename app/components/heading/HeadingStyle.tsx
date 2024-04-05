import { defineStyleConfig } from "@chakra-ui/react";

export const HeadingStyle = defineStyleConfig({

    baseStyle:{
        fontFamily: '"DM Sans", sans-serif',
        fontWeight: 'bold'
    },
    variants: {
        big:{
            fontSize: "32px"
        },
        medium: {
            fontSize: "24px"
        }
    },
    defaultProps: {
        size: '',
        variant: 'medium',
        colorScheme: '',
      }
})