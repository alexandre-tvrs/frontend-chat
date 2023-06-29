import React, {useEffect, useState} from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import Header from 'components/Headers/Header';
import { Button } from "reactstrap";

const clock = {
  icon: <FontAwesomeIcon icon={faClock} />,
  iconStyle: { background: 'rgb(33, 150, 243)', color: '#fff' },
};

const check = {
  icon: <FontAwesomeIcon icon={faCheck} />,
  iconStyle: { background: 'rgb(33, 150, 243)', color: '#fff' },
};

function Timeline() {
  const id_grupo = localStorage.getItem("id_grupo")
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    resultJson()
  }, [])

  const resultJson = async () => {
    const response = await fetch(`http://127.0.0.1:8000/groups/${id_grupo}/timeline/`)
    const list = await response.json()
    setTasks(list)
  }

  return (
    <>
      <Header />
      <VerticalTimeline>
        {tasks.map((t, i) => {
          const contentStyle = { background: 'rgb(144, 215, 255)' }
          const arrowStyle = { borderRight: '7px solid rgb(144, 215, 255)' }

          return (
            <VerticalTimelineElement
              key={i}
              className="vertical-timeline-element--work"
              contentStyle={contentStyle}
              contentArrowStyle={arrowStyle}
              date={t.dataEntrega}
              {...t.entregue == true? check : clock}
            >
              {t.titulo ? (
                <React.Fragment>
                  <h3 className="vertical-timeline-element-title">{t.titulo}</h3>
                  {t.descricao && <p>{t.descricao}</p>}
                </React.Fragment>
              ) : undefined}
              <br />
              {t.entregue == false? (
                <Button
                  color="info"
                  >
                  Entregar
                </Button>
              ) : undefined}
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </>
  );
}

export default Timeline;
