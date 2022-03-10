export default function handler(req, res) {

    let param = req.query

    var url = `https://api.github.com/users/${param.name}`

    const chooseUrl = {
        repos: `https://api.github.com/users/${param.name}/repos`,
        commits: `https://api.github.com/repos/${param.name}`
    }

    let resp = {
        nome: param.name,
    }

    param.repos = typeof param.repos !== 'undefined' ? param.repos : 'false'
    param.stars = typeof param.stars !== 'undefined' ? param.stars : 'false'
    param.commits = typeof param.commits !== 'undefined' ? param.commits : 'false'

    const getTrue = async () =>{

        const name = Object.getOwnPropertyNames(param)
        const value = Object.values(param)

        for(let i = 0; i < name.length; i++){
            if(value[i] === 'true'){
                resp[name[i]] = await getInfo(name[i])
            }
        }
        console.log(resp)
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
            console.log(url)

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

    async function getData(url){
        let data = await fetch(url, {headers:{Authorization: "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"}})
        data = await data.json()
        return data
    }

    getTrue()
    res.status(200).json({test: true})
}
