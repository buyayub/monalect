import {routes} from '@redwoodjs/router';

export const bcMain = 
	{
		selected: "Home",
		items: 
		[
			{
				title: "Home",
				value: routes.home(),
			},
			{
				title: "About",
				value: routes.about(),
			},
			{
				title: "Monalect",
				value: routes.monalect(),
			}
		]
}

export const bcMonalect =
	{
		selected: "Courses",
		items: 
		[
			{
				title: "Courses",
				value: routes.monalect(),
			},
		]
}
