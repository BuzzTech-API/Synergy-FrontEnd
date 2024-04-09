import React from 'react';
import { Accordion as ChakraAccordion, AccordionItem as ChakraAccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Image, Flex, Badge } from '@chakra-ui/react';

//header do accordion
const AccordionHeader: React.FC<{ item: { avatar: string; title: string; } }> = ({ item }) => {
  return (
    <AccordionButton
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      bg="purple.200"
      color="white"
      _hover={{ bg: 'purple.300' }}
      borderRadius="md"
      borderBottomRadius="0"
      p={2}
      fontSize="lg"
    >
      <Flex alignItems="center">
        <Image src={item.avatar} boxSize="30px" borderRadius="full" mr={2} />
        <span>{item.title}</span>
      </Flex>
      <Box flexShrink={0}>
        <AccordionIcon color="white" />
      </Box>
    </AccordionButton>
  );
};

// painel do accordion
const AccordionItemPanel: React.FC<{ badges: string[] }> = ({ badges }) => {
  return (
    <AccordionPanel
      bg="gray.200"
      p={4}
      borderRadius="md"
      borderTopRadius="0"
      display="flex"
      justifyContent="center"
    >
      <Flex flexWrap="wrap" justifyContent="center" flexDirection="column" alignItems="center" width="100%">
        {badges.map((badge, index) => (
          <Badge key={index} colorScheme="purple" mb={2} borderRadius="md" fontSize="sm" maxWidth="100%">
            {badge}
          </Badge>
        ))}
      </Flex>
    </AccordionPanel>
  );
};

// Componente para cada item do accordion, combinando o header e o painel
const AccordionItem: React.FC<{ item: { avatar: string; title: string; badges: string[]; } }> = ({ item }) => {
  return (
    <ChakraAccordionItem>
      <AccordionHeader item={item} />
      <AccordionItemPanel badges={item.badges} />
    </ChakraAccordionItem>
  );
};

// Componente de nível superior para o acordeão, renderizando todos os itens
const Accordion: React.FC<{ items: { avatar: string; title: string; badges: string[]; }[] }> = ({ items }) => {
  return (
    <ChakraAccordion allowToggle width="450px">
      {items.map((item, index) => (
        <AccordionItem key={item.title} item={item} />
      ))}
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
