import React from 'react'
import OnBoardingForm from './_components/OnBoardingForm'
import { industries } from '@/data/industries'

const Onboarding = () => {
  return (
    <main>
        <h1>Hello I am James Bond</h1>
        <OnBoardingForm industries={industries}/>
    </main>
  )
}

export default Onboarding