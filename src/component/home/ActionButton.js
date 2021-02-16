import { FAB, Portal, Provider } from 'react-native-paper';
import * as React from 'react';
import { colors } from '../../res/style/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AcitonButton = () => {
   const [state, setState] = React.useState({ open: false });

   const onStateChange = ({ open }) => setState({ open });

   const { open } = state;

   return (
      <FAB.Group
         open={open}
         icon={open ? 'close' : 'plus'}
         // theme={{ colors: { backdrop: 'transparent' } }}
         fabStyle={{ backgroundColor: colors.blue }}
         color={colors.white}
         actions={[
            {
               icon: (props) => <MaterialIcons {...props} name="credit-card" />,
               label: 'Ví tiền',
               onPress: () => console.log('Pressed star'),
            },
            {
               icon: (props) => <MaterialIcons {...props} name="money-off" />,
               label: 'Chi tiêu',
               onPress: () => console.log('Pressed star'),
            },
            {
               icon: (props) => <MaterialIcons {...props} name="attach-money" />,
               label: 'Thu nhập',
               onPress: () => console.log('Pressed notifications'),
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
