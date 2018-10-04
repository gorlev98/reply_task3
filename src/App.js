import * as React from 'react';
import './App.css';
import {Calendary} from './components/Calendary'
import {AddEventWindow} from './components/AddEventWindow'
import {AlertComponent} from './components/AlertComponent'
const SetMonthComponent = props => (
  <div className="setMonthComponent">
    <input id="month" style={{width:"99%", height:"15%"}} placeholder="Month, ex: December"/>
    <br/>
    <input id="year" style={{width:"99%", height:"15%"}} placeholder="Year, ex: 2005 (>70, иначе getDay()=-1)"/>
    <br/><br/>
    <button style={{width:"50%", height:"15%"}} onClick={() =>props.setMonth()}>Set Month</button>
  </div>
);
const ChangeMonthBlock = props =>(
  <div className="changeMonthBlock">
    <button className="changeLeft" onClick={props.changeLeft}>&lt;</button>
    <div className="monthInfo">{props.monthName + "  " + props.tempYear}</div>
    <button className="changeRight" onClick={props.changeRight}>&gt;</button>
    <button id="changeSize" className="changeSize" onClick={props.stateClicked}>Расширенный</button>
  </div>
);
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tempMonth:new Date().getMonth(),
      tempYear: new Date().getFullYear(),
      isCompact: false,
      events:[
        {
          name: "Event1",
          month: 9,
          day: 24,
          year: 2015,
          isAnnual: true
        },
        {
          name: "Event2",
          month: 9,
          day: 1,
          year: 2015,
          isAnnual: true
        },
        {
          name: "Event3",
          month: 9,
          day: 1,
          year: 2015,
          isAnnual: true
        },
        {
          name: "S_Event1",
          month: 9,
          day:24,
          year:2018,
          isAnnual:false
        },
        {
          name: "S_Event2",
          month:9,
          day: 18,
          year:2018,
          isAnnual:false
        }
      ],
    };
    this.changeLeft=this.changeLeft.bind(this);
    this.changeRight=this.changeRight.bind(this);
    this.setMonth=this.setMonth.bind(this);
    this.stateClicked=this.stateClicked.bind(this);
    this.openAddEventWindow=this.openAddEventWindow.bind(this);
    this.closeAddEventWindow=this.closeAddEventWindow.bind(this);
    this.cancelAddEvent=this.cancelAddEvent.bind(this);
  }
  stateClicked(){
    let button = document.getElementById("changeSize");
    if(this.state.isCompact){//если сейчас компактный
      button.innerText="Расширенный";
      this.setState({
        isCompact:false,
      })
    }
    else{
      button.innerText="Компактный";
      this.setState({
        isCompact:true,
      })
    }
  }
  openAddEventWindow(number){
    document.getElementById("addEventWindow").style.visibility="visible";
    document.getElementById("eventNameInput").value="";
    if(number !== -1) {
      document.getElementById("eventDateInput").value = monthNames[this.state.tempMonth] + " " +
        number + " " + this.state.tempYear;
    }
    else{
      document.getElementById("eventDateInput").value="";
    }
  }
  closeAddEventWindow(){
    function isCorrectData(){
      function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
      function isCorrectDate(parts){
        let monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30,31, 30, 31];
        monthNumber = monthNames.indexOf(parts[0]);
        if(monthNumber===-1){
          return false;
        }
        if(!isNumeric(parts[1]) || !(parts[1]>0) || !(parts[1]<=monthDays[monthNumber])){
          return false;
        }
        if(!isNumeric(parts[2]) || !(parts[2]>=0)){
          return false;
        }
        return monthNumber;//не самый лучший выход ((
      }
      let correct =true;
      let name = document.getElementById("eventNameInput").value;
      if(name=== ""){//нельзя создать событие без названия
        return false;
      }
      let string = document.getElementById("eventDateInput").value;
      let parts = string.split(' ');
      let monthNumber = isCorrectDate(parts);//инициализируется внутри isCorrectDate
      if(monthNumber)//если monthNumber != false, то он корректен
      {
        let isAnnual = false;
        if (document.getElementById("addEventCheckbox").checked) {
          isAnnual = true;
        }
        correct = {
          name: name,
          month: monthNumber,
          day: Number.parseInt(parts[1], 10),
          year: Number.parseInt(parts[2], 10),
          isAnnual: isAnnual
        }
        return correct;
      }
      else{
        return false;
      }
    }
    function isUserCorrect(obj){
      function goToStandartView() {
        //удаляем текущее название события из инпут
        document.getElementById("eventNameInput").value ="";
        //скрываем окно добавления события
        document.getElementById("addEventWindow").style.visibility="hidden";
        //убираем чек с чекбокса
        document.getElementById("addEventCheckbox").checked = false;
        //скрываем окно для подтверждения
        document.getElementById("alertComponent").style.visibility="hidden";
        //убираем onclick
        document.getElementById("yesButton").onclick=null;
        document.getElementById("noButton").onclick=null;
      }
      function addNewEvent(obj){
        goToStandartView();
        obj.state.events.push(newEvent);//если просто запушить - не работает, т.к. не вызывается setState
        obj.setState({
          events:obj.state.events
        });
      }
      function skipAddNewEvent(){
        goToStandartView();
      }
      //фильтрую по кускам, иначе очень громоздкая запись
      //эта фильтрация - определения, есть ли пересекающиеся даты
      let mass = obj.state.events.filter(event => ((event.day === newEvent.day)));
      mass = mass.filter(event => ((event.month=== newEvent.month)));
      if(newEvent.isAnnual){
        mass=mass.filter(event=>((event.isAnnual)||((!event.isAnnual)&&(newEvent.year<=event.year))));
      }
      else{
        mass=mass.filter(event=>(((event.isAnnual)&&(event.year<=newEvent.year))||((!event.isAnnual)&&(event.year===newEvent.year))));
      }
      if(mass.length>0){//открытие сокрытого окна проверки
        document.getElementById("alertComponent").style.visibility="visible";
        document.getElementById("yesButton").onclick=(()=>addNewEvent(obj));
        document.getElementById("noButton").onclick=(()=>skipAddNewEvent(obj));
      }
      else{
        addNewEvent(obj);
      }

    }
    let newEvent = isCorrectData();//newEvent нужен для следующей функции
    if(newEvent){
      isUserCorrect(this);
    }
  }
  cancelAddEvent(){
    document.getElementById("addEventWindow").style.visibility="hidden";
  }
  changeLeft(){
    if(this.state.tempMonth>0){
      this.setState({
        tempMonth:this.state.tempMonth-1
      });
    }
    else{
      this.setState({
        tempMonth:11,
        tempYear:this.state.tempYear-1
      });
    }
  }
  changeRight(){
    if(this.state.tempMonth<11){
      this.setState({
        tempMonth:this.state.tempMonth+1
      });
    }
    else{
      this.setState ({
        tempMonth:0,
        tempYear:this.state.tempYear+1,
      });
    }
  }
  setMonth(){
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    function getNumber(){
      var monthMass = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
      return monthMass.indexOf(monthName);
    }
    let monthName = document.getElementById("month").value;
    let year = document.getElementById("year").value;
    let monthId = getNumber();//в любом случае или 0-11 или не нашёл
    if(monthId!==-1&& isNumeric(year)){
      document.getElementById("month").value="";
      document.getElementById("year").value="";
      console.log("setMonth activated");
      this.setState({
        tempMonth:monthId,
        tempYear:Number.parseInt(year, 10),
      });
    }
    else{
      alert("Uncorrect data");
      document.getElementById("month").value="";
      document.getElementById("year").value="";
    }
  }
  render() {
    function getCalendaryConstructionInfo(obj){
      let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30,31, 30, 31];
      if (((obj.tempYear % 4 === 0) && (obj.tempYear % 100 !== 0)) || (obj.tempYear % 400 === 0))
        monthDays[1] = 29;
      let start = new Date(monthNames[obj.tempMonth]+" 1, "+obj.tempYear+" 01:00:00").getDay();//эта функция вернёт день недели
      //0 - воскресение, 1- понед. и т.д.
      //только после 70 года нашей эры - какое-то внутреннее ограничение
      return {
        dayNumber: monthDays[obj.tempMonth],
        monthName: monthNames[obj.tempMonth],
        monthNumber:obj.tempMonth,
        start: start
      }
    }
    function getMonthAnnualEvents(obj){
      return obj.events.filter(elem => (elem.isAnnual===true)&&(elem.month === obj.tempMonth)&&(elem.year<=obj.tempYear));
    }
    function getMonthSingleEvents(obj){
      return  obj.events.filter(elem => (elem.isAnnual === false)&&(elem.month === obj.tempMonth)&&(elem.year === obj.tempYear) );
    }
    let info = getCalendaryConstructionInfo(this.state);
    let annualEvents = getMonthAnnualEvents(this.state);
    let singleEvents = getMonthSingleEvents(this.state);

    return (
      <div id="mainBlock">
        <Calendary
          info = {info}
          isCompact={this.state.isCompact}
          annualEvents = {annualEvents}
          singleEvents = {singleEvents}
          openAddEventWindow = {this.openAddEventWindow}
        />
        <SetMonthComponent
          setMonth = {this.setMonth}
        />
        <ChangeMonthBlock
          changeLeft={this.changeLeft}
          changeRight={this.changeRight}
          monthName={info.monthName}
          tempYear={this.state.tempYear}
          stateClicked={this.stateClicked}
        />
        <AddEventWindow
          closeAddEventWindow={this.closeAddEventWindow}
          cancelAddEvent={this.cancelAddEvent}
        />
        <AlertComponent/>

        <button id="addEvent" className="addEvent" onClick={() => this.openAddEventWindow(-1)}>+</button>
      </div>
    );
  }
}

export default App;
