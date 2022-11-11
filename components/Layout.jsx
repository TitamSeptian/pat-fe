import {
    ChakraProvider,
    VStack,
    Heading,
    theme,
    Stack,
    IconButton,
    Table,
    Text,
    HStack,
    Tbody,
    Tr,
    Td,
    Spacer,
    StackDivider,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { FaTrash } from "react-icons/fa";
export default function Layout({ children }) {
    return (
        <ChakraProvider theme={theme}>
            <VStack spacing={2}>
                <ColorModeSwitcher alignSelf="flex-end" p={4} mt={4} />
                <HStack spacing={8} align="space" alignItems="center" py={4}>
                    <Heading fontWeight="bold" size="2xl">
                        Employee
                    </Heading>
                </HStack>
                <VStack
                    divider={<StackDivider />}
                    borderColor="gray.100"
                    borderWidth="2px"
                    p="4"
                    borderRadius="lg"
                    w="100%"
                    maxW={{
                        base: "90vw",
                        sm: "80vw",
                        lg: "50vw",
                        xl: "40vw",
                    }}
                    gap={4}
                    alignItems="stretch"
                >
                    {children}
                </VStack>
            </VStack>
        </ChakraProvider>
    );
}
