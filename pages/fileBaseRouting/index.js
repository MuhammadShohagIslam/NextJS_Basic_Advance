import { Fragment } from "react";
import Table from "react-bootstrap/Table";

const FileBaseRouting = () => {
    return (
        <Fragment>
            <h2>File Base Routing Instead Of Code-based Routing</h2>
            <ul>
                <li>No Need react-router, no in-code route definitions</li>
                <li>
                    Create React component files and let NextJS infer the routes
                    from the folder structure.(The special/pages folder)
                </li>
            </ul>

            <h2>File Base Routing vs Code-based Routing</h2>
            <Table style={{ textAlign: "center" }}>
                <thead>
                    <tr>
                        <th>File-based</th>
                        <th>Code-based</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>File-based Routing(NextJS)</td>
                        <tb>Code-based Routing(React+react-router)</tb>
                    </tr>
                    <tr>
                        <td>Not extra boilerplate code required</td>
                        <td>Boilerplate setup in code required</td>
                    </tr>
                    <tr>
                        <td>Intuitive system</td>
                        <td>
                            Straightforward but include new components +
                            concepts
                        </td>
                    </tr>
                    <tr>
                        <td>
                            File + Folder structure(in pages/folder) influences
                            routes
                        </td>
                        <td>File + Folder setup does not matter at all</td>
                    </tr>
                    <tr>
                        <td>
                            Navigation works with link component and
                            imperatively
                        </td>
                        <td>
                            Navigation works with link component and
                            imperatively
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Fragment>
    );
};

export default FileBaseRouting;
