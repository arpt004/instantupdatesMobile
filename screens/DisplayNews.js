import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import { useRoute } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import MainScreen from "../components/DisplayNews/MainScreen";
import NoRecord from "../components/NoRecord/NoRecord";
import Loader from "../components/Loader/Loader";
import messaging from "@react-native-firebase/messaging";

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

    async function insert_push_key(pushToken) {

        try{
            // instantupdates.in/api/insert-push-key
            // Notification Push token for expo in mobile : ExponentPushToken[BHj3CCMmxO2DxISmfM8Kwl]
            // Notification Push token for android studio emulator : ExponentPushToken[25jUfPHtleWIrwD-jWVIXN]
            // const deviceData = { pushKey : 'ExponentPushToken[25jUfPHtleWIrwD-jWVIXN]'}

            const deviceData = { pushKey : pushToken}
            const responseInsertPushKey = await fetch( `https://www.instantupdates.in/api/insert-push-key`, 
                {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(deviceData),
                },
            );

            if(responseInsertPushKey.ok){
                console.log(responseInsertPushKey)
            }
          }catch(error) {
            console.log(error);
          }
    }


    useEffect( () => {
        async function configurePushNotifications() {

             // configure expo
            const { status } =  await Notifications.getPermissionsAsync();
            let finalStatus = status;
            if(finalStatus !== 'granted') {
                const { status } =  await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            


            // // configure firebase
            // const status =  await messaging().requestPermission();
            // const enabled = status===messaging.AuthorizationStatus.AUTHORIZED || status===messaging.AuthorizationStatus.PROVISIONAL;

            // // to get the expo push token
            // const pushToken = await Notifications.getExpoPushTokenAsync();
            // console.log(pushToken)

            if(finalStatus !== 'granted') {
                Alert.alert(
                    'Permission required',
                    'Push notifications need the appropriate permissions.'
                );
                return;
            }

            console.log('pushToken')
            const pushToken = await messaging().getToken();
            console.log(pushToken)
            if(pushToken) insert_push_key(pushToken)

            // // expo default
            if (Platform.OS === 'android') {
                Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.DEFAULT
                })
            }

            // // check weather initial notification is available
            // messaging().getInitialNotification().then( async (remoteMessage) => {
            //     if(remoteMessage) {
            //         console.log(" Notification caused app to open from quit", remoteMessage.notification)
            //     }
            // });

            // // Assume a message contains a type property in the data payload of the screen
            // messaging().onNotificationOpenedApp( (remoteMessage) => {
            //     console.log(" Notification caused app to open from background", remoteMessage.notification)
            // });

            // // Register background handler
            // messaging().setBackgroundMessageHandler( async (remoteMessage) => {
            //     console.log("Mesaage handled in the background ", remoteMessage.notification)
            // });

            // //
            // const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            //     Alert.alert("A new message arrived", JSON.stringify(remoteMessage))
            // })

            // return unsubscribe;
        }

        configurePushNotifications();
    },[])


    // // Additional notification listener expo
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