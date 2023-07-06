import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type ModalPlanDeAccionProp = {
  url: string;
  isOpen: boolean;
  onClose: () => void;
};

type Props = {};

const ModalPlanDeAccion = (props: ModalPlanDeAccionProp) => {
  return (
    <>
      <Modal onClose={props.onClose} size={"5xl"} isOpen={props.isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Plan de Acción</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box height={"70vh"}>
              <iframe
                id="receipt"
                src={`${props.url}`}
                width={"100%"}
                height={"100%"}
              ></iframe>
            </Box>
          </ModalBody>
          <ModalFooter>
            {/*<Button onClick={() => printIframe("receipt")}>imprimir</Button>*/}
            <Button onClick={props.onClose}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalPlanDeAccion;
