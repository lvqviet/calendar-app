import React from 'react'
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors'

export default function ({ item }) {
	async function onPress() {
		const supported = await Linking.canOpenURL(item.link)

		if (supported) {
			await Linking.openURL(item.link)
		} else {
			alert(`Don't know how to open this URL: ${item.link}`)
		}
	}

	return (
		<Pressable onPress={onPress} style={styles.container}>
			<View style={styles.rightTag} />
			<View style={styles.info}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.date}>{`${item.time_start} - ${item.time_end}`}</Text>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#d3e6dc',
		borderRadius: 15,
		flexDirection: 'row',
		marginVertical: 5,
	},
	avatar: {
		borderRadius: 20,
		width: 40,
		height: 40,
	},
	rightTag: {
		backgroundColor: Colors.DarkBlue,
		position: 'absolute',
		left: 0,
		height: '100%',
		width: 10,
		borderTopLeftRadius: 15,
		borderBottomLeftRadius: 15,
	},
	info: {
		paddingLeft: 25,
		paddingRight: 20,
		paddingVertical: 20,
	},
	title: {
		fontSize: 16,
		color: Colors.DarkBlue,
		fontWeight: 'bold',
	},
	date: {
		marginVertical: 7,
	},
})
