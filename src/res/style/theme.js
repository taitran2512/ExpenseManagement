import { Dimensions } from 'react-native';

const colors = {
   white: '#FFFFFF',
   white1: '#D9D9D9',
   white2: '#F5F5F5',
   black: '#333333',
   black1: '#262626',
   black2: '#595959',
   black_transparent: '#00000020',
   green: '#2EB553',
   blue: '#4D89FF',
   lightblue: '#F1F6FF',
   lightblue1: '#1890FF',
   red: '#F5222D',
   red1: '#E60A32',
   red2: '#F24B4B',
   gray: '#8C8C8C',
   gray1: '#BFBFBF',
   gray2: '#E6E7E9',
   gray3: '#E8E8E8',
   gray4: '#F5F5F5',
   gray5: '#BFBFBF',
   orange: '#FF8C29',
   orange1: '#FFF9F3',
   orange2: '#F06D1A',
};
///////////////////////////////////////////////
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export { colors, screenWidth, screenHeight };
