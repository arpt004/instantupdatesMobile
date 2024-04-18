import { StyleSheet, View, Text, Pressable } from "react-native";
import ImageRender from "../../ui/ImageRender";

export default function NewsComponent({cardToDisplay}) {

    function sourcePressHandler() {
        console.log('sourcePressHandler')
    }

    return(
        <View>
            <ImageRender path={cardToDisplay.image}/>

            <View style={styles.container}>
                <View>
                    <Text style={styles.title}> { cardToDisplay.title } </Text>
                    <Pressable onPress={sourcePressHandler}> 
                        <Text style={styles.author}> 
                            <Text style={styles.source}> {cardToDisplay.source} </Text>
                            - {cardToDisplay.author_name && cardToDisplay.author_name}
                        </Text>
                    </Pressable>
                </View>

                <View>
                    <Text style={styles.description}>{ cardToDisplay.description } </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    author: {
        fontSize: 12,
        fontStyle: 'italic',
        fontWeight: 'normal', 
        marginBottom: 8,       
    },
    source: {
        fontWeight: 'bold',  
    },
    description: {
        fontSize: 18,
        fontWeight: 'light',
        lineHeight: 25,   
    }
})