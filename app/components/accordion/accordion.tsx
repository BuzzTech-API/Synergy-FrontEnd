import React, { useState } from 'react';
import { Accordion as ChakraAccordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Center } from '@chakra-ui/react';

// definição da interface para os itens do accordion
interface AccordionProps {
  items: { title: string; content: React.ReactNode }[]; // Cada item tem um título e um conteúdo
}

// componente de Accordion
const Accordion: React.FC<AccordionProps> = ({ items }) => {
  // estado para controlar o índice do item selecionado
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // função para lidar com o clique em um item do accordion
  const handleItemClick = (index: number) => {
    // se o índice selecionado for o mesmo do índice clicado, deselecione, caso contrário, selecione
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  return (
    <Center>
      {/* box*/}
      <Box maxWidth="600px" width="100%" boxShadow="md" border="2px solid" borderColor="blue.500">
        {/* componente permitindo a alternância de itens */}
        <ChakraAccordion allowToggle>
          {/* mapeando os itens do accordion */}
          {items.map((item, index) => (
            <AccordionItem key={index} _expanded={{ backgroundColor: 'blue.100', color: 'black' }}>
              {/* header do item do accordion */}
              <h2>
                {/* botão para controlar a abertura e fechamento do item */}
                <AccordionButton _expanded={{ backgroundColor: 'blue.200', color: 'blue.900' }} onClick={() => handleItemClick(index)}>
                  {/* título do item */}
                  <p>{item.title}</p>
                  {/* icone de seta para indicar o estado do item (aberto ou fechado) */}
                  <AccordionIcon color="blue.500" />
                </AccordionButton>
              </h2>
              {/* conteúdo do item do accordion */}
              <AccordionPanel pb={4} _expanded={{ backgroundColor: 'blue.200', color: 'black' }}>
                {item.content}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </ChakraAccordion>
      </Box>
    </Center>
  );
};

export default Accordion;

//EXEMPLO
// import React from 'react';
// import { ChakraProvider } from '@chakra-ui/react';
// import Accordion from './Accordion'; // Importa o componente Accordion

// const App: React.FC = () => {
//   // Array de itens para o Accordion, cada objeto contém um título e um conteúdo
//   const accordionItems = [
//     {
//       title: 'Section 1',
//       content: '',
//     },
//     {
//       title: 'Section 2',
//       content: 'conteudo 2',
//     },
//     {
//       title: 'Section 3',
//       content: 'conteudo 3',
//     },
//     {
//       title: 'Section 4',
//       content: 'conteudo 4',
//     },
//     {
//       title: 'Section 5',
//       content: 'conteudo 5',
//     },
//   ];

//   return (
//     <ChakraProvider>
//       <Accordion items={accordionItems} />
//     </ChakraProvider>
//   );
// };

// export default App;
