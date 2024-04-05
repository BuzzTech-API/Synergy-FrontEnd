'use client'
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { inputAnatomy } from '@chakra-ui/anatomy'


const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
    field: {
        bg: 'white',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '0.313rem',
        border: "0.125rem solid",
        borderColor: 'blackAlpha.400',
        _hover: {
            borderColor: 'blackAlpha.600'

        },
        _focusVisible: {
            borderColor: "blue.400",
        },
        _invalid: {
            borderColor: 'red.200',
            _hover: {
                borderColor: 'red.400'
            },
            _focus: {
                borderColor: '#FF0000',
            }
        },
    },
})

const sizes = {}

const variantDefault = definePartsStyle((props) => {
    return {
        field: {
        }
    }
})

const variantError = definePartsStyle((props) => {
    return {
      field: {
        borderColor: 'red.200',
        _hover: {
            borderColor: 'red.400'
        },
        _focus: {
            borderColor: '#FF0000',
        }
      },
    }
  })

  const variantValid = definePartsStyle((props) => {
    return {
      field: {
        borderColor: 'green.200',
        _hover: {
            borderColor: 'green.400'
        },
        _focus: {
            borderColor: '#17A100'
        }
      },
    }
  })

const variants = {
    default: variantDefault,
    error: variantError,
    valid: variantValid
}

const InputNewStyles = defineMultiStyleConfig({  
    baseStyle, 
    sizes, 
    variants, 
    defaultProps: {
        variant: "default"
    }
})



export default InputNewStyles; 