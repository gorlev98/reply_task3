/**
 * Created by Лев on 03.10.2018.
 */
import * as React from 'react';
import './AddEventWindowCss.css';
export class AddEventWindow extends React.Component{

  render(){
    return(
      <div id="addEventWindow" className="addEventWindow"><br/>Add Event
        <br/><br/>
        <input id="eventNameInput" className="eventInput" placeholder="Add event name"/>
        <br/><br/>
        <input id="eventDateInput" className="eventInput" placeholder="Add date. Ex: December 03 2018"/>
        <br/><br/>
        <input id="addEventCheckbox" type="checkbox"/>Is annual?
        <br/><br/>
        <button id="eventNameButton" className="addEventButton" onClick={ this.props.closeAddEventWindow}
        >Add Event</button>   <button id="eventAddCancel" className="addEventButton" onClick={ this.props.cancelAddEvent}
        >Cancel</button>
      </div>
    )
  }
}
