/**
 * Created by Лев on 03.10.2018.
 */
import * as React from 'react';
import './EventCss.css'
export class Event extends React.Component{
  render(){
    const events = this.props.events;
    return(

      <React.Fragment>
        {
          events.map((event, idx)=>(
            <div className="eventView" style={{backgroundColor: this.props.color}}
                 key={this.props.id+this.props.color+idx}
            >
              {event.name}
            </div>
          ))
        }
      </React.Fragment>
    )
  }
}
