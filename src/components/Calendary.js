/**
 * Created by Лев on 01.10.2018.
 */
import * as React from 'react';
import './CalendaryCss.css'
import {CalendaryBlock} from './CalendaryBlock'

const SmallBlock = props => (
  <div className="smallBlock" style={{top:props.block.positionX, left:props.block.positionY}}
  onClick={() => props.openAddEventWindow(props.block.number)}>
    {props.block.number} {props.block.name}
    <br/>
    {"Ev:"} {props.block.eventNumber}
  </div>
);

export class Calendary extends React.Component{
  render(){
    function eventsNumber(events){
      let numberMass =[];
      for(let i=1; i<=dayNumber; i++){
        numberMass[i]=0;
        for(let j=0; j<events.length; j++){
          if(events[j].day === i){
            numberMass[i]++;
          }
        }
      }
      return numberMass;
    }
    function createFilteredEventMasses(events){
      let result = [];
      for(let i=1; i<=dayNumber; i++){
        result[i]=events.filter(event => event.day === i);
      }
      return result;
    }
    let blockMass =[];
    let dayNumber = this.props.info.dayNumber;
    let startDay = this.props.info.start;
    let isEmpty=true;
    let dayNames;
    if(this.props.isCompact){
      dayNames= ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    }
    else{
      dayNames= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    }

    let annualEventsNumberMass = eventsNumber(this.props.annualEvents);
    let singleEventsNumberMass =  eventsNumber(this.props.singleEvents);
    let annualEventsMasses = createFilteredEventMasses(this.props.annualEvents);
    let singleEventsMasses = createFilteredEventMasses(this.props.singleEvents);
    for(let i=0; i<dayNumber+startDay; i++){
      if(i === startDay){
        isEmpty=false;
      }
      let positionY;
      let positionX;
      if(this.props.isCompact){
        positionY=i%7 * 60 +"px";
        positionX=Math.floor(i/7)*60+"px";
      }
      else{
        positionY=i%7 * 150 +"px";
        positionX=Math.floor(i/7)*150+"px";
      }
      blockMass[i]={
        key:i,
        isEmpty:isEmpty,
        number: i-startDay+1,
        positionX:positionX,
        positionY:positionY,
        name:dayNames[i%7]
      }
      if(!isEmpty){
        blockMass[i].eventNumber = annualEventsNumberMass[i-startDay+1] + singleEventsNumberMass[i-startDay+1];
        //для i ставим объекты i-startDay+1, т.к. после из blockMass будут удалены пустые объекты (у которых isEmpty = true)
      }
    }
    blockMass=blockMass.filter(block => block.isEmpty === false);

    if(this.props.isCompact){
      return (
        <React.Fragment>
          {blockMass.map((block, idx) => (
            <SmallBlock
              key={block.key}
              number={block.number}
              block={block}
              openAddEventWindow = {this.props.openAddEventWindow}
            >

            </SmallBlock>
          ))}
        </React.Fragment>
      )
    }
    else {
      return (
        <React.Fragment>
          {blockMass.map((block, idx) => (
            <CalendaryBlock
              key={block.key}
              isEmpty={block.isEmpty}
              number={block.number}
              block={block}
              annualEvents={annualEventsMasses[block.number]}
              singleEvents={singleEventsMasses[block.number]}
              openAddEventWindow = {this.props.openAddEventWindow}
            >
            </CalendaryBlock>
          ))}
        </React.Fragment>
      )
    }
  }
}
