// import { StyleSheet, View, Text } from "react-native";

// export default function WelcomeScreenNoTwo() {
//     return(
//         <View style={styles.container}>
//             <Text> Welcome to welcomeScreen no Two </Text>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
// });


import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

const subjects = [
  { id: 1, name: 'Card 1' },
  { id: 2, name: 'Card 2' },
  { id: 3, name: 'Card 3' },
  { id: 4, name: 'Card 4' },
];

const cardGap = 16;
const cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2;

const WelcomeScreenNoTwo = () => {
  return (
    <ScrollView>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {subjects.map((subject, i) => (
          <View
            key={subject.id}
            style={{
              marginTop: cardGap,
              marginLeft: i % 2 !== 0 ? cardGap : 0,
              width: cardWidth,
              height: 180,
              backgroundColor: 'white',
              borderRadius: 16,
              shadowOpacity: 0.2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity>
              <Text>{subject.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default WelcomeScreenNoTwo;
