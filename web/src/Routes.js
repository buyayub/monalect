// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router'

const Routes = () => {
	return (
		<Router>
			<Route path="/about" page={AboutPage} name="about" />
			<Route path="/" page={HomePage} name="home" />
			<Route path="/register" page={RegisterPage} name="register" />
			<Route path="/admin/login" page={LoginPage} name="login" />
			<Route path="/admin/signup" page={SignupPage} name="signup" />
			<Route path="/admin/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
			<Route path="/admin/reset-password" page={ResetPasswordPage} name="resetPassword" />
			<Private unauthenticated="home">
				<Route path="/monalect" page={MonalectPage} name="monalect" />
				<Route path="/monalect/create" page={CreateCoursePage} name="createCourse" />
				<Route path="/monalect/{courseId}" page={CourseHomePage} name="courseHome" />
				<Route path="/monalect/{courseId}/study" page={CourseStudyPage} name="study" />
			</Private>
			<Route notfound page={NotFoundPage} />
		</Router>
	)
}

export default Routes
