import { NavigatorScreenParams } from '@react-navigation/native';

//ROOT
export type AppNavigatorParamList = {
  Loading: undefined;
  AuthStack: NavigatorScreenParams<AuthStackParamList>,
  App: NavigatorScreenParams<AppStackParamList>;
};

//AUTH STACK
export type AuthStackParamList = {
  Auth: undefined;
  RegisterUser: undefined;
}

//APP STACK
export type AppStackParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  ShoppingCartStack: NavigatorScreenParams<ShoppingCartStackParamList>;
  Orders: NavigatorScreenParams<OrdersStackParamList>;
  MyAccount: NavigatorScreenParams<ProfileStackParamList>;
};

export type HomeStackParamList = {
  HomeTabSection: NavigatorScreenParams<HomeTabSectionParamList>,
  ProductDetail: {
    id: number,
  },
  EditProfile: {
    field: string,
    value: string,
  },
};

export type OrdersStackParamList = {
  OrdersList: undefined;
  OrderDetail: {
    id: number;
  };
}

export type ShoppingCartStackParamList = {
  ShoppingCart: undefined;
  ShippingAddress: undefined;
  PaymentMethod: undefined;
  OrderConfirmation: undefined;
  CheckoutSuccess: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined,
  EditProfile: {
    field: string,
    value: string | null,
  },
  ChangePassword: undefined,
};

//HOME TAB SECTION
export type HomeTabSectionParamList = {
  Tudo: undefined;
  Eletrônicos: undefined;
  Casa: undefined;
  Esporte: undefined;
  Música: undefined;
  Moda: undefined;
  Beleza: undefined;
}
