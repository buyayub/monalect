import NavBar from 'src/components/NavBar'
import { bcMain } from 'src/shared/breadcrumbs'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'



const HomePage = () => {
	bcMain.selected = "/"
  return (
    <>
      <MetaTags title="Home" description="Home page" />
    </>
  )
}

export default HomePage
