import { NavBar } from 'src/components'
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
