let form = document.getElementById('form1');
const address = document.getElementById("address");
const errorF = document.getElementById('error');
const locationF = document.getElementById('location');
const forecastF = document.getElementById('forecast');
const latitude = document.getElementById('latitude');
const longtitude = document.getElementById('longtitude');
const apiData = document.querySelector('.apiData');

form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    apiData.style.display = "block"
    WeatherFun();
    form.reset()
})


let WeatherFun = async()=>{
    try{
        const res = await fetch('http://localhost:3001/weather?address=' + address.value);
        const data = await res.json();
        console.log(data);
        if(data.error){
            errorF.innerText = data.error;
            locationF.innerText = "";
            forecastF.innerText = "";
            latitude.innerText = "";
            longtitude.innerText = ""
        }
        else{
            locationF.innerText = `Country: ${data.location}`;
            setTimeout(()=>{
                forecastF.innerText = `Temperature: ${data.forecast}`;
            }, 500)
            setTimeout(()=>{
                latitude.innerText = `latitude: ${data.latitude}`;
            }, 1000)
            setTimeout(()=>{
                longtitude.innerText = `longtitude: ${data.longtitude}`;
            }, 1500)
            errorF.innerText = ""
        }
    }
    catch(e){
        console.log(e)
    }
}
