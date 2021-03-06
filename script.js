$(function () {

  const myOption = $('#option');
  const myInput = $('input');
  const button = $('#send');
  const myResults = $('#results')

  console.log(myInput.val())
  $('#refresh').click(function () {
    location.reload();
  })

  let searchOption = '';
  let ApiUrl = 'https://swapi.co/api'
  myOption.change(function (e) {
    searchOption = this.value
    console.log(searchOption)
  })
  $('#input').keypress(function (e) {
    if (e.which === 13) {
      $('#send').click()
    }
  })


  button.click(function (e) {
    $('.wyniki').removeClass('active')

    const myValue = myInput.val();
    const ApiToSend = ApiUrl + '/' + searchOption + '/?search=' + myValue;
    console.log(ApiToSend)
    fetch(ApiToSend)
      .then(data => { return data.json() })
      .then((data) => {
        data.results
        console.log(data.results)



        const generateHtml = (text) => '<li>' + text + '</li>'

        const showResults = (searchOption, results) => {

          let html;

          myResults.empty()
          if (searchOption === 'Choose...') {
            alert("a category choose must You have!")
          } else if (searchOption === 'people') {
            html = data.results.map(result =>
              generateHtml('<b>Name : </b>' + result.name + '<b></br>Born : </b>' + result.birth_year + '</br> <b> Height: </b>' + result.height + 'cm</br> <b> Mass: </b>' + result.mass + ' kg'))

          } else if (searchOption === 'films') {
            html = data.results.map(result => generateHtml('<b> Title : </b>' + result.title + ' </br> <b> Plot  : </b>' + result.opening_crawl + ''))

          }
          if (data.results.length === 0) {
            alert('found nothing have I...')
            return
          }

          myResults.prepend(html)
          
        }
        showResults(searchOption, results)
        if (data.results.length < 1) {
          return
        }
        $('.wyniki').addClass('active');
        const wyniki= this.getBoundingClientRect()
        console.log(wyniki)

        setTimeout(function(){
          window.scrollTo(wyniki)
        } ,1000)
        

       
      })
      .catch(err => alert("a category choose must You have!"))




  })
})