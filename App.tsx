import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import NavigationProvider from './src/routers/navigations';
import { pallete } from './src/configs/Colors';

enableScreens();


// import SplashScreen from 'react-native-splash-screen';

function App(): React.JSX.Element {
  

  // useEffect(() => {
  //      SplashScreen.hide();
  //    }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: pallete.screen}}>
            <NavigationProvider />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
