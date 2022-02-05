import { useEffect, useState } from 'react';
import ButtonLink from '../components/ButtonLink';
import NavBar from '../components/NavBar';
import TextWriter from '../components/TextWriter';
import WithWillExit from '../components/WithWillExit';
import useLoading from '../hooks/useLoading';
import styles from '../styles/Home.module.css';

function Home({ willExit }) {

  let [showSocials, setShowSocials] = useState(false);
  const loaded = useLoading(50);

  return (
    <div className='overflow-clip w-screen h-screen'>
      <div className={`flex flex-col w-screen h-screen text-center transition-all duration-500 justify-evenly ${willExit ? 'ml-[100%]' : ''}`}>
        <h1 className={'text-5xl mt-32 flex-1 transition-all delay-200 duration-500 ' + (loaded ? '' : ' text-transparent ') + styles.fontQuicksand}>My name is Daniel Armenta</h1>
        <div className={styles.fontOutfit + ' flex-1 flex-grow'}>
          <TextWriter delay={40} onDone={() => setShowSocials(true)}>
            I am a software developer with skills in
            <span className='font-bold text-blue-500'> Flutter</span>
            ,
            <span className='font-bold text-red-500'> Python</span>
            ,
            <span className='font-bold text-purple-500'> C++</span>
            ,
            <span className='font-bold text-yellow-400'> Javascript </span>
            and
            <span className='font-bold text-green-500'> more</span>
            <br />
            Please take a look at my socials!
          </TextWriter>
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
      </div>
    </div>
  )
}

const willExit = () => WithWillExit(Home);
export default willExit;