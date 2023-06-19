import {
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Input,
  Stack,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";

import { ReactNode, useState } from "react";

export default function UpLoadField(props: {
  name: string;
  id: string;

  label: string;
  acceptedFileTypes: string;
  onChange: (e: any) => void;
  onDeleteImage: (isDelete: boolean) => void;
}) {
  const { name, label, id, onChange, acceptedFileTypes, onDeleteImage } = props;
  const [file, setFile] = useState(null);

  return (
    <FormControl>
      <FormLabel
        fontSize="sm"
        fontWeight="md"
        color="gray.700"
        _dark={{
          color: "gray.50",
        }}
      >
        {label}
      </FormLabel>
      <Flex
        mt={1}
        justify="center"
        px={6}
        pt={5}
        pb={6}
        borderWidth={2}
        _dark={{
          color: "gray.500",
        }}
        borderStyle="dashed"
        rounded="md"
      >
        <VisibleComponent visible={file !== null}>
          <Stack spacing={1} textAlign="center">
            <Flex
              justifyContent={{
                base: "center",
                md: "end",
              }}
              mt={0}
            >
              <CloseButton
                onClick={() => {
                  setFile(null);
                  onDeleteImage(true);
                }}
              />
            </Flex>
            <Image src={file} style={{ width: 300 }} />
          </Stack>
        </VisibleComponent>

        <Stack spacing={1} textAlign="center">
          <VisibleComponent visible={file === null}>
            <Icon
              mx="auto"
              boxSize={12}
              color="gray.400"
              _dark={{
                color: "gray.500",
              }}
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Icon>
          </VisibleComponent>

          <Flex
            fontSize="sm"
            color="gray.600"
            _dark={{
              color: "gray.400",
            }}
            alignItems="center"
          >
            <FormLabel
              htmlFor={id}
              cursor="pointer"
              rounded="md"
              fontSize="md"
              color="brand.600"
              _dark={{
                color: "brand.200",
              }}
              pos="relative"
              _hover={{
                color: "brand.400",
                _dark: {
                  color: "brand.300",
                },
              }}
            >
              <VisibleComponent visible={file === null}>
                <span>Seleccionar Imagen</span>
              </VisibleComponent>

              <VisuallyHidden>
                <Input
                  id={id}
                  name={name}
                  placeholder="Basic usage"
                  accept={acceptedFileTypes}
                  onChange={(e) => {
                    setFile(URL.createObjectURL(e?.target?.files[0]) ?? []);
                    onChange(e);
                  }}
                  type="file"
                />
              </VisuallyHidden>
            </FormLabel>
          </Flex>
          <VisibleComponent visible={file === null}>
            <Text
              fontSize="xs"
              color="gray.500"
              _dark={{
                color: "gray.50",
              }}
            >
              PNG, JPG, GIF up to 10MB
            </Text>
          </VisibleComponent>
        </Stack>
      </Flex>
    </FormControl>
  );
}

interface Props {
  children?: ReactNode;
  visible: boolean;
}
// const VisibleComponent: React.FC<Props> = ({ children, visible }) => {
export function VisibleComponent(props: Props): JSX.Element {
  const { children, visible } = props;

  if (visible) {
    return <>{children}</>;
  } else {
    return (
      <>
        <VisuallyHidden>{children}</VisuallyHidden>
      </>
    );
  }
}
