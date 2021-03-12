import React from 'react';
import { Alert } from 'react-native';
import CodePush from 'react-native-code-push';
import DownloadView from '../component/custom/DownloadView';
import LoadingView from '../component/custom/LoadingView';

//auto check when open app
const CODE_PUSH_OPTIONS = {
   checkFrequency: CodePush.CheckFrequency.ON_APP_START,
};

const withCodePush = (WrappedComponent) => {
   class WrappedApp extends React.PureComponent {
      state = {
         loading: false,
      };
      componentDidMount() {
         CodePush.sync(
            {
               updateDialog: {
                  title: 'Thông báo cập nhật',
                  optionalIgnoreButtonLabel: 'Để sau',
                  optionalInstallButtonLabel: 'Cập nhật',
                  optionalUpdateMessage: 'Đã có bản cập nhật mới, bạn vui lòng cập nhật ứng dụng',
               },
               installMode: CodePush.InstallMode.IMMEDIATE,
            },
            (status) => {
               if (status === CodePush.SyncStatus.UPDATE_INSTALLED) {
                  this.setState({ loading: false });
                  setTimeout(() => {
                     Alert.alert('Thông báo', 'Cập nhật ứng dụng thành công');
                  }, 10);
               }
            },
            (progress) => {
               this.setState({
                  loading: true,
                  percent: Math.round((progress.receivedBytes / progress.totalBytes) * 100),
               });
            },
         );
      }

      render() {
         return (
            <>
               <DownloadView visible={this.state.loading} percent={`${String(this.state.percent)}%`} />
               <WrappedComponent />
            </>
         );
      }
   }
   return CodePush(CODE_PUSH_OPTIONS)(WrappedApp);
};
export default withCodePush;
