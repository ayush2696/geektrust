const filename = process.argv[2];
const fs= require('fs');

const countries={
    SPACE : 'GORILLA',
    LAND : 'PANDA',
    WATER : 'OCTOPUS',
    ICE : 'MAMMOTH',
    AIR : 'OWL',
    FIRE : 'DRAGON'
}
let line = [];
let data = [];
let supportCountries = ['SPACE'];
try{
    let fileContents=fs.readFileSync(filename,'utf-8');
    line = fileContents.split('\r\n');
}catch(e){
    console.log('Error:', e.stack);
}
for(var i=0;i<line.length;i++){
    let firstWhiteSpace = line[i].indexOf(' ');
    data.push([line[i].substring(0,firstWhiteSpace),line[i].substring(firstWhiteSpace+1,line[i].length)]);
}
let flag= true;
let numberOfSupportCountries = 0;
for(var i=0;i<data.length;i++){
    let country = data[i][0];
    let message = data[i][1];
    let symbol = countries[country];
    flag= true;
    for(var j=0;j<symbol.length;j++){
        let character = symbol.charAt(j);
        let characterAscii = character.charCodeAt(0)+symbol.length;
        if(characterAscii > 90)
            characterAscii = characterAscii - 26;
        let newCharacter = String.fromCharCode(characterAscii);
        let index = message.indexOf(newCharacter);
        if(index!=-1)
        {
            message=message.substring(0,index)+message.substring(index+1,message.length);
        }
        else
        {
            flag = false;
            break;
        }

    }
    if(flag==true){
        numberOfSupportCountries+=1;
        supportCountries.push(country);
    }
}
if(numberOfSupportCountries>=3){
  supportCountries.forEach(country=>{
      console.log(country);
  })
}
else{
    console.log('NONE');
}