import { useState } from "react";
import { StyleSheet, View, ScrollView, Button, RefreshControl } from "react-native";
import { PanGestureHandler } from 'react-native-gesture-handler';
import NewsComponent from "./NewsComponent";

// import { newsData } from "../components/DisplayNews/news";
// const cards = newsData

function RenderData({cardToDisplay}) {
    return(
        <View style={[styles.eachContainer]}>
            <NewsComponent cardToDisplay={cardToDisplay}/>
        </View>
    )
}

export default function MainScreen({ cards, refresh, pullMe }) {

    const [renderCard, SetRenderCard ] = useState(cards[0])
    const [time, setTime ] = useState(0)

    const onPanGestureEvent = (event) => {
        const { nativeEvent } = event;
        const getTime = new Date()
        setTime(getTime)

        if(getTime-time>300)
        {        
            if(nativeEvent.velocityX < 0){
                console.log('swipe left to move right');
                SetRenderCard((pd) => {
                    let getIndex = 0
                    if(pd.id === cards[cards.length-1].id){
                        getIndex= cards.length-1
                    }
                    else{
                        for(let i=0; i<cards.length; i++){
                            if(cards[i].id === pd.id){
                                if(i<cards.length-1) getIndex=i+1;
                                i = cards.length;
                            }
                        }
                    }
                    return cards[getIndex]
                })
            }else {
                console.log('swipe right to move left');
                SetRenderCard((pd) => {
                    let getIndex = 0
                    for(let i=0; i<cards.length; i++){
                        if(cards[i].id === pd.id){
                            if(i>=1 && i<cards.length) getIndex=i-1;
                            i = cards.length;
                        }
                    }
                    return cards[getIndex]
                })
            }
        }
    }

    return(
        <ScrollView 
            refreshControl={
                <RefreshControl 
                    refreshing={refresh}
                    onRefresh={() => pullMe()}
                />
            }
            style={styles.container}
        >
            <PanGestureHandler
                onGestureEvent={onPanGestureEvent}
            >
                <View style={styles.container}>
                    <RenderData cardToDisplay={renderCard}/>  
                </View>
            </PanGestureHandler>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    eachContainer: {
        width: '100%',
    },

});