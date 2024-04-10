import { useState } from "react";
import { StyleSheet, Pressable, Image, View, Text, Modal, TouchableOpacity  } from "react-native";

export default function ImageRender({path}) {    

    const [modalVisible, setModalVisible] = useState(false);

    function imagePressHandler() {
        console.log('imagePressHandler');
        setModalVisible(true)
    }


    return(
        <View>

        <Pressable onPress={imagePressHandler}>
            <Image source={{ uri: path }} style={styles.image} />
        </Pressable>

        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <Image
                    source={{ uri: path }}
                    style={styles.modalImage}
                />                
            </View>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
        </Modal>

        </View>

    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 320,
        resizeMode:'cover',
        marginTop: -5
    },    
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width:390,
        height: 400,
        resizeMode: 'contain',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        padding: 10,
    },
    closeButtonText: {
        color: '#FFF',
        fontSize: 18,
    }
})