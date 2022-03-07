export default function handler(req, res) {

    let param = req.query

    async function getData(param){
        
        let data = await fetch(`https://api.github.com/users/${param.name}`)
        console.log(req.query)
        data = await data.json()
        return res.status(200).json(data)
    }
    getData(param)
}
