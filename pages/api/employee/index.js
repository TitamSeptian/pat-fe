export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return await getEmployee(req, res);
            break;
        case "POST":
            return await createEmployee(req, res);
            break;
        default:
            return res.status(400).send("Method not allowed");
            break;
    }
}
const url = "http://localhost:8004/employee";
const getEmployee = async (req, res) => {
    const resEmployee = await fetch(url);
    const employees = await resEmployee.json();
    return res.status(200).json(employees);
};

const createEmployee = async (req, res) => {
    // console.log("called on this");
    console.log(req.body);
    const { nik, name, gender, allowance, salaryCuts } = req.body;
    const resEmployee = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nik: nik,
            name: name,
            gender: gender,
            allowance: allowance,
            salaryCuts: salaryCuts,
        }),
    });
    const employee = await resEmployee.json();
    return res.status(200).json(employee);
};
