import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import { convertDate } from '../../res/function/Functions';
import { colors } from '../../res/style/theme';
import Header from '../custom/Header';
import ItemHistory from '../home/custom/ItemHistory';
export default class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         items: {},
         history: {},
      };
   }
   loadItems(day) {
      setTimeout(() => {
         for (let i = -15; i < 30; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = this.timeToString(time);
            if (!this.state.items[strTime]) {
               this.state.items[strTime] = [];
               const numItems = Math.floor(Math.random() * 5);
               // for (let j = 0; j < numItems; j++) {
               //    this.state.items[strTime].push({
               //       name: 'Item for ' + strTime,
               //       height: Math.max(50, Math.floor(Math.random() * 150)),
               //    });
               // }
            }
         }
         const newItems = {};
         Object.keys(this.state.items).forEach((key) => {
            newItems[key] = this.state.items[key];
         });
         this.setState({
            items: newItems,
         });
      }, 1000);
   }

   renderItem(item) {
      return (
         <View style={[styles.item, { height: item.height }]}>
            <Text>{item.name}</Text>
         </View>
      );
   }

   renderEmptyDate() {
      return <View style={styles.item}></View>;
   }

   rowHasChanged(r1, r2) {
      return r1.name !== r2.name;
   }

   timeToString(time) {
      const date = new Date(time);
      return date.toISOString().split('T')[0];
   }
   timeCut = (time = '') => {
      return time.split('T')[0];
   };
   componentDidMount() {
      this.getItem();
   }
   componentDidUpdate(prevProps) {
      if (this.props.data !== null && this.props.data !== prevProps.data) {
         this.getItem();
      }
   }
   getItem = () => {
      let newItem = {};
      let key = [];
      //add key to object
      this.props.data.map((item) => {
         key.push(this.timeToString(item.date));
      });
      let keys = new Set(key);
      keys = Array.from(keys);
      for (var i of keys) {
         newItem[i] = [];
      }
      //push data to key object
      for (var item of this.props.data) {
         for (var date in newItem) {
            if (this.timeToString(item.date) == date) {
               newItem[date].push(item);
            }
         }
      }
      this.setState({ history: newItem });
   };

   renderItem = (item) => {
      return (
         <ItemHistory
            code={item.code}
            money={item.money}
            date={convertDate(item.date)}
            time={item.time}
            type={item.type}
            note={item.note}
         />
      );
   };
   render() {
      return (
         <View style={{ flex: 1 }}>
            <Header isShowMenu onPressMenu={() => this.props.navigation.openDrawer()} title="Lịch sử" />
            <Agenda
               items={Object.assign(this.state.items, this.state.history)}
               loadItemsForMonth={this.loadItems.bind(this)}
               selected={new Date()}
               renderItem={this.renderItem.bind(this)}
               renderEmptyDate={this.renderEmptyDate.bind(this)}
               rowHasChanged={this.rowHasChanged.bind(this)}
               futureScrollRange={1}
               displayLoadingIndicator={true}
               renderKnob={() => {
                  return <FontAwesome5 name="chevron-down" size={15} color={colors.gray} />;
               }}
            />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17,
   },
   emptyDate: {
      height: 15,
      flex: 1,
      paddingTop: 30,
   },
});
