import { Fragment } from "react";

const UserProfilePage = (props) => {
    return (
        <Fragment>
                <h2>{props.username}</h2>
        </Fragment>
    );
}

/*
    *** getServerSideProps() ***
        => Sometimes, we need to pre-render for every request OR
                we need access to the request object (e.g for cookies )
        => We really might want to run logic for every incoming request
         either beacuse we need access to the request or the data changes 
         all the time, such cases, we can use getServerSideProps(), which
         only run the server, not during the build process, pre-rendered on 
         the server
         => data only executes on the server after deployment and
         our development server

         => we have highly dymanic data, which changes multiple times
         every second, therefore we know that any old page we would serving
         would be already outdated, that could be another reason for using
         getServerSideProps()
         => if we use this, this page is not pre-generated


*/
export async function getServerSideProps(context){
    const {params, req, res} = context;
    return{
        props: {
            username: "Shohag"
        }
    }
}
export default UserProfilePage;