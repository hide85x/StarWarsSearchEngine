const myOption= $('#option');
const myInput= $('input');
const button= $('#send');
const myResults= $('#results')

console.log(myInput.val())
$('#refresh').click(function(){
  location.reload();
})

let searchOption= '';
let ApiUrl='https://swapi.co/api'
myOption.change(function(e){
  searchOption= this.value
  console.log(searchOption)
})
$('#input').keypress(function(e){
  if (e.which===13){
    $('#send').click()
  }
})


button.click(function(e){

const myValue= myInput.val();

const ApiToSend= ApiUrl+'/'+searchOption+'/?search='+ myValue;
console.log(ApiToSend)

axios.get(ApiToSend)
.then(res=>res.data)
.then(data=>{ data.results
console.log(typeof data.results)

const generateHtml=(text)=> '<li>' + text + '</li>'
const showResult=(searchOption, results)=>{
let html;
if (searchOption==='films'){
  html= results.map(result=>generateHtml('</br><b> Title : </b>' + result.title +'</br>  <b> Plot  : </b>' + result.opening_crawl +'</br>'))
}else if (searchOption==='people') {
  html= results.map(result=> generateHtml('</br><b> Name : </b>' + result.name + '</br>'))
}
 console.log(html.join(''))
 return myResults.prepend(html.join(''))

}

  showResult( searchOption, data.results)
})
.catch(err=> alert(err + '\nChoose a category first!'))
})
