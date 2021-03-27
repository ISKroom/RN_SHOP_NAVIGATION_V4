import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

import ShopNavigator from "./ShopNavigator";

const NavigationContainer = (props) => {
  // useRef → レンダリングしようとしているJSX要素に直接アクセスできる機能
  // ShopNavigatorコンポーネントのdispatchメソッドを使用したかったので useRef を使用(Auto Auth関係で使いたかった)
  const navRef = useRef();

  // Redux の State から token の有無を取得
  const isAuth = useSelector((state) => !!state.auth.token);

  // tokenが失効したら isAuth が更新されるので useEffect が発動
  // → AuthScreen に遷移する
  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuth]);

  return <ShopNavigator ref={navRef} />;
};

export default NavigationContainer;

// このラッパーは token が失効したら自動で AuthScreen に遷移する機能を実装するためのもの
