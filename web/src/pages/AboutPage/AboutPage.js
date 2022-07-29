import NavBar from 'src/components/NavBar'
import { bcMain } from 'src/shared/breadcrumbs'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const AboutPage = () => {
	bcMain.selected = "/about"
  return (
    <>
      <MetaTags title="About" description="About page" />
	<NavBar breadcrumbs={[bcMain]} />
    </>
  )
}

export default AboutPage
