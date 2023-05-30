import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

interface DrawerComponentProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  isLoading: boolean;
  children: React.ReactNode;
  titulo?: string;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  isOpen,
  onClose,
  handleSubmit,
  isLoading,
  children,
  titulo = "Agregar",
}) => {
  return (
    <Drawer size={"md"} isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">{titulo}</DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button
            isLoading={isLoading}
            type="submit"
            colorScheme="vaku.700"
            bg={"vaku.700"}
            variant="solid"
            size="md"
            borderRadius={25}
            onClick={() => {
              console.log("click en drawer");
              handleSubmit();
            }}
          >
            Guardar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
