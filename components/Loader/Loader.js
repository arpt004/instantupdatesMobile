import { StyleSheet, View, Text, Pressable } from "react-native";

export default function Loader() {

    return(
        <View style={styles.container}>
            <Text style={styles.text}> Loading... </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    text: {
        color: 'grey',
        fontSize: 24
    },
})