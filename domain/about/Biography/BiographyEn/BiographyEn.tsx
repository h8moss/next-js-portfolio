import TimeAgo from "../../../../components/TimeAgo";
import InfoDiv from "../../InfoDiv";
import { Props } from "../Biography";

const BiographyEn = ({ format }: Props) => {
  const birth = new Date(2002, 1, 11, 0, 0, 0, 0);

  return (
    <div className="flex flex-col m-5">
      <InfoDiv>
        My name is Daniel Armenta, I also go by h8m0ss online, I was born{" "}
        <span className="accent-text">
          <TimeAgo
            initialDate={birth}
            displayAgo
            format={format}
            useDecimal
            shouldUpdate
          />{" "}
        </span>
        in Mexico. But it was only when I was{" "}
        <span className="accent-text">
          <TimeAgo
            initialDate={birth}
            format={format}
            useDecimal
            finalDate={new Date(2018, 1, 11, 0, 0, 0, 0)}
          />{" "}
          old
        </span>
        , the time to think about university was quickly approaching, and I had
        no idea what I wanted to do when I grew up. I did know one thing tho, I
        loved video-games. Maybe I could become a game developer? and so, I
        decided to do absolutely no research into the tools used for game
        development. I picked up a book on programming at random and I started
        learning python, you know, the oh so famous game language for game
        development (sarcasm).
      </InfoDiv>
      <InfoDiv leftAlign>
        Anyway, I immediately fell in love with programming, I also quickly
        found out python couldn&apos;t really be used to make games, even if I
        did learn a fair bit of pygame, a library to make games using python,
        still, I didn&apos;t care, I was hooked! I still remember the feeling of
        being in my room at 3 in the morning giggling like an idiot because I
        managed to make a simple calculator program, or display a pixel on the
        screen, or print my name on the console. I fell in love with
        programming, day one.
      </InfoDiv>
      <InfoDiv>
        Then,{" "}
        <span className="accent-text">
          <TimeAgo
            format={format}
            initialDate={new Date(2020, 2, 1, 0, 0, 0, 0)}
            displayAgo
            shouldUpdate
            useDecimal
          />
        </span>
        , I had already 3 programming languages under my belt, python, C# and
        Java. It was my last year of high school, and I was preparing to begin
        my studies to become an &apos;engineer in video-games and
        animation&apos;, as tacky as the title sounds, everything was looking up
        for the{" "}
        <span className="accent-text">
          <TimeAgo
            format={format}
            initialDate={birth}
            finalDate={new Date(2020, 2, 1, 0, 0, 0, 0)}
            useDecimal
          />{" "}
          old
        </span>{" "}
        me, but, as you may or may not be aware, there was a slight virus going
        around{" "}
        <span className="accent-text">
          <TimeAgo
            format={format}
            initialDate={new Date(2020, 2, 1, 0, 0, 0, 0)}
            displayAgo
            shouldUpdate
            useDecimal
          />
        </span>
        , which meant we had to stay home for who-knows how long.
      </InfoDiv>
      <InfoDiv leftAlign>
        This meant not only that I would have to take the end of my last high
        school year through zoom, but also that prom and the end-of-the-year
        school trip were both canceled until further notice (spoiler alert!
        There would be no further notice). So I graduated high-school on a zoom
        call and started my first year of university the same way.
      </InfoDiv>
      <InfoDiv>
        I&apos;ll be honest, it wasn&apos;t easy for me. Going to a new school
        where I knew no one, seeing none of my old friends, stuck home,
        listening to teachers talk about subjects I frankly didn&apos;t care to
        understand? Yeah, it wasn&apos;t the best.
      </InfoDiv>
      <InfoDiv leftAlign>
        However, I don&apos;t think the pandemic was all bad. If not for it I
        wouldn&apos;t have started taking therapy, I believe I am
        psychologically a more sufficient person thanks to the pandemic. On the
        development side, I also got the time to learn Flutter and JavaScript, I
        immediately fell in love with the former, and I would eventually build
        this website using the latter.
        <br />
        Among other minor things, I also got to learn C++ and excel, I got to
        strengthen my basic knowledge of networks and computer science and also
        learned a bit of piano.
      </InfoDiv>
      <InfoDiv>
        And just like that,{" "}
        <span className="accent-text">
          <TimeAgo
            format={format}
            initialDate={birth}
            finalDate={new Date(2004, 1, 11, 0, 0, 0, 0)}
          />{" "}
        </span>
        passed. That made me{" "}
        <span className="accent-text">
          <TimeAgo
            initialDate={birth}
            format={format}
            finalDate={new Date(2022, 1, 11, 0, 0, 0, 0)}
            useDecimal
          />{" "}
          old
        </span>
        . I decided it was finally time to get my act together and make my own
        website. So I started learning react and NextJs. And as of{" "}
        <span className="accent-text">
          <TimeAgo
            format={format}
            initialDate={new Date(2022, 2, 21, 0, 0, 0, 0)}
            displayAgo
            useDecimal
            shouldUpdate
          />
        </span>
        , the lock-down finally came to an end and I stepped foot on my
        university for the very first time.
      </InfoDiv>
      <InfoDiv leftAlign>
        Now I spend most of my days at school, I have made new friends while
        staying in touch with the old ones, I still don&apos;t love all of my
        classes but I have come to appreciate them, so all is well.
      </InfoDiv>
    </div>
  );
};

export default BiographyEn;
