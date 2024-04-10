import { createDrawerNavigator } from '@react-navigation/drawer';

import DisplayNews from '../screens/DisplayNews';
import WelcomeScreenNoTwo from '../screens/WelcomeScreenNoTwo';

const category = [
  'All',
  'Business',
  'Politics',
  'Sports',
  'Technology',
  'World',
  'Market'
]

const Drawer = createDrawerNavigator();

const RouteDrawer = () => {

  return (
    <Drawer.Navigator screenOptions={{
        headerStyle: { backgroundColor: '#351401'},
        headerTintColor: 'white',
        sceneContainerStyle: { backgroundColor: '#3f2f25'} ,
        drawerActiveBackgroundColor: '#351401',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#ccc',
        drawerStyle: { backgroundColor: '#3f2f25'},
        headerTitle: 'Instant updates'
      }}
    >
      {category.map((eachCategory) => {
        return <Drawer.Screen key={eachCategory}
                  name={eachCategory} 
                  component={DisplayNews} 
                  initialParams={{ category: eachCategory }}  
                />
      })
      }
      {/* <Drawer.Screen name='WelcomeScreenNoTwo' component={WelcomeScreenNoTwo}  /> */}

    </Drawer.Navigator>
  )
}

export default RouteDrawer