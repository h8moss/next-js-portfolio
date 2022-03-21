import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

import NavBar from '../components/NavBar';
import ScreenDiv from '../components/ScreenDiv'
import { ButtonLink, i18n, MainTextWriter } from '../domain/index';
import useI18n from '../hooks/useI18n';
import style from '../styles/fonts.module.css';
function Home() {

  let router = useRouter();
  let [showSocials, setShowSocials] = useState(false);
  let [nextRoute, setNextRoute] = useState(router.pathname)
  let { title } = useI18n(i18n);

  let shouldStay = nextRoute === router.pathname;

  const motionVariants = {
    beforeActive: {
      color: 'rgba(0,0,0,0)'
    },
    active: {
      color: '#fff',
      marginLeft: '0px',
    },
    afterActive: {
      marginLeft: '-100vw',
    }
  }

  return (
    <>
      <Head><title>Daniel Armenta</title></Head>
      <NavBar
        onClick={(val) => setNextRoute(val)}
      />
      <AnimatePresence
        exitBeforeEnter
        onExitComplete={() => {
          router.push(nextRoute);
        }}
      >
        {shouldStay && <motion.div
          variants={motionVariants}
          initial='beforeActive'
          animate='active'
          exit='afterActive'
        >
          <ScreenDiv className='flex flex-col text-center'>
            <h1 className={`text-5xl mt-32 flex-1 transition-all delay-200 duration-500 ${style.fontQuicksand}`}>
              {title}
            </h1>
            <div className={`${style.fontOutfit} flex-1 flex-grow`}>
              <MainTextWriter onDone={() => setShowSocials(true)} />
              <div className="flex flex-row mx-auto justify-evenly" >
                <ButtonLink
                  active={showSocials}
                  alt='github profile'
                  bg='#fff'
                  image='/social_icons/github.png'
                  size={50}
                  link='https://github.com/h8moss'
                />
                <ButtonLink
                  active={showSocials}
                  alt='stack overflow profile'
                  bg='#fff'
                  image='/social_icons/so.png'
                  size={50}
                  link='https://stackoverflow.com/users/12638504/h8moss'
                  delay={500}
                />
                <ButtonLink
                  active={showSocials}
                  alt='dev.to profile'
                  bg='#000'
                  image='/social_icons/dev-to.png'
                  size={50}
                  link='https://dev.to/h8moss'
                  delay={1000}
                />
              </div>
            </div>
          </ScreenDiv>
        </motion.div>}
      </AnimatePresence>
    </>
  )
}

export default Home;