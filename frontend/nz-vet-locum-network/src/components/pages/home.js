import React from 'react'
import HomeBanner from '../sections/Home/HomeBanner'
import HomeAbout from '../sections/Home/HomeAbout'
import HomeSignUp from '../sections/Home/HomeSignUp'

export default function Home() {

  return (
    <div>
      <HomeBanner />
      <HomeAbout />
      <HomeSignUp />
    </div>
  )
}
