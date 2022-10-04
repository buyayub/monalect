import { get, getMany } from 'idb-keyval'
import { useState, userEffect } from 'react'
import { useAuth } from '@redwoodjs/auth'

// primarily for the home page
/*

cards: [
	card {
		id (course)	
		title
		description
		notebookWords
		questionCount
		lessonCount
		mark
	}
]
	

 */

const getCourseWords = async (courseId) => {
	const key = `${courseId}-stats`

	// gets course stats and returns if it contains the words
	const stats = JSON.parse(sessionStorage.getItem(key))
	if (stats && stats.words) {
		return stats.words
	}

	// if there isn't, we have to create them from indexedDB
	const data = await get('notebookPage')
	if (data) {
		let words = 0
		for (const item of data) {
			words += item.words
		}

		// add it to session and local storage
		(async () => {
			if (stats) {
				sessionStorage.setItem(key, JSON.stringify({ ...stats, words: words }))
				localStorage.setItem(key, JSON.stringify({ ...stats, words: words }))
			} else {
				sessionStorage.setItem(key, JSON.stringify({ words: words }))
				localStorage.setItem(key, JSON.stringify({ words: words }))
			}
		})();

		return words
	}

	// if there isn't any notebookPages entry, we throw an exception for someone else to handle
	throw ReferenceError()
}

const getLessonCount = async(courseId) => {
	const key = `${courseId}-stats`
	const stats = JSON.parse(sessionStorage.getItem(key))
	if (stats && stats.lessons) {
		return stats.lessons
	}

	const data = await get('lesson')
	if (data) {
		let lessons = 0
		for (const item of data)
		{
			lessons += item.courseId == courseId
		}

		(async () => {
			if (stats) {
				sessionStorage.setItem(key, JSON.stringify({ ...stats, lessons: lessons}))
				localStorage.setItem(key, JSON.stringify({ ...stats, lessons: lessons}))
			} else {

				sessionStorage.setItem(key, JSON.stringify({ lessons: lessons}))
				localStorage.setItem(key, JSON.stringify({ lessons: lessons}))
				}
		})();

		return lessons
	}

	throw ReferenceError()
}

const getQuestionCount = async(courseId) => {
	const key = `${courseId}-stats`
	const stats = JSON.parse(sessionStorage.getItem(key))
	if (stats && stats.questions) {
		return stats.questions
	}

	const data = await get('question')
	if (data) {
		let questions = 0
		for (const item of data)
			questions += (item.courseId == courseId)

		(async () => {
			if (stats) {
				sessionStorage.setItem(key, JSON.stringify({ ...stats, questions: questions}))
				localStorage.setItem(key, JSON.stringify({ ...stats, questions: questions}))
			} else {

				sessionStorage.setItem(key, JSON.stringify({ questions: questions}))
				localStorage.setItem(key, JSON.stringify({ questions: questions}))
				}
		})();

		return questions
	}

	throw ReferenceError()
}

const getCourseMark = async(courseId) => {
	const key = `${courseId}-stats`
}


export const getCourseCards = async () => {
	const key = 'course-cards'
	// check sessionStorage
	const sessionCards = JSON.parse(sessionStorage.getItem(key))
	if (sessionCards) {
		return sessionCards
	}

	// check localStorage, and update sessionStorage
	const localCards = JSON.parse(localStorage.getItem(key))
	if (localCards) {
		sessionStorage.setItem('course-cards', JSON.stringify(localCards))
		return localCards
	}

	// create cards from indexedDB
	const courses = await get('course')
	if (courses) {
		let cards = []
		for (const course of courses) {
			const notebookWords = await getCourseWords(course.id)
			const lessonCount = await getLessonCount(course.id)
			const questionCount = await getQuestionCount(course.id)

			cards.push({
				id: course.id,
				title: course.title,
				description: course.description,
				notebookWords: notebookWords,
				questionCount: questionCount,
				lessonCount: lessonCount,
				mark: 0
			})
		}

		(async() => {
				sessionStorage.setItem(key, JSON.stringify(cards))
				localStorage.setItem(key, JSON.stringify(cards))
		})();

		return cards
	}
}

