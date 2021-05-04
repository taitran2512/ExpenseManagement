import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PushNotification = require('react-native-push-notification');

const configPushNotification = () => {
    PushNotification.configure({
        onRegister: function (token) {
            saveDeviceTokenFirebase(token)
        },

        onNotification: async function (notification) {
            // if (notification.userInteraction) {
            //     if (notification.messageId) {
            //         const messageId = notification.messageId
            //         await handleOpenNotificationOnline(messageId)
            //     } else if (notification.data && notification.data.code) {
            //         if (notification.foreground) {
            //             await handleOpenNotificationOffline(notification.data.code)
            //         } else {
            //             await AsyncStorage.setItem("pushData", JSON.stringify(notification))
            //         }
            //     }
            // } else {
            // }
            notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
            // process the action
        },

        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function (err) {
        },

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,
    });
}

const saveDeviceTokenFirebase = (token) => {
    AsyncStorage.setItem('tokenFirebase', token.token);
}

const ShowNotification = (remoteMessage) => {
    const id = remoteMessage && remoteMessage.id ? remoteMessage.id : Math.floor(Math.random() * 1000) + 9;
    const title = remoteMessage.title
    const message = remoteMessage.message
    const bigPictureUrl = remoteMessage.bigPictureUrl
    const largeIconUrl = remoteMessage.largeIconUrl
    message && PushNotification.localNotification({
        id,
        foreground: true,
        userInteraction: false,
        invokeApp: true,
        title,
        message,
        bigPictureUrl,
        data: {
            code: remoteMessage.code ? remoteMessage.code : ''
        },
    })
}

const NotificationFCM = (remoteMessage) => {
    const title = remoteMessage.notification && remoteMessage.notification.title
    const message = remoteMessage.notification && remoteMessage.notification.body
    const id = remoteMessage.sentTime.toString().slice(4, 12) >> 0
    const messageId = remoteMessage && remoteMessage.data && remoteMessage.data.notificationId ? remoteMessage.data.notificationId : ''
    const bigPictureUrl = remoteMessage.notification && remoteMessage.notification.android && remoteMessage.notification.android.imageUrl
    const largeIconUrl = remoteMessage.notification && remoteMessage.notification.android && remoteMessage.notification.android.imageUrl
    message && PushNotification.localNotification({
        foreground: true,
        userInteraction: false,
        invokeApp: true,
        messageId,
        id,
        title,
        message,
        bigPictureUrl,
        click_action: 'OPEN_MAIN_ACTIVITY'
    })

}

//Mở notification local (code tham khảo tạm đóng)
const handleOpenNotificationOffline = async (code) => {
    // const currentUser = await Parse.User.currentAsync()
    // if (code === 'POINT') {
    //     if (currentUser === null || currentUser === undefined) {
    //         if (Actions.currentScene !== 'login')
    //             Actions.login()
    //     } else if (Actions.currentScene !== 'profile') {
    //         await AsyncStorage.setItem("pushData", "");
    //         Actions.profile({ tab: 1 })
    //     }
    // } else if (code === 'REMINDER_DEBT_REPAYMENT' && Actions.currentScene !== 'debAndBrokerFeeWelcome') {
    //     await AsyncStorage.setItem("pushData", "");
    //     Actions.debAndBrokerFeeWelcome()
    // } else if (code === 'REMINDER_MIGRATION_DECISION' && Actions.currentScene !== 'Living_Cost_Screen_0') {
    //     await AsyncStorage.setItem("pushData", "");
    //     Actions.Living_Cost_Screen_0()
    // } else if (code === 'REMINDER_BROKER_FEE_REPAYMENT' && Actions.currentScene !== 'Broker_Fee_Screen_0') {
    //     await AsyncStorage.setItem("pushData", "");
    //     Actions.Broker_Fee_Screen_0()
    // } else if (code === 'REMINDER_PHO_INDEX' && Actions.currentScene !== 'Pho_Index_Screen_0') {
    //     await AsyncStorage.setItem("pushData", "");
    //     Actions.Pho_Index_Screen_0()
    // } else if (code === 'QUIZ') {
    //     if (currentUser === null || currentUser === undefined) {
    //         if (Actions.currentScene !== 'login')
    //             Actions.login()
    //     } else if (Actions.currentScene !== 'knowledgeBase') {
    //         await AsyncStorage.setItem("pushData", "");
    //         Actions.knowledgeBase({setTab: 'Quiz'})
    //     }
    // }
}

//Mở notification nhận từ server (code tham khảo tạm đóng)
const handleOpenNotificationOnline = async (notificationId) => {
    // try {
    //     const user = await Parse.User.currentAsync()
    //     if (user === null || user === undefined) {
    //         if (Actions.currentScene !== 'login')
    //             Actions.login()
    //     } else {
    //         let newsDetail
    //         await AsyncStorage.setItem("pushData", "");
    //         let notificationClass = Parse.Object.extend("Notification");
    //         let notificationQuery = new Parse.Query(notificationClass);
    //         const notification = await notificationQuery.equalTo("objectId", notificationId).first();
    //         const code = notification.get('code') ? notification.get('code').toUpperCase() : ''
    //         const subCode = notification.get('subCode') ? notification.get('subCode').toUpperCase() : ''
    //         if (code === 'PAXU') {
    //             Actions.notification()
    //         } else if (code === 'SURVEY' || subCode === 'SURVEY') {
    //             Actions.question({ selectedTab: 3, clearMessageId: true })
    //         } else if (code === 'INSIGHTS' && subCode === 'ARTICLE') {
    //             let newClass = Parse.Object.extend("News");
    //             let newQuery = new Parse.Query(newClass);
    //             newQuery.equalTo("objectId", notification.get('data').articleId)
    //             newQuery.equalTo("publishStatus", 1)
    //             newsDetail = await newQuery.first();
    //             if (newsDetail)
    //                 Actions.newsDetail({ news: newsDetail })
    //         } else if (code === 'INSIGHTS' && subCode === 'VIDEO') {
    //             let newClass = Parse.Object.extend("News");
    //             let newQuery = new Parse.Query(newClass);
    //             newQuery.equalTo("objectId", notification.get('data').videoId)
    //             newQuery.equalTo("publishStatus", 1)
    //             newsDetail = await newQuery.first();
    //             if (newsDetail)
    //                 Actions.newsDetail({ video: newsDetail })
    //         } else if (code === 'CAMPAIGN') {
    //             let campaignClass = Parse.Object.extend("Campaign");
    //             let campaignQuery = new Parse.Query(campaignClass);
    //             campaignQuery.equalTo("objectId", notification.get('data').campaignId)
    //             campaignQuery.equalTo("publishStatus", 1)
    //             newsDetail = await campaignQuery.first();
    //             if (newsDetail)
    //                 Actions.newsDetail({ campaign: newsDetail.toJSON() })
    //         }
    //     }
    // } catch (e) { }
}

const NotificationScheduleEveryDay = (props) => {
    const { title, message, date } = props
    PushNotification.localNotificationSchedule({
        id: 0,
        message,
        date,
        repeatType: 'day',
    });
}

const NotificationScheduleRepeatTime = (props) => {
    const { id, title, message, date, repeatType, repeatTime, code } = props
    PushNotification.localNotificationSchedule({
        foreground: true,
        userInteraction: false,
        invokeApp: true,
        id,
        title,
        message,
        date,
        repeatType,
        repeatTime,
        data: {
            code,
        },
    });
}

const NotificationScheduleOneTime = (props) => {
    const { id, title, message, date, code } = props
    PushNotification.localNotificationSchedule({
        id: id ? id : -1,
        title,
        message,
        date,
        data: {
            code,
        },
    });
}

const createChannel = (channel) => {
    PushNotification.createChannel(
        {
            channelId: channel, // (required)
            channelName: channel, // (required)
            channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        }, (created) => {
        } // (optional) callback returns whether the channel was created, false means it already existed.
    );
}

const cancelAllLocalNotifications = () => {
    PushNotification.cancelAllLocalNotifications()
}

const getChannels = () => {
    PushNotification.getChannels(function (channel_ids) {
    });
}

const channelExists = (channel_id) => {
    PushNotification.channelExists(channel_id, function (exists) {
    });
}

const deleteChannel = (channel_id) => {
    PushNotification.deleteChannel(channel_id);
}

const cancelLocalNotifications = (id) => {
    PushNotification.cancelLocalNotifications({ id });
}

const services = {
    configPushNotification,
    ShowNotification,
    NotificationFCM,
    handleOpenNotificationOffline,
    handleOpenNotificationOnline,
    NotificationScheduleEveryDay,
    NotificationScheduleRepeatTime,
    NotificationScheduleOneTime,
    cancelAllLocalNotifications,
    createChannel,
    getChannels,
    channelExists,
    deleteChannel,
    cancelLocalNotifications
}

export default services;