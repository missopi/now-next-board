import React from "react";
import { View, Pressable, Text } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import HomeIcon from "../../assets/icons/home.svg";
import SaveIcon from "../../assets/icons/heart.svg";
import TrafficLightIcon from "../../assets/icons/traffic-light.svg";
import styles from "../styles/styles"

const Footer = () => {
  const navigation = useNavigation();

  const currentRoute = useNavigationState((state) => { // get current route reliably, was mismatching before
    return state.routes[state.index].name;
  });

  const options = [
    { name: 'home', icon: HomeIcon, route: 'Home', matchRoutes: ['Home'] },
    { name: 'saved', icon: SaveIcon, route: 'SavedScreen', matchRoutes: ['SavedScreen'] },
    { name: 'traffic light', icon: TrafficLightIcon, route: 'TrafficLights', matchRoutes: ['TrafficLights']},
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
            <Icon width={24} height={24} fill={isActive ? '#000' : '#999'} />
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