import { createStackNavigator } from 'react-navigation-stack'

import MakeListingScreen from './MakeListingScreen'
import MarketplaceScreen from './MarketplaceScreen'
import OwnListingsScreen from './OwnListingsScreen'

const MarketplaceNavigator = createStackNavigator(
  {
    MakeListing: {
      screen: MakeListingScreen,
    },
    Marketplace: {
      screen: MarketplaceScreen,
    },
    OwnListings: {
      screen: OwnListingsScreen
    }
  },
  {
    defaultNavigationOptions: () => ({
      headerTitleStyle: {
        fontFamily: `apercu`,
        fontWeight: `normal`,
      },
    }),
    initialRouteName: `Marketplace`,
  },
)

export default MarketplaceNavigator
