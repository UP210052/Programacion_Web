function getUsers (callback) {
    setTimeout(() => {
        const users = [
            { name: "Hector", years: 20 },
            { name: "Luis", years: 20 }
        ];
        callback(users);
    }, 2000);
}

function getUsersWithPromise() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = [
                { name: "Hector", years: 20 },
                { name: "Luis", years: 20 }
            ];
            resolve(users);
        }, 2000);
    });
    return promise;
}


function getInfo (name, callback) {
    setTimeout(() => {
        let error = null
        const saludo = "Hola " + name +", como estas ?";
        
        if ( name === "Luis") {
            error = new Error ("Esta mal la persona")
        }

        callback(saludo, error);
    }, 5000);
}

function getInfoWithPromise (name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const saludo = "Hola " + name +", como estas ?";
            if ( name === "Luis") {
                reject( new Error ("Esta mal la persona") );
            } else {
                resolve(saludo);
            }
        }, 5000);
    });

}

getUsers((users) => {
    for (let i =0; i < users.length; i++) {
        getInfo( users[i].name, (saludo, error) => {
            if  (error !== null) {
                console.log("Existe un", error);
            } else {
                console.log(saludo);
            }
        });
    }
})

getUsersWithPromise()
    .then((users) => {
        let newRespromises=[];
        for (let i=0; i< users.length; i++) {
            newRespromises.push(getInfoWithPromise(users[i].name))
        }
        return Promise.all(newRespromises);
    })
    .then((info) =>{
        console.log(info);
    })
    .catch((error) =>{
        console.log(error);
    }); 
    
    async function main(){
        let users = await getUsersWithPromise();
        for (let i=0; i< users.length; i++) {
            try {
                let saludo = await getInfoWithPromise()
                console.log(saludo);        
            }catch (error) {
                console.log(error);
            }
        }
    }

    main();
