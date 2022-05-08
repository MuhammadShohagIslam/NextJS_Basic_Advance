import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
/*
    *** Client Side Data Fetching ***
        => Some data does not need to be pre-rendered, which can not be pre-rendered.
        => Data changing with high frequency (stock data), or highly user-specific data (last orders in online shop) beacuse this data does not need SEO and pre-rendered
        => partial data (data that's only use on a part on page) like dashboard page-> lots of several 
        pieces of data , loading all these serverl data which make up, overal dashboard might be slow 
        down the request, pre-rendering might not be make sense beacuse it's personal data or changing data more time.
        => Pre-fetching the data for page generation might not work or be required.
        => "Traditional" client side data fetching (useEffect with fetch() is fine)
*/


const fetcher = (url) => axios.get(url).then((res) => res.data);

const ClientSideDataFetching = (props) => {
    const [sales, setSales] = useState(props.sales); // this combining pre-Fetching with client-side

    const { data, error } = useSWR(
        "https://clinetsidefetching-default-rtdb.firebaseio.com/sales.json",
        fetcher
    );

    useEffect(() => {
       
        if (data) {
            const transformData = [];
            for (let key in data) {
                transformData.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }
            setSales(transformData);
        }
        // async function dataFetching() {
        //     const response = await fetch(
        //         "https://clinetsidefetching-default-rtdb.firebaseio.com/sales.json"
        //     );
        //     const data = await response.json();
        //     const transformData = [];

        //     for (let key in data) {
        //         transformData.push({
        //             id: key,
        //             username: data[key].username,
        //             volume: data[key].volume,
        //         });
        //     }

        //     setSales(transformData);
        //     setLoading(false);
        // }
        // dataFetching();
    }, [data]);

    if (error) {
        return <p>Failed Loading Data</p>;
    }
    if (!data && !sales) {
        return <p>Loading...</p>;
    }
    return (
        <Fragment>
            <ul>
                {sales.map((sale) => (
                    <div key={sale.id}>
                        <li>{sale.username}</li>
                        <li>{sale.volume}</li>
                    </div>
                ))}
            </ul>
        </Fragment>
    );
};

export async function getServerSideProps(){
    const response = await fetch(
        "https://clinetsidefetching-default-rtdb.firebaseio.com/sales.json"
    );
    const data = await response.json();

    const transformData = [];
    for (let key in data) {
        transformData.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
        });
    }

    return{
        props: {
            sales: transformData
        }
    }

}

export default ClientSideDataFetching;
