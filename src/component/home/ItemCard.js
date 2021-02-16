import React, { useRef, useState } from 'react';
import {
   View,
   Text,
   ImageBackground,
   StyleSheet,
   TouchableOpacity,
   TouchableNativeFeedback,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import { formatMoney } from '../../res/function/Functions';
import Images from '../../res/image';
import { colors, screenWidth } from '../../res/style/theme';
import Modals from '../custom/Modals';
import TextInputAnimated from '../custom/TextInputAnimated';

const cardWidth = screenWidth * 0.6;

const ItemCard = (props) => {
   const modalRef = useRef();
   const [cardName, setCardName] = useState(props.title);
   const [money, setMoney] = useState(String(props.money));
   const onCancelEdit = () => {
      setCardName(props.title);
      setMoney(String(props.money));
      modalRef.current.close();
   };
   return (
      <ImageBackground
         source={Images.card}
         style={[styles.container, props.index > 0 ? { marginLeft: 16 } : null]}>
         <Text numberOfLines={2} style={styles.title}>
            {props.title}
         </Text>
         <Text style={styles.money}>{formatMoney(props.money)}</Text>
         <TouchableOpacity
            onPress={() => modalRef.current.open()}
            style={{ position: 'absolute', right: 16, bottom: 16 }}>
            <FontAwesome5 name="edit" color={colors.white} size={20} />
         </TouchableOpacity>
         <Modals ref={modalRef}>
            <View style={styles.edit}>
               <Text style={styles.titleEdit}>Thay đổi thông tin ví tiền</Text>
               <TextInputAnimated
                  style={styles.input}
                  label="Tên ví"
                  value={cardName}
                  onChangeText={(text) => setCardName(text)}
                  onPressClear={() => setCardName('')}
               />
               <TextInputAnimated
                  keyboardType="number-pad"
                  style={styles.input}
                  label="Số tiền"
                  value={money}
                  onChangeText={(text) => setMoney(text)}
                  onPressClear={() => setMoney('')}
               />
               <View style={styles.viewBtn}>
                  {/* //cancel edit */}
                  <TouchableNativeFeedback onPress={onCancelEdit}>
                     <View style={[styles.btn, { backgroundColor: colors.red2 }]}>
                        <Text style={styles.txtBtn}>Hủy</Text>
                     </View>
                  </TouchableNativeFeedback>
                  {/* //ok edit */}
                  <TouchableNativeFeedback
                     onPress={() => {
                        props.onEdit(cardName, money);
                        modalRef.current.close();
                     }}>
                     <View style={styles.btn}>
                        <Text style={styles.txtBtn}>Sửa</Text>
                     </View>
                  </TouchableNativeFeedback>
               </View>
            </View>
         </Modals>
      </ImageBackground>
   );
};

export default ItemCard;
ItemCard.defaultProps = {
   onEdit: () => {},
};

const styles = StyleSheet.create({
   container: {
      width: cardWidth,
      height: cardWidth * 0.585,
      padding: 16,
   },
   title: {
      fontSize: 14,
      color: colors.white,
      opacity: 0.7,
      width: '80%',
   },
   money: {
      fontSize: 24,
      color: colors.white,
      marginTop: 8,
   },
   edit: {
      backgroundColor: colors.white,
      width: '80%',
      borderRadius: 10,
      paddingVertical: 24,
   },
   titleEdit: {
      fontSize: 20,
      textAlign: 'center',
      color: colors.black,
      fontWeight: 'bold',
   },
   input: {
      marginTop: 20,
   },
   viewBtn: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 20,
   },
   btn: {
      backgroundColor: colors.green,
      borderRadius: 8,
      padding: 12,
      width: '40%',
   },
   txtBtn: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.white,
      textAlign: 'center',
   },
});
