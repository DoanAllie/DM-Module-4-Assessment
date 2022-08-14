const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")


const baseURL = 'http://localhost:4000'
const errCallback = err => console.log(err)


const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get(`${baseURL}/api/fortune/`)
        .then(res => {
            alert(res.data)
        })
        .catch(errCallback)
} 


complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)

