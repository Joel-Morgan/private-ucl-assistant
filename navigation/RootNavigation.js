import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"

import FAQScreen from "../screens/FAQScreen"
import ListingDetailScreen from "../screens/ListingDetailScreen"
import LiveSeatingMapScreen from "../screens/LiveSeatingMapScreen"
import MarketplaceScreen from "../screens/MarketplaceScreen/MakeListingScreen"
import MakeListingScreen from "../screens/MarketplaceScreen/MakeListingScreen"
import OwnListingsScreen from "../screens/MarketplaceScreen/OwnListingsScreen"
import NotificationsScreen from "../screens/NotificationsScreen"
import PersonDetailScreen from "../screens/PersonDetailScreen"
import RoomDetailScreen from "../screens/RoomDetailScreen"
import SplashScreen from "../screens/SplashScreen"
import StudySpaceDetailScreen from "../screens/StudySpaceDetailScreen"
import TimetableDetailScreen from "../screens/TimetableDetailScreen"
import MainTabNavigator from "./MainTabNavigator"

const RootStackNavigator = createStackNavigator(
  {
    FAQ: {
      screen: FAQScreen,
    },
    ListingDetail: {
      screen: ListingDetailScreen,
    },
    LiveSeatingMap: {
      screen: LiveSeatingMapScreen,
    },
    Main: {
      navigationOptions: {
        header: null,
      },
      screen: MainTabNavigator,
    },
    MakeListing: {
      screen: MakeListingScreen,
    },
    Marketplace: {
      screen: MarketplaceScreen,
    },
    Notifications: {
      navigationOptions: {
        header: null,
      },
      screen: NotificationsScreen,
    },
    OwnListings: {
      screen: OwnListingsScreen,
    },
    PersonDetail: {
      screen: PersonDetailScreen,
    },
    RoomDetail: {
      screen: RoomDetailScreen,
    },
    Splash: {
      navigationOptions: {
        header: null,
      },
      screen: SplashScreen,
    },
    StudySpaceDetail: {
      screen: StudySpaceDetailScreen,
    },
    TimetableDetail: {
      screen: TimetableDetailScreen,
    },
  },
  {
    defaultNavigationOptions: () => ({
      headerTitleStyle: {
        fontFamily: `apercu`,
        fontWeight: `normal`,
      },
    }),
    initialRouteName: `Splash`,
  },
)

export default createAppContainer(RootStackNavigator)
