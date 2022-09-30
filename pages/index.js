import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';


const HomePage = (props) => {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta
                name='description'
                content='Browse a huge list of highly active React meetups!'
                />
            </Head>
            <MeetupList meetups={props.meetups} />;
        </Fragment>
    );
}

export async function getStaticProps() {
    //fetch data from an API
    const client = await MongoClient.connect(
        'mongodb+srv://dbuser:passpass@cluster0.whqft.mongodb.net/?retryWrites=true&w=majority'
    );
    const db = client.db();
    const meeetupsCollection = db.collection('meetups');
    const meetups = await meeetupsCollection.find().toArray();
    client.close();

    return {
        props:{
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },
        revalidate:1,
    };
}

export default HomePage;