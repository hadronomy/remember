import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useThemeColor } from "@/components/Themed";

export default function TabLayout() {
	const backgroundColor = useThemeColor("background");
	const tintColor = useThemeColor("accentColor");
	return (
		<Tabs
			screenOptions={{
				// Disable the static render of the header on web
				// to prevent a hydration error in React Navigation v6.
				headerShown: useClientOnlyValue(false, true),
				headerShadowVisible: false,
				headerStyle: {
					backgroundColor: backgroundColor,
				},
				tabBarStyle: {
					shadowColor: "transparent",
					borderColor: "transparent",
				},
				tabBarActiveTintColor: tintColor,
				tabBarActiveBackgroundColor: backgroundColor,
				tabBarInactiveBackgroundColor: backgroundColor,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					headerShown: false,
				}}
			/>
			<Tabs.Screen name="two" />
		</Tabs>
	);
}
