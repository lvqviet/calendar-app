import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { SafeAreaView } from 'react-native-safe-area-context'
import Appointment from '../components/Appointment'
import Event from '../components/Event'
import Colors from '../constants/Colors'

// const tempData = {
// 	'2021-12-16': {
// 		events: [
// 			{
// 				id: 1,
// 				type: 'event',
// 				title: 'Event',
// 				time_start: '9:00 AM',
// 				time_end: '9:30 AM',
// 				link: 'https://google.com',
// 			},
// 		],
// 	},
// 	'2021-12-17': {
// 		events: [
// 			{
// 				id: 2,
// 				type: 'event',
// 				title: 'Second Event',
// 				time_start: '9:00 AM',
// 				time_end: '9:30 AM',
// 				link: 'https://google.com',
// 			},
// 			{
// 				id: 3,
// 				type: 'appointment',
// 				title: 'Appointment with long title just for testing',
// 				time_start: '9:30 AM',
// 				time_end: '9:30 AM',
// 				photo_url:
// 					'https://znews-photo.zadn.vn/w360/Uploaded/mdf_fedrei/2020_05_20/nhan_vat_sach.jpg',
// 				profile_url: 'https://en.wikipedia.org/wiki/Hermione_Granger',
// 				link: 'https://google.com',
// 			},
// 		],
// 	},
// 	'2021-12-18': {
// 		events: [
// 			{
// 				id: 4,
// 				type: 'event',
// 				title: "Event with very longest title you've ever seen ☜(ﾟヮﾟ☜)",
// 				time_start: '9:00 AM',
// 				time_end: '9:30 AM',
// 				link: 'https://google.com',
// 			},
// 			{
// 				id: 5,
// 				type: 'appointment',
// 				title: 'First Appointment',
// 				time_start: '9:30 AM',
// 				time_end: '9:30 AM',
// 				photo_url:
// 					'https://znews-photo.zadn.vn/w360/Uploaded/mdf_fedrei/2020_05_20/nhan_vat_sach.jpg',
// 				profile_url: 'https://en.wikipedia.org/wiki/Hermione_Granger',
// 				link: 'https://google.com',
// 			},
// 			{
// 				id: 6,
// 				type: 'appointment',
// 				title: 'Second Appointment',
// 				time_start: '9:30 AM',
// 				time_end: '9:30 AM',
// 				photo_url:
// 					'https://znews-photo.zadn.vn/w360/Uploaded/mdf_fedrei/2020_05_20/nhan_vat_sach.jpg',
// 				profile_url: 'https://en.wikipedia.org/wiki/Hermione_Granger',
// 				link: 'https://google.com',
// 			},
// 			{
// 				id: 7,
// 				type: 'appointment',
// 				title: 'Third Appointment',
// 				time_start: '9:30 AM',
// 				time_end: '9:30 AM',
// 				photo_url:
// 					'https://znews-photo.zadn.vn/w360/Uploaded/mdf_fedrei/2020_05_20/nhan_vat_sach.jpg',
// 				profile_url: 'https://en.wikipedia.org/wiki/Hermione_Granger',
// 				link: 'https://google.com',
// 			},
// 		],
// 	},
// 	'2021-12-1': {},
// }

const tempData = {
	'2021-12-17': {
		events: [
			{
				id: number,
				type: 'event',
				title: string,
				time_start: datetime,
				time_end: datetime,
				link: string,
			},
			{
				id: number,
				type: 'appointment',
				title: string,
				time_start: datetime,
				time_end: datetime,
				photo_url: string,
				profile_url: string,
				link: string,
			},
		],
	},
	'2021-12-18': {},
}

const INITIAL_DATE = moment(new Date()).format('yyyy-MM-DD')

export default function ({ navigation, route }) {
	const data = route.params?.data

	let curDaySelected = ''

	if (data) {
		for (const date in data) {
			const tempDay = data[date]
			if (tempDay?.selected && tempDay.selected) {
				curDaySelected = date
			}
		}
	}

	const [calendarData, setCalendarData] = useState({})
	const [selectedDay, setSelectedDay] = useState(data ? curDaySelected : INITIAL_DATE)

	function onSelectedDay(day) {
		setCalendarData({
			...calendarData,
			[selectedDay]: { ...calendarData[selectedDay], selected: false },
			[day.dateString]: { ...calendarData[day.dateString], selected: true },
		})
		setSelectedDay(day.dateString)
	}

	function displayDay(momentDate) {
		let today = moment()
		let yesterday = moment().subtract(1, 'day')
		let tomorrow = moment().add(1, 'day')

		if (moment(momentDate).isSame(today, 'day')) return 'Today'
		else if (moment(momentDate).isSame(yesterday, 'day')) return 'Yesterday'
		else if (moment(momentDate).isSame(tomorrow, 'day')) return 'Tomorrow'
		else return momentDate.format('ddd')
	}

	function goToBigCalendar() {
		navigation.navigate('BigCalendar', { data: calendarData })
	}

	useEffect(() => {
		const tempCalendar = data ? { ...data } : { ...tempData }
		if (!data) {
			tempCalendar[selectedDay] = {
				...tempCalendar[selectedDay],
				selected: true, // select today
			}
		}

		// marked days have event
		for (const date in tempCalendar) {
			if (tempCalendar[date]?.events && tempCalendar[date].events.length) {
				tempCalendar[date].customStyles = {
					container: { backgroundColor: Colors.LightOrange },
				}
			}
		}
		setCalendarData(tempCalendar)
	}, [])

	return (
		<SafeAreaView style={styles.container}>
			<Calendar
				current={selectedDay}
				pagingEnabled={true}
				hideExtraDays={false}
				enableSwipeMonths={true}
				monthFormat={'MMM yyyy'}
				enableSwipeMonths={true}
				markingType={'custom'}
				markedDates={calendarData}
				onDayPress={onSelectedDay}
				theme={{
					calendarBackground: Colors.CalendarTile,
					backgroundColor: Colors.CalendarTile,
					selectedDayBackgroundColor: Colors.DarkBlue,
					textDayHeaderFontWeight: 'bold',
					monthTextColor: Colors.DarkBlue,
					dotColor: 'transparent',
				}}
			/>

			<View style={styles.bar} />
			<View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<View>
						<Text style={styles.title}>Upcoming Events</Text>
						<Text style={styles.today}>{`${displayDay(moment(selectedDay))}, ${moment(
							selectedDay
						).format('DD MMM')}`}</Text>
					</View>
					<TouchableOpacity onPress={goToBigCalendar}>
						<Text>Big Calendar</Text>
					</TouchableOpacity>
				</View>
				{calendarData[selectedDay]?.events ? (
					<FlatList
						style={{ height: '50%' }}
						data={calendarData[selectedDay].events}
						keyExtractor={item => item.id.toString()}
						renderItem={({ item }) => {
							if (item.type === 'event') return <Event item={item} />
							else return <Appointment item={item} />
						}}
					/>
				) : (
					<View style={{ height: '50%', justifyContent: 'center', alignItems: 'center' }}>
						<Text style={styles.nothing}>{`=￣ω￣=`}</Text>
						<Text style={styles.nothing}>Nothing</Text>
					</View>
				)}
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.CalendarTile,
		paddingHorizontal: 15,
		paddingBottom: 100,
	},
	bar: {
		width: '100%',
		borderWidth: 2,
		borderColor: 'lightgray',
		borderRadius: 20,
		alignSelf: 'center',
		marginVertical: 10,
	},
	title: {
		fontSize: 20,
		color: Colors.DarkBlue,
		fontWeight: 'bold',
	},
	today: {
		color: 'darkgray',
		fontSize: 16,
		fontWeight: 'bold',
		marginVertical: 10,
	},
	nothing: {
		fontSize: 30,
		color: '#cccccc',
	},
})
