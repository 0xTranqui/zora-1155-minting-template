// @ts-nocheck
import concept_1 from "../../public/assets/concept_1.jpeg"
import concept_2 from "../../public/assets/concept_2.jpeg"
import concept_3 from "../../public/assets/concept_3.jpeg"
import PAPD_GRID from "../../public/assets/PAPD_Grid.jpeg"
import {descriptions} from "./Descriptions";
import Concept from "./Concept"
import {useState} from "react";

export default function ConceptDisplay() {

  const [currentConcept, setCurrentConcept] = useState(0);

  // create array of image srcs from imported ssets
  const images = [
    PAPD_GRID,
    concept_3,
    concept_2,
    concept_1
  ]

  const titles = [
    "Destructive Cycle",
    "Growth Hurts",
    "Over Thinking",
    "Blueprint"
  ]

  // create nested array of arrays of [imageSRC, description]
  const structureConcepts = () => {
    let tempArray = [];

    for (let i = 0; i < images.length; i++) {
      tempArray[i] = [images[i], titles[i], descriptions[i]]
    }

    return tempArray;
  }

  // return value of structureConcepts
  const concepts = structureConcepts();  

  const incrementConcept = () => {
    if (currentConcept == 3) {
      setCurrentConcept(0)
      return
    }
    setCurrentConcept(currentConcept + 1);
    return
  }

  const decrementConcept = () => {
    if (currentConcept == 0) {
      setCurrentConcept(3)
      return
    }
    setCurrentConcept(currentConcept - 1);
    return
  }  

  return (
    <section id="concepts" className='text-[18px] sm:text-[20px] grid grid-cols-1 gap-4 justify-center'>
        <div className="flex flex-row justify-self-center w-fit h-fit">
          <button
          onClick={()=>decrementConcept()}
          >
            <div
              style={{transform: 'rotate(180deg)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" fill="none" stroke="#ffefe4" strokeMiterlimit="10">
                  <line x1="6" y1="12" x2="17" y2="12" strokeLinecap="butt" stroke="#ffefe4"></line>
                  <polyline points=" 13,8 17,12 13,16 " stroke="#ffefe4"></polyline>
                  <circle cx="12" cy="12" r="11"></circle>
                </g>
              </svg>
            </div>
          </button>
          <div className="text-center text-[24px] w-[225px]">
          {concepts[currentConcept][1]}
          </div>
          <button
          onClick={()=>incrementConcept()}
          >
            <div
              style={{transform: 'rotate(0deg)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" fill="none" stroke="#ffefe4" strokeMiterlimit="10">
                  <line x1="6" y1="12" x2="17" y2="12" strokeLinecap="butt" stroke="#ffefe4"></line>
                  <polyline points=" 13,8 17,12 13,16 " stroke="#ffefe4"></polyline>
                  <circle cx="12" cy="12" r="11"></circle>
                </g>
              </svg>
            </div>
          </button>
        </div>
        <div className="flex flex-row sm:w-[50%] w-[95vw] h-fit justify-self-center">
          <Concept
            imageSRC={concepts[currentConcept][0]}
            description={concepts[currentConcept][2]}
            imagePosition={currentConcept}
          />
      </div>
    </section>
  )
}