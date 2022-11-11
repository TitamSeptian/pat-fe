import {
    FormControl,
    FormLabel,
    Input,
    RadioGroup,
    Stack,
    Radio,
    Button,
    useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Create() {
    const router = useRouter();
    const toast = useToast();
    const [employee, setEmployee] = useState({
        nik: "",
        name: "",
        allowance: 0,
        salaryCuts: 0,
        gender: "",
    });
    useEffect(() => {
        const fetchEmployee = async (id) => {
            try {
                const { data } = await fetch(
                    `http://localhost:3000/api/employee/${id}`
                );
                setEmployee(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (router.query?.id) {
            fetchEmployee(router.query.id);
        }
        console.log("called");
    });
    const submitHandle = async (e) => {
        e.preventDefault();
        try {
            if (router.query?.id) {
                await fetch(
                    `http://localhost:3000/api/employee/${router.query.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(employee),
                    }
                );
                alert("updated");
            } else {
                await fetch("http://localhost:3000/api/employee", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(employee),
                });
                toast({
                    title: "Success",
                    description: "Employee has been created",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                // alert("created");
            }
            // alert("Success");
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };
    const handleOnChange = ({ target: { name, value } }) => {
        const newEmployee = { ...employee, [name]: value };
        // console.log(name, value);
        setEmployee(newEmployee);
    };
    return (
        <>
            <Link href="/">
                <Button colorScheme="gray" mr={3} type="submit">
                    Back
                </Button>
            </Link>
            <form onSubmit={submitHandle}>
                <FormControl isRequired>
                    <FormLabel htmlFor="nik">NIK</FormLabel>
                    <Input
                        placeholder="Ex. 3211111111111111"
                        id="nik"
                        type="text"
                        name="nik"
                        variant="filled"
                        autoComplete="off"
                        onChange={handleOnChange}
                    />
                </FormControl>
                <FormControl isRequired mt={4}>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                        placeholder="Ex. Septi"
                        id="name"
                        type="text"
                        name="name"
                        variant="filled"
                        autoComplete="off"
                        onChange={handleOnChange}
                    />
                </FormControl>
                <FormControl isRequired mt="4">
                    <FormLabel htmlFor="gender">Jenis Kelamin</FormLabel>
                    <RadioGroup name="gender" id="gender">
                        <Stack direction="row">
                            <Radio value="perempuan" onChange={handleOnChange}>
                                Perempuan
                            </Radio>
                            <Radio value="laki-laki" onChange={handleOnChange}>
                                Laki-Laki
                            </Radio>
                        </Stack>
                    </RadioGroup>
                </FormControl>
                <FormControl isRequired mt={4}>
                    <FormLabel htmlFor="allowance">Allowance</FormLabel>
                    <Input
                        placeholder="Ex. 300000000"
                        id="allowance"
                        type="text"
                        name="allowance"
                        variant="filled"
                        autoComplete="off"
                        onChange={handleOnChange}
                    />
                </FormControl>
                <FormControl isRequired mt={4}>
                    <FormLabel htmlFor="salaryCuts">Salary Cuts</FormLabel>
                    <Input
                        placeholder="Ex. 300000000"
                        id="salaryCuts"
                        type="text"
                        name="salaryCuts"
                        variant="filled"
                        autoComplete="off"
                        onChange={handleOnChange}
                    />
                </FormControl>
                <Button
                    colorScheme="blue"
                    mr={3}
                    type="submit"
                    width="full"
                    mt={4}
                >
                    {router.query?.id ? "Update Employee" : "Save Employee"}
                </Button>
            </form>
        </>
    );
}
