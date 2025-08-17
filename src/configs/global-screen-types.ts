import {NavigationProp, ParamListBase, RouteProp} from '@react-navigation/native';
import { NavigationParamList } from '../routers/router-constants';

export type GlobalScreenTypes = {
  navigation: NavigationProp<NavigationParamList>;
  route?: RouteProp<NavigationParamList, keyof NavigationParamList>;
};

export type NavigationType = NavigationProp<ParamListBase>;
