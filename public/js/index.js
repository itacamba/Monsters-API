

window.addEventListener("DOMContentLoaded", () => {
    
    console.log("DOM Loaded")
    
    getMonsters();


    function getMonsters(){
        fetch(`http://localhost:3000/monsters`)
        .then(res => res.json())
        .then(data => displayMonsters(data));
    };

    const monstersList = document.getElementById("monsters-list")
    function displayMonsters(data){
       
        data.forEach(monster => {
            const li = document.createElement('li')
            li.innerText = `${monster.name} - ${monster.personality}` 
            li.id = monster.id
            li.className = "item"
            monstersList.appendChild(li)
        })
    }

    const formCreate = document.getElementById('form-create')
    // let selectedMonster = null

    formCreate.addEventListener("submit", (e) => {
        e.preventDefault();
        let name = document.querySelector("input[name=name]").value
        let personality = document.querySelector("input[name=personality]").value
        const li = document.createElement('li')
        li.innerText = name
        li.className = "item"
        monstersList.appendChild(li)
        // backend 

        // if(selectedMonster === null){
        //     createMonster(name, personality)
        // } else {
        //     updateMonster(name, personality)
        //     selectedMonster = null
        // }
        
    })

    function createMonster(name, personality){
        console.log("creating")
        fetch(`http://localhost:3000/monsters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": name,
                "personality": personality
            })
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const updateMonster =  ( name, personality) => {
        try{
            const obj = {
                name: name,
                personality: personality
            }
            fetch('http://localhost:3000/monsters/1', {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(obj)})
            // .then(resp => resp.json())
            // .then(data => console.log(data))
            fetch('http://localhost:3000/monsters')
            .then(resp => resp.json()).then(data => console.log("monsters: ",data))

        } catch (err){
            console.error(err.message)
        }
        
    }

    monstersList.addEventListener("click", (e) => {
        updateMonster("carl","hey")
        if(e.target && e.target.matches('li.item')){
            const inputName = document.querySelector("input[name=name]")
            inputName.value = e.target.innerText
            selectedMonster = e.target
            console.log(`selected Monster: ${selectedMonster.id}`)
           
        }
    })


})