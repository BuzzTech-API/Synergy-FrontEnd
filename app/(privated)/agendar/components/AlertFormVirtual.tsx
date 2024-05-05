'use client'
import { BtnAgendar } from "@/app/components/buttons/IconBtns/BtnAgendar&Reagendar"
import { Button, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"


function ModalAgendarVirtual() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <BtnAgendar type="submit" onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Para realizar agendamento é necessário se autenticar com o Zoom</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Link href={`https://zoom.us/oauth/authorize?response_type=code&client_id=SfOs6_WBQI2fXXh6TnkfZg&redirect_uri=http://localhost:3000/zoomAuth`}>
              <Button variant='ghost'>Realizar Autenticação</Button>
            </Link>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='danger' mr={3} onClick={onClose}>

            </Button>
            <Button>
              Confirmar Autenticação
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
