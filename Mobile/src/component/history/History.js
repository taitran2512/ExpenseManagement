import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { convertDate } from '../../res/function/Functions';
import { colors } from '../../res/style/theme';
import Header from '../custom/Header';
import LoadingView from '../custom/LoadingView';
import ItemHistory from '../home/custom/ItemHistory';
export default class History extends Component {
   constructor(props) {
      super(props);
      this.state = {
         items: {},
      };
   }
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
      this.setState({ items: newItem });
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

   renderEmptyDate = () => {
      return (
         <View style={styles.emptyDate}>
            <Text>This is empty date!</Text>
         </View>
      );
   };

   rowHasChanged = (r1, r2) => {
      return r1.name !== r2.name;
   };

   timeToString = (time = '') => {
      // const date = new Date(time);
      return time.split('T')[0];
   };

   render() {
      return (
         <View style={{ flex: 1 }}>
            <Header isShowMenu onPressMenu={() => this.props.navigation.openDrawer()} title="Lịch sử" />
            <Agenda
               items={this.state.items}
               // loadItemsForMonth={this.loadItems}
               selected={new Date()}
               renderItem={this.renderItem}
               renderEmptyDate={this.renderEmptyDate}
               rowHasChanged={this.rowHasChanged}
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
