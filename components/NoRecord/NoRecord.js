import { StyleSheet, View, Text } from "react-native";

export default function NoRecord() {

    return(
        <View style={styles.container}>
            <Text style={styles.text}> No Records!!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 24
    },
})