import React, { SetStateAction } from 'react';
import { Accordion as ChakraAccordion, AccordionItem as ChakraAccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Image, Flex, Badge, Avatar } from '@chakra-ui/react';
import { User } from '@/app/type/user';
import { BtnRemover } from '../buttons/IconBtns/BtnRemover&Entrar';


type AccordionHeaderProps = {
  nome: string,
  avatar: string,
}
//header do accordion
const AccordionHeader: React.FC<AccordionHeaderProps> = ({ nome, avatar }) => {
  return (
    <AccordionButton
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      bg="purple.400"
      color="white"
      _hover={{ bg: 'purple.300' }}
      borderRadius="md"
      borderBottomRadius="0"
      p={2}
      fontSize="lg"
    >
      <Flex alignItems="center">
        <Avatar name={nome} src={avatar} mr={2} boxSize={'30px'} />
        <span>{nome}</span>
      </Flex>
      <Box flexShrink={0}>
        <AccordionIcon color="white" />
      </Box>
    </AccordionButton>
  );
};

type AccordionItemPanelProps = {
  badges: string[],
  onClick: () => void
}
// painel do accordion
const AccordionItemPanel: React.FC<AccordionItemPanelProps> = ({ badges, onClick }) => {
  return (
    <AccordionPanel
      bg="#EDEDED"
      p={4}
      borderRadius="md"
      borderTopRadius="0"
      display="flex"
      flexDir={'column'}
      alignItems={'center'}
      justifyContent="center"
    >
      <Flex flexWrap="wrap" justifyContent="center" flexDirection="column" alignItems="center" width="100%">
        {badges.map((badge, index) => (
          <Badge key={index} colorScheme="purple" mb={2} borderRadius="md" fontSize="sm" maxWidth="100%">
            {badge}
          </Badge>
        ))}
      </Flex>
      <BtnRemover onClick={onClick} />
    </AccordionPanel>
  );
};

type AccordionItemProps = {
  avatar: string,
  nome: string,
  badges: string[],
  onClick: () => void
}
// Componente para cada item do accordion, combinando o header e o painel
const AccordionItem: React.FC<AccordionItemProps> = ({ avatar, nome, badges, onClick }) => {
  return (
    <ChakraAccordionItem
      boxShadow={"0.1rem 0.2rem 0.2rem 0.1rem rgba(0,0,0, 25%)"}
      borderRadius={'md'}
      gap={'2rem'}
    >
      <AccordionHeader nome={nome} avatar={avatar} />
      <AccordionItemPanel badges={badges} onClick={onClick} />
    </ChakraAccordionItem>
  );
};

type AccordionProps = {
  users: User[]
  setUsers: React.Dispatch<SetStateAction<User[]>>
}
// Componente de nível superior para o acordeão, renderizando todos os itens
const Accordion: React.FC<AccordionProps> = ({ users, setUsers }) => {
  return (
    <ChakraAccordion allowToggle
      allowMultiple
      width="450px"
      gap={'2rem'}
    >
      {users.map((user, index) => {
        function removeItem() {
          setUsers(users.filter((userFilter) => userFilter.user_id !== user.user_id))
        }
        return (
          <AccordionItem key={index} avatar={""} nome={user.user_name} onClick={removeItem} badges={[]} />
        )
      }
      )
      }
    </ChakraAccordion>
  );
};

export default Accordion;


// import { ChakraProvider } from '@chakra-ui/react';
// import Accordion from './Accordion';

// const App = () => {
//   const accordionItems = [
//     {
//       title: 'Joaquim Pereira',
//       avatar: '/images/avatar.jpg',
//       badges: ['Compromisso na data de realização das 18:00 ás 20:00', 'Compromisso na data de realização das 20:00 ás 21:00'] // Adicionando distintivos ao item do Accordion
//     },
//   ];

//   return (
//     <ChakraProvider>
//       <Accordion items={accordionItems} />
//     </ChakraProvider>
//   );
// };

// export default App;
