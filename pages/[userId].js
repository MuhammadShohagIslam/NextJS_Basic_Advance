import { Fragment } from "react";

const UserIdPage = (props) => {
    return (
        <Fragment>
            <h1>{props.userId}</h1>
        </Fragment>
    );
};
export async function getServerSideProps(context) {
    const { params } = context;
    const userId = params.userId
    return {
        props: {
            userId: "User Id --- " + userId
        },
    };
}
export default UserIdPage;
