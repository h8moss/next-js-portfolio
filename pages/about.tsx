import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";

import NavBar from "../components/NavBar";
import TimeAgo from "../components/TimeAgo";
import InfoDiv from "../domain/about/InfoDiv";
import style from "../domain/about/style.module.css";

const About = () => {
  const router = useRouter();

  const [nextRoute, setNextRoute] = useState(router.pathname);

  const shouldStay = nextRoute == router.pathname;

  const birth = new Date(2002, 1, 11, 0, 0, 0, 0);

  return (
    <>
      <NavBar onClick={(route) => setNextRoute(route)} />
      <AnimatePresence onExitComplete={() => router.push(nextRoute)}>
        {shouldStay && (
          <>
            <h1>Auto biography</h1>
            <div className={"flex flex-col " + style.aboutParagraph}>
              <InfoDiv>
                My name is Daniel Armenta, I also go by h8m0ss online, I was
                born{" "}
                <TimeAgo
                  initialDate={birth}
                  displayAgo
                  format="hours"
                  useDecimal
                  shouldUpdate
                />{" "}
                in Mexico. But it was only when I was{" "}
                <TimeAgo
                  initialDate={birth}
                  format="hours"
                  useDecimal
                  finalDate={new Date(2018, 1, 11, 0, 0, 0, 0)}
                />{" "}
                <span> old </span>, the time to think about university was
                quickly approaching, and I had no idea what I wanted to do when
                I grew up. I did know one thing tho, I loved video-games. Maybe
                I could become a game developer? and so, I decided to do
                absolutely no research into the tools used for game development.
                I picked up a book on programming at random and I started
                learning python, you know, the oh so famous game language for
                game development (sarcasm).
              </InfoDiv>
              <InfoDiv leftAlign>
                Anyway, I immediately fell in love with programming, I also
                quickly found out python couldn&apos;t really be used to make
                games, even if I did learn a fair bit of pygame, still, I
                didn&apos;t care, I was hooked! I still remember the feeling of
                being in my room at 3 in the morning giggling like an idiot
                because I managed to make a simple calculator program, or
                display a pixel on the screen, or print my name on the console.
                I fell in love with programming, day one.
              </InfoDiv>
              <InfoDiv>
                By the time I was{" "}
                <TimeAgo
                  initialDate={birth}
                  format="hours"
                  finalDate={new Date(2020, 1, 11, 0, 0, 0, 0)}
                />{" "}
                old, I had already 3 programming languages under my belt,
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
                NextJs, the lock-down finally came to an end and I stepped foot
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
