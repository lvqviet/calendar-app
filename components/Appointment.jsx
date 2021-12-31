import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '../constants/Colors'

export default function ({ item }) {
	async function onPressProfileUrl() {
		const supported = await Linking.canOpenURL(item.profile_url)

		if (supported) {
			await Linking.openURL(item.profile_url)
		} else {
			alert(`Don't know how to open this URL: ${item.profile_url}`)
		}
	}

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
				<View style={styles.profile}>
					<Image
						style={styles.avatar}
						source={{ uri: item.photo_url }}
						resizeMode='cover'
					/>
					<TouchableOpacity onPress={onPressProfileUrl}>
						<Text style={styles.link}>View Client Profile</Text>
					</TouchableOpacity>
				</View>
			</View>

			<TouchableOpacity style={styles.iconCamera}>
				<Feather name='video' size={28} color='#fff' />
			</TouchableOpacity>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.LightOrange,
		borderRadius: 15,
		flexDirection: 'row',
		marginVertical: 5,
	},
	avatar: {
		borderRadius: 20,
		width: 30,
		height: 30,
		marginRight: 10,
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
		width: '80%',
	},
	iconCamera: {
		padding: 10,
		borderRadius: 30,
		backgroundColor: Colors.DarkBlue,
		marginTop: 20,
		alignSelf: 'flex-start',
	},
	title: {
		fontSize: 16,
		color: Colors.DarkBlue,
		fontWeight: 'bold',
	},
	date: {
		marginVertical: 7,
	},
	profile: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	link: {
		color: Colors.LightBlue,
		textDecorationLine: 'underline',
	},
})
