import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, FlatList } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { convertDate } from '../../../res/function/Functions';
import { colors, fonts } from '../../../res/style/theme';
import ItemHistory from '../../home/custom/ItemHistory';
import Skeleton from '../../custom/Skeleton';
const initialLayout = { width: Dimensions.get('window').width };

export default function TabViewExample(props) {
   const [index, setIndex] = React.useState(0);
   const [routes] = React.useState([
      { key: 'first', title: 'Chi tiêu' },
      { key: 'second', title: 'Thu nhập' },
   ]);
   const loadingItem = () => {
      let listItem = [];
      for (var i = 0; i < 20; i++) {
         listItem.push(
            <View style={{ height: 40, marginHorizontal: 16, marginTop: 16, borderRadius: 12 }} />,
         );
      }
      return <Skeleton>{listItem}</Skeleton>;
   };
   const Route1 = () => (
      <FlatList
         data={props.expense.data}
         showsVerticalScrollIndicator={false}
         keyExtractor={(item, index) => String(index)}
         ListEmptyComponent={props.expense.loading ? loadingItem() : null}
         renderItem={({ item, index }) => (
            <ItemHistory
               index={index}
               code={item.code}
               money={item.money}
               date={convertDate(item.date)}
               type={item.type}
            />
         )}
      />
   );
   const Route2 = () => (
      <FlatList
         data={props.income.data}
         showsVerticalScrollIndicator={false}
         keyExtractor={(item, index) => String(index)}
         ListEmptyComponent={props.income.loading ? loadingItem() : null}
         renderItem={({ item, index }) => (
            <ItemHistory
               index={index}
               code={item.code}
               money={item.money}
               date={convertDate(item.date)}
               type={item.type}
            />
         )}
      />
   );

   const renderScene = SceneMap({
      first: Route1,
      second: Route2,
   });
   const renderTabBar = (props) => (
      <TabBar
         {...props}
         indicatorStyle={{ backgroundColor: colors.blue }}
         style={{ backgroundColor: colors.white }}
         renderLabel={({ route, focused, color }) => (
            <Text
               style={[
                  {
                     fontSize: 16,
                     textAlign: 'center',
                     fontFamily: fonts.medium,
                     width: 150,
                  },
                  focused ? { fontFamily: fonts.bold, color: colors.black } : { color: colors.gray },
               ]}>
               {route.title}
            </Text>
         )}
      />
   );

   return (
      <TabView
         navigationState={{ index, routes }}
         renderScene={renderScene}
         renderTabBar={renderTabBar}
         onIndexChange={setIndex}
         initialLayout={initialLayout}
      />
   );
}

const styles = StyleSheet.create({
   scene: {
      flex: 1,
   },
});
