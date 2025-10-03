import React from "react";
import { View, Pressable, Text } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import styles from "../styles/styles";
import TimerIcon from "../../assets/icons/timer.svg";
import ArrowIcon from "../../assets/icons/star.svg";
import SaveIcon from "../../assets/icons/heart.svg";

const Footer = () => {
  const navigation = useNavigation();

  const currentRoute = useNavigationState((state) => { // get current route reliably, was mismatching before
    return state.routes[state.index].name;
  });

  const options = [
    { name: 'routines', icon: TimerIcon, route: 'Routines', matchRoutes: ['Routines'] },
    { name: 'now & next', icon: ArrowIcon, route: 'Now/Next', matchRoutes: ['Now/Next']},
    { name: 'saved', icon: SaveIcon, route: 'AllBoardsScreen', matchRoutes: ['AllBoardsScreen'] },
  ];

  return (
    <View style={styles.footer}>
      {options.map((option) => {

        const isActive = option.matchRoutes.includes(currentRoute);
        const Icon = option.icon;

        return (
          <Pressable
            key={option.name}
            onPress={() => navigation.navigate(option.route)}
            style={styles.footerButton}
          >
            <Icon width={24} height={24} fill={isActive ? '#01a2ffff' : '#555'} />
            <Text style={[styles.footerLabel, isActive && styles.activeFooterLabel]}>
              {option.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default Footer;