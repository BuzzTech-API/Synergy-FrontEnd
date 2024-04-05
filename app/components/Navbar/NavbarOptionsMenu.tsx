import { MenuItem } from "@chakra-ui/react";

interface NavbarOptionsMenuProps{
    hasCorFundo: boolean,
    texto: string
}

export default function NavbarOptionsMenu({hasCorFundo, texto}: NavbarOptionsMenuProps) {
    return (

        <MenuItem
            bg={hasCorFundo ? 'yellow.200' : 'white'}
            display='flex'
            alignItems='center'
            justifyContent='center'
            fontSize='1rem'
            _hover={{ fontWeight: 'bold' }}>
            {texto}
        </MenuItem>
        
    );
}
