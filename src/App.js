import './App.css';
import Header from './Components/Header';
import 'react-datepicker/dist/react-datepicker.css'
import React ,{useEffect, useState} from 'react'
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import yea20r from './Assests/yea20r.jpg';
import { BallTriangle } from  'react-loader-spinner'
import old from './Assests/old.jpg';
import y from './Assests/y.jpg';
import yea3r from './Assests/yea3r.jpg';
import year10 from './Assests/year10.jpg';
import mid from './Assests/mid.jpg';




function App() {
  const [bbirthDate, setBbirthDate] = useState(null);
  const [curruntDate,setCurrentDate]=useState(null);
  const [din, setDin] = useState('-');
  const [mahina,setMahina]=useState('-');
  const [saal, setSaal] = useState('-');
  const [loading ,setLoading]=useState(false)
  const months = [31,28,31,30,31,30,31,31,30,31,30,31];
  useEffect(()=>{
    setCurrentDate(new Date().toString());
    setLoading(true)
    setTimeout(() => {
      
      setLoading(false);
    }, 5000);
  },[]);

    function ageCalculate(){
        let today = new Date();
        let inputDate = new Date(bbirthDate);
        let birthMonth,birthDate,birthYear;
        let birthDetails = {
            date:inputDate.getDate(),
            month:inputDate.getMonth()+1,
            year:inputDate.getFullYear()
        }
        let currentYear = today.getFullYear();
        let currentMonth = today.getMonth()+1;
        let currentDate = today.getDate();

        leapChecker(currentYear);

        if(
            birthDetails.year > currentYear ||
            ( birthDetails.month > currentMonth && birthDetails.year === currentYear) || 
            (birthDetails.date > currentDate && birthDetails.month === currentMonth && birthDetails.year === currentYear)
        ){
            alert("Not Born Yet");
            displayResult("-","-","-");
            return;
        }

        birthYear = currentYear - birthDetails.year;

        if(currentMonth >= birthDetails.month){
            birthMonth = currentMonth - birthDetails.month;
        }
        else{
            birthYear--;
            birthMonth = 12 + currentMonth - birthDetails.month;
        }

        if(currentDate >= birthDetails.date){
            birthDate = currentDate - birthDetails.date;
        }
        else{
            birthMonth--;
            let days = months[currentMonth - 2];
            birthDate = days + currentDate - birthDetails.date;
            if(birthMonth < 0){
                birthMonth = 11;
                birthYear--;
            }
        }
        displayResult(birthDate,birthMonth,birthYear);
    }

    function displayResult(bDate,bMonth,bYear){
      setDin(bDate);
      setMahina(bMonth);
      setSaal(bYear)
    }

    function leapChecker(year){
        if(year % 4 === 0 || (year % 100 === 0 && year % 400 === 0)){
            months[1] = 29;
        }
        else{
            months[1] = 28;
        }
    }
  return (
    <div className="App">
      <Helmet >
        <title>Age Calculator</title>
        <meta name='description' content='Do You Know ! how old are you. here get you know exactly how old you' />
        <meta name='keywords' content='calculator,age calculator,umar gadna ,what is my age, umar kya hai, umar, calculator4u' />
      </Helmet>
       <Header curruntDate={curruntDate}/> 
       <div className='loooder'>
        {loading ===true&&<div className='spinner'><BallTriangle
                hcolor="#00BFFF" height={100} width={100}
                ariaLabel='loading'
              /></div>
        }
       </div>
      
      {loading===false &&<div className='container'>
      <marquee className="marque"  width="60%" direction="left">
        Calculate Your Age. And Get Know you Exactly How Old Are You
      </marquee>
      <div className="dateSelection">
        <div className='main-section'>
          <div className='row'>
              <div className='col'>
                <input className='datePickar' type="date" onChange={e => setBbirthDate(e.target.value)} required /> 
              </div>
              <div className='col'>
                <button className='calculateageBtn' onClick={ageCalculate} >CalculateAge</button>
              </div>
          </div>
        </div>
      </div>
            <div className='imges'>
              { saal>=0 && saal<=3  && <img src={yea3r} style={{height:'150px'}}  alt="logo" />}
              { saal>=4 && saal<=10  && <img src={year10} style={{height:'150px'}}  alt="logo" />}
              { saal>10 && saal<=20  && <img src={yea20r} style={{height:'150px'}}  alt="logo" />}
              { saal>=20 && saal<=30  && <img src={y} style={{height:'150px'}}  alt="logo" />}
              { saal>30 && saal<60  && <img src={mid} style={{height:'150px'}}  alt="logo" />}
              { saal>60  && <img src={old} style={{height:'150px'}}  alt="logo" />}
            </div>
      <div className='ageSelection'>
        <div className='ageResult'>
            <div className='row'>
                <div className='col'>
                  <div className='dd'>
                      {din}
                  </div>
                  <span>Day</span>
                </div>
                <div className='col'>
                <div className='dd'>
                     {mahina}
                  </div>
                  <span>Month</span>
                </div>
                <div className='col'>
                <div className='dd'>
                      {saal}
                  </div>
                  <span>Year</span>
                </div>
            </div>
          </div>  
      </div>
      </div>}
    </div>
  );
}

export default App;
