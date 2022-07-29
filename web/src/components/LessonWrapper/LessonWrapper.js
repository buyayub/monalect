import MaterialSection from 'src/components/MaterialSection';
import MaterialSectionAdd from 'src/components/MaterialSectionAdd';

const LessonNode = ({
	index,
	title,
	handleDelete,
	sections=null,
	materials=null,
}) => {
  return (
    <div className="mn-c-lesson-node">
	    <MaterialSection 
			    key={index}
			    icon={`${index}`} 
			    title={title}
			    handleDelete={() => null}
			    sections={sections}
		    />
	    <div className="lesson-list">
		    { sections.map((section, i) => { 
			    let sectionTitle= "";
			    if (materials != null) {
				if (materials[section.materialId].type != "article") {
					if (materials[section.materialId].sections.length > 0) {
						sectionTitle = materials[section.materialId].sections[section.id].title
					}
				}
			    }
			return <MaterialSection
				key={index}
				title={sectionTitle}
			/>
		    })}
	    
	    </div>
    </div>
  )
}
const LessonWrapper = ({
	lessons=[],	
	materials,
}) => {
  return (
    <div className="mn-c-lessons">
	    {lessons.map((lesson, i) => {
		    return <LessonNode 
			    	key={i}
			    	index={i}
				title={lesson.title}	
			    	sections={lesson.sections}
			    	handleDelete={null}
			    	materials={materials}
		    />
	    })}
    </div>
  )
}

export default LessonWrapper
