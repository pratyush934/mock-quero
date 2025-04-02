import React from 'react'
import OnBoardingForm from './_components/OnBoardingForm'
import { industries } from '@/data/industries'

const Onboarding = () => {
  return (
    <main>
        <OnBoardingForm industries={industries}/>
    </main>
  )
}

export default Onboarding