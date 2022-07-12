//ogabriell
export default function handler(req, res) {

    let param = req.query
    
    var url = `https://api.github.com/users/${param.name}`

    const chooseUrl = {
        repos: `https://api.github.com/users/${param.name}/repos`,
        commits: `https://api.github.com/repos/${param.name}`,
    }

    let resp = {
        name: param.name,
    }


    param.repos = typeof param.repos !== 'undefined' ? param.repos : 'true'
    param.stars = typeof param.stars !== 'undefined' ? param.stars : 'true'
    param.commits = typeof param.commits !== 'undefined' ? param.commits : 'true'
    const iJson = require('./icons.json')

    const getTrue = async () =>{
        await res.setHeader("Content-Type", "image/svg+xml");
        const data = await getData(chooseUrl.repos)
        const name = Object.getOwnPropertyNames(param)
        const value = Object.values(param)
        
        for(let i = 0; i < name.length; i++){
            if(value[i] === 'true'){
                resp[name[i]] = await getInfo(name[i])
            }
        }
        var svg = [`<svg width='250' height='100' viewBox='0 0 250 100' xmlns='http://www.w3.org/2000/svg'> <rect x='0' y='0' width='250' height='100' rx='7' fill='#161B22'/> <g> <text id='name' dominant-baseline='middle' alignment-baseline='middle' text-anchor='middle' x='50%' y='9%' >${resp.name}</text> </g> <g class="info"> <!-- Repos --> <svg id='repo' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' width='7.6%' height='15%' x='0.8%' y='19.3%' > <path fill-rule='evenodd' d='M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z'/> <path d='M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z' /> </svg> <text dominant-baseline='middle' alignment-baseline='middle' y='27.8%' x='9%'>Repos: ${resp.repos}</text> <!-- Commits --> <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' width='7.6%' height='15%' x='0.8%' y='47.1%'> <path fill-rule='evenodd' d='M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1H8a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z' /> </svg> <text dominant-baseline='middle' y='55.6%' x='9%'>Commits: ${resp.commits}</text> <!-- Stars --> <svg viewBox='0 0 20 20' width='7.6%' height='19%' x='0.8%' y='72.5%'> <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' /> </svg> <text dominant-baseline='middle' y='83.4%' x='9%'>Stars: ${resp.stars}</text> </g>`,
                    null,
                    `<style> svg{ fill:white; } text{ font-family: Arial, Helvetica, sans-serif; font-size: 12px; animation: slide; animation-duration: .3s; transform: translateY(25px); animation-fill-mode: forwards; } #name{ justify-items: center; font-size: 13px; animation: slide; animation-duration: .3s; transform: translateY(25px); animation-fill-mode: forwards; } .info{ animation: slide; animation-duration: .3s; transform: translateY(25px); animation-fill-mode: forwards; } .line-1, .line-2, .line-3{ animation: slide; animation-duration: .3s; transform: translateY(23px); animation-fill-mode: forwards; } @keyframes slide{ from{ opacity: 0; } to{ opacity: 1; transform:translateY(0); } } </style></svg>`]
        
        
        let order = getOrder(await getLangs(data))
        svg[1] = getSvgIcons(order)
        

        res.status(200).send(svg[0]+svg[1]+svg[2])
        
    }
    const getPath = (name,iJson) =>{
        for (let i = 0; i < iJson.length; i++) {
            if(name == iJson[i].name){
                return iJson[i].path
            }
        }
    }
    const getSvgIcons = (order) =>{
        let svg = '<g id="icons">'
        for (let i = 0; i < order.length; i++){
            svg += (i==0) ? `<g class='line-1'><svg x='61.6%' y='22%' class='icon' width='20' height='20' viewBox='0 0 128 128'>${getPath(order[i].name,iJson)}</svg>` : ''
            svg += (i==1) ? `<svg x='70.6%' y='22%' class='icon' width='20' height='20' viewBox='0 0 128 128'>${getPath(order[i].name,iJson)}</svg>` : ''
            svg += (i==2) ? `<svg x='79.6%' y='22%' class='icon' width='20' height='20' viewBox='0 0 128 128'>${getPath(order[i].name,iJson)}</svg>` : ''
            svg += (i==3) ? `<svg x='88.6%' y='22%' class='icon' width='20' height='20' viewBox='0 0 128 128'>${getPath(order[i].name,iJson)}</svg></g>` : ''
            svg += (i==4) ? `<g class='line-2'><svg x='61.6%' y='44.7%' class='icon' width='20' height='20' viewBox='0 0 128 128'>${getPath(order[i].name,iJson)}</svg>` : ''
            svg += (i==5) ? `<svg x='70.6%' y='44.7%' class='icon' width='20' height='20' viewBox='0 0 128 128'>${getPath(order[i].name,iJson)}</svg>` : ''
            svg += (i==6) ? `<svg x='79.6%' y='44.7%' class='icon' width='20' height='20' viewBox='0 0 128 128'>${getPath(order[i].name,iJson)}</svg>` : ''
            svg += (i==7) ? `<svg x='88.6%' y='44.7%' class='icon' width='20' height='20' viewBox='0 0 128 128'>${getPath(order[i].name,iJson)}</svg></g>` : ''
            svg += (i==8) ? `<g class='line-3'><svg x='61.6%' y='67.4%' class='icon' width='20' height='20' viewBox='0 0 128 128'>${getPath(order[i].name,iJson)}</svg>` : ''
            svg += (i==9) ? `<svg x='70.6%' y='67.4%' class='icon' width='20' height='20' viewBox='0 0 128 128'>${getPath(order[i].name,iJson)}</svg>` : ''
            svg += (i==10) ? `<svg x='79.6%' y='67.4%' class='icon' width='20' height='20' viewBox='0 0 128 128'>${getPath(order[i].name,iJson)}</svg>` : ''
            svg += (i==11) ? `<svg x='88.6%' y='67.4%' class='icon' width='20' height='20' viewBox='0 0 128 128'>${getPath(order[i].name,iJson)}</svg></g>` : ''
        }
        if(order.length != 1 || order.length != 4 || order.length != 5 || order.length != 8 || order.length != 9 || order.length != 12){
            svg += '</g> </g>'
            return svg
        }else{
            svg += '</g>'
            return svg
        }
    }

    const getInfo = async (name) =>{

        let commits = 0
        let stars = 0

        if(name == "repos"){
            url = chooseUrl[name]
            const data = await getData(url)
            
            return data.length
        }
        
        if(name == "stars"){
            url = chooseUrl.repos
            const data = await getData(url)

            for(let i = 0; i < data.length; i++){
                stars += data[i].stargazers_count 
            }
            return stars
        }

        if(name == "commits"){
            url = chooseUrl.repos
            const data = await getData(url)
            
            for(let i = 0; i < data.length; i++){
                let respo = await getData(chooseUrl[name] + '/' + data[i].name + '/commits')
                commits += respo.length
            }
            return commits
        }
    }
    
    const getData = async (url) => {
        let data = await fetch(url, {headers:{Authorization: `Token ${process.env.TOKEN}`}})
        data = await data.json()
        return data
    }

    const getLangs = async (data) =>{  
        let langs = {}
        for (let i = 0; i < data.length; i++) {
            let temp = await getData(chooseUrl.commits + `/${data[i].name}/languages`)
            let value = Object.values(temp)
            let name = Object.getOwnPropertyNames(temp)
            for (let i = 0; i < name.length; i++) {
                if(langs[name[i]] !== undefined || langs[name[i] !== null]){
                    langs[name[i]] += parseInt(value[i])
                    
                } else{
                    langs[name[i]] = parseInt(value[i])
                }
            }
        }  
        return langs
    }

    const getOrder = (langs) =>{
        let order = []
        let name = Object.getOwnPropertyNames(langs)
        let value = Object.values(langs)
            for (let i = 0; i < name.length; i++) {
                order.push({name: name[i], value: value[i] })
            }
        order.sort(function (a, b) {
            if (a.value < b.value) {
              return 1;
            }
            if (a.value > b.value) {
              return -1;
            }
            return 0;
        });
        return order
    }

    getTrue()
}
