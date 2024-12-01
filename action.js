
let select_box = document.querySelectorAll("#box");
let select_button=document.querySelector(".output button");
let select_amount=document.querySelector(".converter-box input");

let select_from=document.querySelector(".from #box");
let select_to=document.querySelector(".to #box");

let select_output=document.querySelector(".output p");

function onlyletter(input){

    var regex=/[^0-9]/g;
    input.value=input.value.replace(regex,"");
}

for (let select of select_box){

    for ( country_code in countryList){

        let element=document.createElement("option");
        element.value=country_code;
        element.innerText=country_code;

        select.append(element);

        if(country_code==="INR" && select.parentElement.parentElement.className=="from"){
            element.selected="selected";
        }
        if(country_code==="USD" && select.parentElement.parentElement.className=="to"){
            element.selected="selected";
        }
    }

    select.addEventListener("change", (evt)=>{
        changeFlag(evt.target);
    })
}

function changeFlag(element){
   let value=element.value;
   let src=`https://flagsapi.com/${countryList[value]}/flat/64.png`;

   let img=element.parentElement.parentElement.querySelector("img")
   img.src=src;  
}

select_button.addEventListener("click",async(evt)=>{

    evt.preventDefault();
    
    let amount=select_amount.value;

    if(amount<=0){
        select_amount.value=1;
        amount=1;
    }
    
    let from_country=select_from.value.toLowerCase();
    let to_country=select_to.value.toLowerCase()
   

    // Base API

    let base_api=`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-12-01/v1/currencies/${from_country}.json`;
    let response=await fetch(base_api);
    let data=await response.json();

    let data1=data[from_country];
    let data2=data1[to_country];

    let converted_amout=parseFloat(amount)*parseFloat(data2);
    let value1=select_from.value;
    let value2=select_to.value;


    select_output.innerText=`${amount} ${value1} = ${converted_amout} ${value2}`;
   
})



