/**
 * Created by Лев on 03.10.2018.
 */
import * as React from 'react';
import './AlertComponentCss.css';

export class AlertComponent extends React.Component{
  render(){
    return (
      <div id="alertComponent" className="isCorrectBlock">
        <br/><div className="alert">Alert</div><br/><br/>
        You have another events in that day<br/><br/>
        Is your request correct?<br/><br/>
        <button id="yesButton" style={{width: "100px"}}>Yes</button>
        <button id="noButton" style={{width: "100px"}}>No</button>
      </div>
    )
  }
}
