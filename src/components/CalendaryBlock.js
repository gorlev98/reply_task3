/**
 * Created by Лев on 03.10.2018.
 */
import * as React from 'react';
import {Event} from './Event'
export class CalendaryBlock extends React.Component{
  render(){
    const colorAnnual = "cyan";
    const colorSingle = "green";
    return(
      <div className="calendaryBlock" style={{top:this.props.block.positionX, left:this.props.block.positionY}}
      onClick={() => this.props.openAddEventWindow(this.props.block.number)}>
        {this.props.block.name} {this.props.block.number}
        <br/><br/>
        <Event
          id={this.props.block.number}
          events={this.props.annualEvents}
          color={colorAnnual}
        ></Event>
        <Event
          id={this.props.block.number}
          events={this.props.singleEvents}
          color={colorSingle}
        ></Event>
      </div>
    )
  }
}
