// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router'
import MainLayout from 'src/layouts/MainLayout'
import { Head } from '@redwoodjs/web'

const Routes = () => {
	return (
		<Router>
			<Route path="/admin/login" page={LoginPage} name="login" />
			<Route path="/admin/signup" page={SignupPage} name="signup" />
			<Route path="/admin/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
			<Route path="/admin/reset-password" page={ResetPasswordPage} name="resetPassword" />
			<Set wrap={MainLayout}>
				<Route path="/about" page={AboutPage} name="about" />
				<Route path="/register" page={RegisterPage} name="register" />
				<Private unauthenticated="login">
					<Route path="/" page={MonalectPage} name="home" />
					<Route path="/create" page={CreateCoursePage} name="createCourse" />
					<Route path="/{courseId}" page={CourseHomePage} name="courseHome" />
					<Route path="/{courseId}/study" page={CourseStudyPage} name="study" />
					<Route path="/{courseId}/question" page={CourseQuestionPage} name="courseQuestion" />
				</Private>
			</Set>
			<Route notfound page={NotFoundPage} />
		</Router>
	)
}

export default Routes
