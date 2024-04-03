import { IconButton } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function () {
    return (
        <>
            <IconButton
                aria-label='menu-navbar'
                boxSize='35px'
                icon={<GiHamburgerMenu size='30px' />}
                bg='none'
                _hover={{ bg: 'none' }} />
        </>
    )
}