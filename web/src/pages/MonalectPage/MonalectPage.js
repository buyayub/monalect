import NavBar from 'src/components/NavBar'
import Button from 'src/components/Button'
import { Link, routes } from '@redwoodjs/router'
import { bcMain} from 'src/shared/breadcrumbs'
import { MetaTags } from '@redwoodjs/web'

const MonalectPage = () => {
	bcMain.selected = "/monalect"

  return (
    <>
      <MetaTags title="Monalect" description="Monalect page" />
	<NavBar breadcrumbs={[bcMain]} />
	<div>
		<h2>Active</h2>
		<Link to={routes.createCourse()}> <Button> Create </Button></Link>
	</div>
    </>
  )
}

export default MonalectPage
