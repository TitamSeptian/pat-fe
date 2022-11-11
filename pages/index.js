import Head from "next/head";
import Link from "next/link";
import {
    VStack,
    IconButton,
    Table,
    Text,
    HStack,
    Tbody,
    Tr,
    Td,
    Spacer,
    Button,
    useToast,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { FaTrash, FaEye, FaPen } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Home({ employees }) {
    const toast = useToast();
    const router = useRouter();
    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/api/employee/${id}`, {
                method: "DELETE",
            });
            toast({
                title: "Employee deleted.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            router.push("/");
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            console.error(error);
        }
    };
    return (
        <>
            <Link href="/employee/create">
                <Button>+ New Employee</Button>
            </Link>
            {employees.map((employee) => (
                <HStack key={employee.id}>
                    <VStack alignItems="left">
                        <Text
                            fontSize="xs"
                            fontWeight="extrabold"
                            textTransform="uppercase"
                        >
                            {employee.nik}
                        </Text>
                        <Text color="grey.700">{employee.name}</Text>
                        <Table size="sm">
                            <Tbody>
                                <Tr>
                                    <Td textAlign="left">
                                        <Text fontWeight="bold">
                                            Gaji Total
                                        </Text>
                                    </Td>
                                    <Td textAlign="right">
                                        {employee.allowance -
                                            employee.salaryCuts}
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </VStack>
                    <Spacer />
                    <Link href="/employee/[id]" as={`/employee/${employee.id}`}>
                        <IconButton icon={<FaEye />} />
                    </Link>
                    <Link
                        href="/employee/edit/[id]"
                        as={`/employee/edit/${employee.id}`}
                    >
                        <IconButton color={`blue.500`} icon={<FaPen />} />
                    </Link>
                    {/* <Link href="/employee/[id]" as={`/employee/${employee.id}`}> */}
                    <IconButton
                        color="red.500"
                        icon={<FaTrash />}
                        onClick={() => handleDelete(employee.id)}
                    />
                    {/* </Link> */}
                    {/* <CGaji pegawai={pegawai} /> */}
                </HStack>
            ))}
        </>
    );
}

export const getStaticProps = async () => {
    const res = await fetch(`http://localhost:3000/api/employee`);
    const employees = await res.json();

    return {
        props: {
            employees,
        },
    };
};
