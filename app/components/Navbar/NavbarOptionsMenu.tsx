import { MenuItem, MenuItemProps } from "@chakra-ui/react";

type NavbarOptionsMenuProps  = MenuItemProps & {
    hasCorFundo: boolean,
    onClick?: () => void,
    texto: string
}

export default function NavbarOptionsMenu({ hasCorFundo, texto, onClick }: NavbarOptionsMenuProps) {
    return (

        <MenuItem
            bg={hasCorFundo ? 'yellow.200' : 'white'}
            display='flex'
            alignItems='center'
            justifyContent='center'
            fontSize='1rem'
            _hover={{ fontWeight: 'bold' }}
            onClick={onClick}
        >
            {texto}
        </MenuItem>

    );
}
