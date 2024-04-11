import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import { useRoute } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import MainScreen from "../components/DisplayNews/MainScreen";
import NoRecord from "../components/NoRecord/NoRecord";
import Loader from "../components/Loader/Loader";

// import { newsData } from "../components/DisplayNews/news";
// const cards = newsData


export default function DisplayNews() {

    const route = useRoute();
    const { category } = route.params; 
    const [displayData, setDisplayData] = useState(null);
    const [refresh, setRefresh] = useState(false);

    function formatCategoryData(news, category) {
        const categoryArray = ['business', 'politics', 'sports', 'technology', 'world', 'market']

        if(category && categoryArray.includes(category)) {
            const filterData = news.filter((eachNews) => eachNews.category.toLowerCase() === category);
            setDisplayData(filterData)
        } else{
            setDisplayData(news)
        }
    }

    async function fetchNewsData() {
        try{
            // fetch from database
            // const response = await fetch( `https://www.instantupdates.in/api/fetchAll`);

            // fetch from trending topics
            const response = await fetch( `https://www.instantupdates.in/api/fetchTrending`);

            if(response.ok) {
                const res = await response.json();
                formatCategoryData(res, category.toLowerCase())
            }else{
                setDisplayData(null)
            }
        }catch(error) {
            setDisplayData(null)
            console.log(error);
        }
    }

    useEffect(() => {
        fetchNewsData();
    },[category])

    useEffect( () => {
        async function configurePushNotifications() {
            const { status } =  await Notifications.getPermissionsAsync();
            let finalStatus = status;

            if(finalStatus !== 'granted') {
                const { status } =  await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if(finalStatus !== 'granted') {
                Alert.alert(
                    'Permission required',
                    'Push notifications need the appropriate permissions.'
                );
                return;
            }

            // // to get the expo push token
            // const pushToken = await Notifications.getExpoPushTokenAsync();
            // console.log(pushToken)

            if (Platform.OS === 'android') {
                Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.DEFAULT
                })
            }
        }

        configurePushNotifications();
    })


    // // Additional notification listener
    // useEffect(() =>{
    //     const subscriptionReceived = Notifications.addNotificationReceivedListener( (notification) => {
    //         return;
    //     });

    //     const subscriptionResponse = Notifications.addNotificationResponseReceivedListener( (response) => {
    //         return;
    //     })

    //     return () => {
    //         subscriptionReceived.remove();
    //         subscriptionResponse.remove();
    //     }
    // },[])

    // // Schedule Notication as a timer
    // function notificationSchedule() {
    //     Notifications.scheduleNotificationAsync({
    //         content: {
    //           title: 'Get Upadate with Instant Updates!!',
    //           body: 'latest news on your hand be update',
    //           data: {username: 'Arpit'}
    //         },
    //         trigger: {
    //             seconds: 2
    //         },
    //     });
    // }


    // // push notifiation using expo server
    // function sendPushNotificationHandler() {
    //     fetch('https://exp.host/--/api/v2/push/send', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             to: 'ExponentPushToken[BHj3CCMmxO2DxISmfM8Kwl]',
    //             title: 'Instant Updates!!',
    //             body: 'Get updated with instant updates!!'
    //         })
    //     })
    // }

    Notifications.setNotificationHandler({
        handleNotification: async () => {
            return{
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
            }
        }
    });

    function pullMe() {
        setRefresh(true);
        fetchNewsData();

        setTimeout(() => {
            setRefresh(false);
        },100)
    }

    if(refresh) {
        return <Loader />
    }

    return (
        displayData && displayData.length>0 ? <MainScreen cards={displayData} refresh={refresh} pullMe={pullMe}/>
        : displayData ? <NoRecord />
        : <Loader />
    )
}