import NavBar from 'src/components/NavBar'
import Button from 'src/components/Button'
import MaterialWrapper from 'src/components/MaterialWrapper'
import LessonWrapper from 'src/components/LessonWrapper'
import LearningMaterialForm from 'src/components/LearningMaterialForm'
import SectionForm from 'src/components/SectionForm'
import Modal from 'src/components/Modal'

import { bcMain } from 'src/shared/breadcrumbs'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useState } from 'react';

const mockMaterials = [	
	{
		type: "textbook",
		title: "Proof of Mathematics",
		isbn: "9780989472128",
		author: "Richard Hammack",
		pages: 315,
		offset: 12,
		sections: [
			{
				title: "Introduction",
				lesson: null,
				start: 1,
				end: 16
			},
			{
				title: "Set Theory",
				lesson: null,
				start: 42,
				end: 62 
			}
		]
	},
	{
		type: "article",
		title: "Summation",
		doi: "https://doi.org/10.1016/S0747-7171(85)80038-9",
		author: "Anonymous",
		offset: 0,
		pages: 14
	}
]

const mockLessons = [
	{
		title: "Intro to Mathematical Logic",
		sections : [
			{
				materialId: 0,
				id: 0,
			}
		]
	},
	{
		title: "Set Theory",
		sections : []
	}
]


const CreateCoursePage = () => {
	const [page, setPage] = useState(0);
	const [title, setTitle] = useState("");
	const [materials, setMaterial] = useState(mockMaterials);
	const [lessons, setLessons] = useState(mockLessons);
	const [showMaterialForm, setMaterialForm] = useState(false);
	const [showSectionForm, setSectionForm] = useState(false);
	const [sectionRoot, setRoot] = useState(0);

	const materialDelete = (id) => {
		setMaterial(materials.filter((element, index) => index != id));
	}

	const sectionDelete = (materialId, id) => {
		let materialsCopy = materials;
		materialsCopy[materialId].sections = materialsCopy[materialId].sections.filter((element, index) => index != id);

		// recreate the array so react knows to re-render
		setMaterial([...materialsCopy]);
	}

	const addMaterial = (material) => {
		setMaterial([...materials, material]);
	}

	const addSection = (section, materialId) => {
		let materialsCopy = materials;
		materialsCopy[materialId].sections.push(section);
		setMaterial([...materialsCopy]);
	}


  return (
    <>
      <MetaTags title="CreateCourse" description="CreateCourse page" />
	<NavBar breadcrumbs={[bcMain]} />
	    <div class="mn-c-page">
		    <MaterialWrapper 
			materials={materials} 
			showForm={() => setMaterialForm(true)} 
			showSection={() => setSectionForm(true)}
			materialDelete={materialDelete} 
			sectionDelete={sectionDelete}
			setRoot={setRoot}
		    />
		    <LessonWrapper
			lessons={lessons}
			materials={materials}
		    />
	    </div>
	    <Modal show={showMaterialForm} changeState={() => setMaterialForm(false)}>
		    <LearningMaterialForm 
		    	cancel={() => {setMaterialForm(false)}} 
			addMaterial={addMaterial}
		    />
	    </Modal>
	    <Modal show={showSectionForm} changeState={()=> setSectionForm(false)}>
		    <SectionForm 
		    	cancel={()=> setSectionForm(false)}
			addSection={addSection}
			sectionRoot={sectionRoot}
		    />
	</Modal>
    </>
  )
}

export default CreateCoursePage
