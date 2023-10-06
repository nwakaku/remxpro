// @ts-nocheck
import {
  Modal,
  ModalOverlay,
  Heading,
  ModalContent,
  Flex,
  Textarea,
  InputRightElement,
  Button,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AI } from "./AI";

export const SrcModalAI = ({
  getSource,
  isOpen,
  onClose,
}: {
  getSource: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const source = getSource();
  const [main, updateMain] = useState();

  let feeder;

  const setMain = (response: string) => {
    updateMain(response);
    console.log("Response:", response);
  };

  // const answer = await AI(source);
  // setMain(answer);

  if (source.length < 100){
    feeder = ""
  } else {
    feeder = source;
  }

  useEffect(() => {
    AI(feeder)
      .then(setMain)
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [feeder]);
  

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        maxW="unset"
        color="#fff"
        backgroundColor="#242736"
        boxShadow="rgb(0 0 0 / 20%) 0px 0px 50px"
        width="600px"
        borderRadius="24px"
      >
        <Flex padding="32px" direction="column">
          <Heading
            fontWeight="500"
            fontSize="12px"
            textTransform="uppercase"
            letterSpacing="0.1em"
            color="#fff"
            mt="1.5px"
            ml="0.75px"
            mb="24px"
            style={{ fontFeatureSettings: "'ss02' on" }}
          >
            AI Documentation Of Source Code
          </Heading>

          <Textarea minH="70vh">{main || null}</Textarea>
        </Flex>
      </ModalContent>
    </Modal>
  );
};
