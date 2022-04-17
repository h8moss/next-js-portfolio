import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";

import NavBar from "../components/NavBar";
import InfoDiv from "../domain/about/InfoDiv";

const About = () => {
  const router = useRouter();

  const [nextRoute, setNextRoute] = useState(router.pathname);

  const shouldStay = nextRoute == router.pathname;

  return (
    <>
      <NavBar onClick={(route) => setNextRoute(route)} />
      <AnimatePresence onExitComplete={() => router.push(nextRoute)}>
        {shouldStay && (
          <>
            <h1>Auto biography</h1>
            <div className="flex flex-col">
              <InfoDiv>
                My name is Daniel Armenta, I am a 20 year old Mexican student.
                As a 16 year old, the time to think about university was quickly
                approaching, and I had no idea what I wanted to do when I grew
                up. I did know one thing tho, I loved video-games, and, with
                that in mind I figured I could try to learn how to make them
                from scratch. I had heard before of something called
                &quot;pygame&quot;, some sort of program that used the
                programming language python to create video-games, and so, doing
                no research whatsoever into what programming language are used
                to make video games or what kind of tool pygame was, I went
                ahead and got a book on programming in python.
                <br />
                <br />
                The specific book I picked is not important and to be honest I
                don&apos;t think it is worth recommending, so I won&apos;t.
              </InfoDiv>

              <InfoDiv leftAlign>
                Anyway, I immediatly fell in love with programming, I also
                quickly found out python shouldn&apos;t really be used to make
                games, but I didn&apos;t care... I was hooked! I still remember
                being in my room at 3 in the morning giggling like an idiot
                because I managed to make a simple calculator program, so I kept
                at it.
              </InfoDiv>

              <InfoDiv>
                By 2020, I had already 3 programming languages under my belt,
                python, C# and Java. It was my last year of high school and
                everything was looking up for the 18-year-old me, but, as you
                may or may not be aware, there was a slight virus going around
                on 2020, which meant we had to stay home for the time being.
              </InfoDiv>
              <InfoDiv leftAlign>
                This meant not only that I would have to take the end of my last
                high school year on zoom, the graduation event and school trip
                were canceled, I also had to start my first year at university
                through zoom.
              </InfoDiv>
              <InfoDiv>
                I&apos;ll be honest, it was hard for me. I went from having lots
                of friends I saw every day to suddently seeing no one, knowing
                no one on a school with classes I frankly didn&apos;t enjoy.
              </InfoDiv>
              <InfoDiv leftAlign>
                The only good thing that came out of that time was that I
                learned javascript and flutter, I ended up falling in love with
                flutter, and javascript would be useful later down the line when
                I learned react.
              </InfoDiv>
              <InfoDiv>
                And like they were nothing, two years passed. When 2022 started,
                I decided it was finally time to get my act together and create
                a website so I got down to it, started learning react and
                NextJs, the lockdown finally came to an end and I stepped foot
                on my university for the very first time.
              </InfoDiv>
              <InfoDiv leftAlign>
                Now I spend most of my days at school, I have made new friends
                while staying in touch with the old ones, I still don&apos;t
                love all of my classes but I have come to appreciate them, so
                all is well.
              </InfoDiv>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default About;
