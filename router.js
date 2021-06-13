const router = require('express').Router();
const axios = require('axios');
router.get('/',(req,res)=>{
    var date = new Date();
    var targetDate = String(date.getFullYear()) + '-' + String(date.getMonth()).padStart(2,'0')+'-'+ String(date.getDate()).padStart(2,'0'); //from 1 month
    const params = {
        q : 'created:>'+targetDate,
        sort: 'stars',
        order: 'desc'
    }
    var counter=0;
    axios.get('https://api.github.com/search/repositories',{params}).then((response)=>{
        var repos = response.data.items;
        var top =[];
        repos.forEach(element => {
            if(element.language !==null && counter<=100){
            var exist = false;
            top.forEach(language=>{
                if (Object.keys(language)[0]=== element.language){
                    exist = true;
                    language[element.language].reposCount++;
                    language[element.language].repos.push(element.id);
                    counter++;
                }
            });
            if (!exist){
                var language = {};
                language[element.language]={
                    reposCount: 1,
                    repos:[element.id]
                }
                top.push(language);
            }
        }
        });
        top.sort((a,b)=> {
            return (a[Object.keys(a)[0]].reposCount < b[Object.keys(b)[0]].reposCount) ? 1 : -1
        });
        res.status(200).json({counter: counter,top: top});

    });
});

module.exports = router;