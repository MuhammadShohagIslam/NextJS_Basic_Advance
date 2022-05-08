import Link from "next/link";

const ClientPage = () => {
    const clients = [
        {
            id: 1,
            name: "A",
        },
        {
            id: 2,
            name: "B",
        },
    ];

    return (
        <>
            <h2>This is Client Page</h2>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                {clients.map((client) => (
                    <li key={client.id}>
                        <Link href={{
                            pathname:`/clients/[clientName]`,
                            query: {clientName: client.name}
                        }}>
                            {client.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ClientPage;
