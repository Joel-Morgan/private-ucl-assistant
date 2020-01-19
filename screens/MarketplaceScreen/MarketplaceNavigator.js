import { createStackNavigator } from 'react-navigation-stack'

import MakeListingScreen from './MakeListingScreen'
import MarketplaceScreen from './MarketplaceScreen'

const MarketplaceNavigator = createStackNavigator(
  {
    MakeListing: {
      screen: MakeListingScreen,
    },
    Marketplace: {
      screen: MarketplaceScreen,
    },
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
