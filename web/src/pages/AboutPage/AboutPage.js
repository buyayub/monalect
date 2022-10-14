import NavBar from 'src/components/NavBar'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const AboutPage = () => {
  return (
    <>
      <MetaTags title="About" description="About page" />
		<NavBar />
    </>
  )
}

export default AboutPage
