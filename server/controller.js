const inspirations = require('./db.json')
let globalId = inspirations.length + 1

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortunes = ["A beautiful, smart, and loving person will be coming into your life.", "A dubious friend may be an enemy in camouflage.", "A faithful friend is a strong defense.", "A fresh start will put you on your way.", "A friend is a present you give yourself."]

        let randomIndex = Math.floor(Math.random() * fortunes.length)
        let randomFortune = fortunes[randomIndex]

        res.status(200).send(randomFortune)
    },

    getAllInspirations: (req, res) => {
        res.status(200).send(inspirations)
    },

    deleteInspiration: (req, res) => {
        const { id } = req.params
        const index = inspirations.findIndex(element => element.id === +id)
        inspirations.splice(index,1)
        res.status(200).send(inspirations)
    },

    createInspiration: (req, res) => {
        const { inspiration, imageURL, rating } = req.body
        let newInspiration = {
            id: globalId,
            inspiration,
            imageURL,
            rating: +rating
        }
        inspirations.unshift(newInspiration)
        res.status(200).send(inspirations)
        globalId++
    },

   updateInspiration: (req, res) => {
        const { id } = req.params
        const { type } = req.body
        const index = inspirations.findIndex(element => element.id === +id)
        if (type === 'plus' && inspirations[index].rating < 5) {
            inspirations[index].rating++
            res.status(200).send(inspirations)
        } else if (type === 'minus' && inspirations[index].rating > 1) {
            inspirations[index].rating--
            res.status(200).send(inspirations)
        }
   }

}