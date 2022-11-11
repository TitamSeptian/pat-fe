import {
    Container,
    VStack,
    Heading,
    Text,
    Table,
    TableCaption,
    Tbody,
    Tr,
    Td,
    Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Link from "next/link";
export default function EmployeePage({ employee }) {
    const [alignItems, setAlignItems] = useState("left");
    const [spacing, setSpacing] = useState(4);
    return (
        <>
            <Container>
                <VStack spacing={spacing} alignItems={alignItems}>
                    <Heading size={`2xl`}>{employee.name}</Heading>
                    <Text>NIK : {employee.nik}</Text>
                    <Text>Jenis Kelamin : {employee.gender}</Text>
                    <Table variant={`simple`} px={`8`}>
                        <TableCaption>
                            gaji pegawai sesuai dengan golongan dan di
                            kalkilasikan dengan potongan dan tunjangan
                        </TableCaption>
                        <Heading size={`h1`}>Gaji Pegawai</Heading>
                        <Tbody>
                            <Tr>
                                <Td>Tunjangan</Td>
                                <Td isNumeric>{employee.allowance}</Td>
                            </Tr>
                            <Tr>
                                <Td>Potongan</Td>
                                <Td isNumeric>{employee.salaryCuts}</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                    <Link href="/">
                        <Button variant="ghost" width="full">
                            Back
                        </Button>
                    </Link>
                </VStack>
            </Container>
        </>
    );
}

export const getServerSideProps = async ({ query }) => {
    const res = await fetch(`http://localhost:3000/api/employee/${query.id}`, {
        method: "GET",
    });
    const employee = await res.json();
    console.log(employee);
    return {
        props: {
            employee,
        },
    };
};
