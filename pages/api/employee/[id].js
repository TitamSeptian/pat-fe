export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            return await getOneEmployee(req, res);
            break;
        case "PUT":
            return await updateEmployee(req, res);
            break;
        case "DELETE":
            return await deleteEmployee(req, res);
            break;
        default:
            return res.status(400).send("Method not allowed");
    }
}

const getOneEmployee = async (req, res) => {
    try {
        const result = await fetch(
            `http://localhost:8004/employee/${req.query.id}`,
            {
                method: "GET",
            }
        );
        const result2 = await result.json();
        return res.status(200).json(result2);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const result = await fetch(
            `http://localhost:8004/employee/${req.query.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req.body),
            }
        );
        return res.status(204).json(result.json());
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const result = await fetch(
            `http://localhost:8004/employee/${req.query.id}`,
            {
                method: "DELETE",
            }
        );
        return res.status(204).json(result.json());
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
