import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { AntDesign, Feather } from "@expo/vector-icons";

const TabBar = ({ state, descriptors, navigation }) => {
  const icons = {
    index: (props) => <AntDesign name="home" size={26} color="gray" {...props} />,
    profile: (props) => <AntDesign name="user" size={26} color="gray" {...props} />,
    create: (props) => <AntDesign name="pluscircleo" size={26} color="gray" {...props} />,
    explore: (props) => <Feather name="compass" size={26} color="gray" {...props} />
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            style={[
              styles.tabBarItem,
              isFocused && styles.activeTab, // Apply active tab style
            ]}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {icons[route.name]({
              color: isFocused ? "gray" : "black",
              size: isFocused ? 30 : 26,
            })}
            <Text style={{ color: isFocused ? "gray" : "gray", fontSize: isFocused ? 15 : 10 }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderCurve: "continuous",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 30,
    shadowOpacity: 0.1,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0, // Default for inactive tabs
  },
  activeTab: {
    marginTop: -30, // Shift the active tab slightly upwards
    backgroundColor: "#ffcccb",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopRightRadius: 20,
    borderCurve: "continuous",
    marginHorizontal: 4,
    paddingVertical: 8

  },

});
