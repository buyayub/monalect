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
			<Route path="/demo/login" page={LoginPage} name="login" />
			<Route path="/demo/signup" page={SignupPage} name="signup" />
			<Route path="/demo/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
			<Route path="/demo/reset-password" page={ResetPasswordPage} name="resetPassword" />
			<Set wrap={MainLayout}>
				<Route path="/demo/about" page={AboutPage} name="about" />
				<Route path="/demo/register" page={RegisterPage} name="register" />
				<Private unauthenticated="login">
					<Route path="/demo" page={MonalectPage} name="home" />
					<Route path="/demo/create" page={CreateCoursePage} name="createCourse" />
					<Route path="/demo/{courseId}" page={CourseHomePage} name="courseHome" />
					<Route path="/demo/{courseId}/study" page={CourseStudyPage} name="study" />
					<Route path="/demo/{courseId}/question" page={CourseQuestionPage} name="courseQuestion" />
					<Route path="/demo/{courseId}/test" page={TestPage} name="test" />
				</Private>
			</Set>
			<Route notfound page={NotFoundPage} />
		</Router>
	)
}

export default Routes
