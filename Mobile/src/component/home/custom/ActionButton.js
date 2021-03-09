import { FAB, Portal, Provider } from 'react-native-paper';
import * as React from 'react';
import { colors, screenHeight } from '../../../res/style/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getStatusBarHeight } from '../../../res/function/StatusBarHeight';

const AcitonButton = (props) => {
   const [state, setState] = React.useState({ open: false });

   const onStateChange = ({ open }) => setState({ open });

   const { open } = state;

   return (
      <FAB.Group
         open={open}
         icon={open ? 'close' : 'plus'}
         fabStyle={{
            backgroundColor: colors.app,
            marginBottom: getStatusBarHeight(),
         }}
         color={colors.white}
         actions={[
            {
               icon: (props) => <MaterialIcons {...props} name="credit-card" />,
               label: 'Ví tiền',
               onPress: () => props.onPressAddWallet(),
               small: false,
            },
            {
               icon: (props) => <MaterialIcons {...props} name="attach-money" />,
               label: 'Thu nhập',
               onPress: () => props.onPressIncome(),
               small: false,
            },
            {
               icon: (props) => <MaterialIcons {...props} name="money-off" />,
               label: 'Chi tiêu',
               onPress: () => props.onPressExpense(),
               small: false,
            },
         ]}
         onStateChange={onStateChange}
         onPress={() => {
            if (open) {
               // do something if the speed dial is open
            }
         }}
      />
   );
};
export default AcitonButton;
AcitonButton.defaultProps = {
   onPressAddWallet: () => {},
   onPressExpense: () => {},
   onPressIncome: () => {},
};
