import React from 'react';
import {
   View,
   Text,
   ImageBackground,
   StyleSheet,
   TouchableNativeFeedback,
   TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import { formatMoney } from '../../res/function/Functions';
import Images from '../../res/image';
import { colors, screenWidth } from '../../res/style/theme';

const cardWidth = screenWidth * 0.6;

const ItemCard = (props) => {
   const textTitle = () => {
      switch (props.type) {
         case 'card':
            return 'Tiền trong thẻ';
         case 'wallet':
            return 'Tiền trong ví';
         default:
            return '';
      }
   };
   return (
      <ImageBackground
         source={Images.card}
         style={[styles.container, props.index > 0 ? { marginLeft: 16 } : null]}>
         <Text style={styles.title}>{textTitle()}</Text>
         <Text style={styles.money}>{formatMoney(props.money)}</Text>
         <TouchableOpacity
            onPress={() => props.onEdit()}
            style={{ position: 'absolute', right: 16, bottom: 16 }}>
            <FontAwesome5 name="edit" color={colors.white} size={20} />
         </TouchableOpacity>
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
   },
   money: {
      fontSize: 24,
      color: colors.white,
      marginTop: 8,
   },
});
