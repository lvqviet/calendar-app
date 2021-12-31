import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constants/Colors'

export default function ({ navigation, route }) {
	const data = route.params.data
	let curDaySelected = ''

	for (const date in data) {
		const tempDay = data[date]
		if (tempDay?.selected && tempDay.selected) {
			curDaySelected = date
		}
	}

	const [calendarData, setCalendarData] = useState(data)
	const [selectedDay, setSelectedDay] = useState(curDaySelected)

	function onSelectedDay(day) {
		setCalendarData({
			...calendarData,
			[selectedDay]: { ...calendarData[selectedDay], selected: false },
			[day.dateString]: { ...calendarData[day.dateString], selected: true },
		})
		setSelectedDay(day.dateString)
	}

	function handleBackButtonClick() {
		navigation.replace('Calendar', { data: calendarData })
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<Calendar
					current={selectedDay}
					pagingEnabled={true}
					hideExtraDays={false}
					enableSwipeMonths={true}
					monthFormat={'MMM yyyy'}
					enableSwipeMonths={true}
					markingType={'custom'}
					markedDates={calendarData}
					hideArrows={true}
					renderHeader={date => {
						return (
							<View style={styles.header}>
								<TouchableOpacity onPress={handleBackButtonClick}>
									<Ionicons name='chevron-back' size={24} color='black' />
								</TouchableOpacity>
								<Text style={styles.title}>{moment(selectedDay).format('MMM YYYY')}</Text>
							</View>
						)
					}}
					theme={{
						calendarBackground: Colors.CalendarTile,
						backgroundColor: Colors.CalendarTile,
						selectedDayBackgroundColor: Colors.DarkBlue,
						textDayHeaderFontWeight: 'bold',
						monthTextColor: Colors.DarkBlue,
						dotColor: 'transparent',
					}}
					dayComponent={({ date, state }) => {
						return (
							<TouchableOpacity
								onPress={() => onSelectedDay(date)}
								style={[
									styles.day,
									selectedDay === date.dateString && styles.daySelected,
								]}
							>
								<Text
									style={[
										styles.customDay,
										{
											color:
												state === 'disabled'
													? '#cccccc'
													: selectedDay === date.dateString
													? '#fff'
													: state === 'today'
													? '#59dce9'
													: 'black',
										},
									]}
								>
									{date?.day}
								</Text>
								{calendarData[date.dateString]?.events &&
									calendarData[date.dateString].events.map((item, idx) => {
										if (idx > 3) return
										else if (idx === 3)
											return (
												<Text
													key={item.id}
													style={[
														styles.smallTitle,
														{
															alignSelf: 'flex-start',
															color: selectedDay === date.dateString ? '#fff' : 'black',
														},
													]}
												>{`${
													calendarData[date.dateString].events.length - 3
												} more`}</Text>
											)
										else if (item.type === 'event')
											return <Event key={item.id} item={item} />
										else return <Appointment key={item.id} item={item} />
									})}
							</TouchableOpacity>
						)
					}}
				/>
			</ScrollView>
		</SafeAreaView>
	)
}

const Appointment = ({ item }) => {
	return (
		<View style={styles.appointment}>
			<Text style={styles.smallTitle} numberOfLines={1}>
				{item.title}
			</Text>
		</View>
	)
}

const Event = ({ item }) => {
	return (
		<View style={styles.event}>
			<Text style={styles.smallTitle} numberOfLines={1}>
				{item.title}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.CalendarTile,
		paddingHorizontal: 15,
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
		marginLeft: 20,
	},
	today: {
		color: 'darkgray',
		fontSize: 16,
		fontWeight: 'bold',
		marginVertical: 10,
	},
	header: {
		flexDirection: 'row',
		alignSelf: 'flex-start',
		width: '100%',
		alignItems: 'center',
		marginBottom: 20,
	},
	day: {
		height: 100,
		width: 40,
		borderWidth: 1,
		borderColor: 'darkgray',
		borderRadius: 5,
		alignItems: 'center',
	},
	customDay: {
		fontSize: 16,
		marginBottom: 5,
	},
	daySelected: {
		backgroundColor: Colors.DarkBlue,
	},
	appointment: {
		backgroundColor: Colors.LightOrange,
		width: '99%',
		marginBottom: 2,
		paddingVertical: 1,
	},
	event: {
		backgroundColor: '#d3e6dc',
		width: '99%',
		marginBottom: 2,
		paddingVertical: 1,
	},
	smallTitle: {
		fontSize: 10,
	},
})
