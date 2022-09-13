import TimeAgo from "../../../../components/TimeAgo";
import InfoDiv from "../../InfoDiv";
import { Props } from "../Biography";

const BiographyEs = ({ format, displayDecimal }: Props) => {
  const birth = new Date(2002, 1, 11, 0, 0, 0, 0);

  return (
    <div className="flex flex-col m-5">
      <InfoDiv>
        Mi nombre es Daniel Armenta, aunque online mi nombre es h8m0ss. Nací{" "}
        <span className="accent-text">
          <TimeAgo
            format={format}
            initialDate={birth}
            displayAgo
            shouldUpdate
            round={displayDecimal ? "none" : "down"}
          />
        </span>{" "}
        en México. Pero no fue hasta que tenía{" "}
        <span className="accent-text">
          <TimeAgo
            format={format}
            initialDate={birth}
            finalDate={new Date(2018, 1, 11, 0, 0, 0, 0)}
            round={displayDecimal ? "none" : "down"}
          />
        </span>
        , que empecé a pensar a que quería dedicarme, pero no sabía que
        estudiar. Lo único que tenía muy claro es que me fascinaban los video
        juegos. ¿Y si estudio para convertirme en un desarrollador de video
        juegos? Mi siguiente decisión fue no investigar absolutamente nada
        acerca de las herramientas usadas por la industria de desarrollo de
        video juegos. Compré el primer libro que vi de programación y empecé a
        aprender Python, el lenguaje de programación famoso por desarrollar
        video juegos (sarcasmo).
      </InfoDiv>
      <InfoDiv leftAlign>
        Desde el inicio, me sentí fascinado con la programación, aunque
        rápidamente me di cuenta de que Python no era el lenguaje ideal para lo
        que buscaba hacer, seguía apasionado: Aún recuerdo la sensación de estar
        en mi cuarto a las tres de la mañana muchas noches, feliz de lograr
        programar una simple calculadora o de imprimir mi nombre en la consola.
      </InfoDiv>
      <InfoDiv>
        <span className="accent-text">
          Hace{" "}
          <TimeAgo
            format={format}
            initialDate={new Date(2020, 3, 15, 0, 0, 0, 0)}
            shouldUpdate
            round={displayDecimal ? "none" : "down"}
          />
        </span>{" "}
        , manejaba ya, tres lenguajes de programación: Python, C# y Java. Este
        era mi último año de preparatoria, y me estaba preparando para empezar
        mis estudios como ‘ingeniero en animación y videojuegos’ (por mucho que
        el titulo no me guste), todo pintaba bien para el Daniel de{" "}
        <span className="accent-text">
          <TimeAgo
            format={format}
            initialDate={birth}
            finalDate={new Date(2020, 3, 15, 0, 0, 0, 0)}
            round={displayDecimal ? "none" : "closest"}
          />
        </span>
        , pero, como quizás sepas,{" "}
        <span className="accent-text">
          <TimeAgo
            format={format}
            initialDate={new Date(2020, 3, 15, 0, 0, 0, 0)}
            shouldUpdate
            displayAgo
            round={displayDecimal ? "none" : "closest"}
          />
        </span>{" "}
        había un pequeño problema relacionado con un virus alrededor del mundo,
        por lo cual tendría que permanecer en casa por quien sabe cuánto.
      </InfoDiv>
      <InfoDiv leftAlign>
        Las consecuencias no solo incluyeron que tuviera que cursar mi último
        semestre de preparatoria por Zoom, sino También implicaba la cancelación
        del evento de graduación y del viaje escolar de fin de año. Por si fuera
        poco, también tenía que empezar la Universidad en línea.
      </InfoDiv>
      <InfoDiv>
        Honestamente, no fue fácil. Empezar en una nueva escuela, sin conocer a
        nadie, sin ver a mis amigos de siempre, atrapado en casa Forzado a tomar
        clases a las cuales francamente no les podía prestar atención.
        Ciertamente, no fueron los años más fáciles
      </InfoDiv>
      <InfoDiv leftAlign>
        Sin embargo, no creo que la pandemia fue mala del todo. Si no hubiera
        pasado, nunca hubiera empezado a tomar terapia, lo cual creo que me ha
        hecho una persona más sana psicológicamente. Por el lado de la
        programación, tuve el tiempo de aprender tanto Flutter como JavaScript,
        que por una parte, Flutter se rápidamente se convirtió en mi framework
        favorito y no estaría leyendo esto si no por JavaScript. Además de
        estos, tuve tiempo de aprender C++, Excel, Photoshop, entre otros.
      </InfoDiv>
      <InfoDiv>
        Y con eso, pasaron{" "}
        <span className="accent-text">
          <TimeAgo
            format={format}
            initialDate={new Date(2020, 3, 15, 0, 0, 0, 0)}
            finalDate={new Date(2022, 2, 12, 0, 0, 0, 0)}
            round={displayDecimal ? "none" : "closest"}
          />
        </span>
        , es decir,{" "}
        <span className="accent-text">
          <TimeAgo
            format={format}
            initialDate={new Date(2022, 1, 1, 0, 0, 0, 0)}
            displayAgo
            shouldUpdate
            round={displayDecimal ? "none" : "closest"}
          />
        </span>
        . Si no estas llevando cuenta, ya tendría{" "}
        <span className="accent-text">
          <TimeAgo
            format={format}
            initialDate={birth}
            finalDate={new Date(2022, 1, 1, 0, 0, 0, 0)}
            round={displayDecimal ? "none" : "down"}
          />
        </span>
        . Decidí que había llegado la hora de tener un sitio web. Por lo que
        aprendí React y NextJs. Y desde{" "}
        <span className="accent-text">
          <TimeAgo
            format={format}
            initialDate={new Date(2022, 2, 12, 0, 0, 0, 0)}
            displayAgo
            shouldUpdate
            round={displayDecimal ? "none" : "down"}
          />
        </span>
        , afortunadamente el encierro termino y pude tomar clases presenciales
        por primera vez en{" "}
        <span className="accent-text">
          <TimeAgo
            format={format}
            initialDate={new Date(2020, 3, 15, 0, 0, 0, 0)}
            finalDate={new Date(2022, 2, 12, 0, 0, 0, 0)}
            round={displayDecimal ? "none" : "down"}
          />
        </span>
        .
      </InfoDiv>
      <InfoDiv leftAlign>
        Actualmente paso la mayor parte del tiempo en la escuela, he hecho
        nuevos amigos, aunque aún conservo los viejos, y desde que las clases
        presenciales empezaron, mi capacidad para aprender ha mejorado.
      </InfoDiv>
    </div>
  );
};

export default BiographyEs;
