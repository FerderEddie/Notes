
//------------------------------------------------------Register Form---------------------------------------------------------//

//selecting all required elements from html
const homeContainer = document.querySelector(".homeContainer")
const registerContainer =  document.querySelector(".registerContainer")
let mainContainer =  document.querySelector(".mainContainer")
 

const userNameInput = document.querySelector("#userName")
const userEmailInput = document.querySelector("#userEmail")
const userPasswordInput = document.querySelector("#userPassword")
const userPassword_ConfirmInput = document.querySelector("#userPasswordConfirm")

const submitBtn = document.querySelector("#submitBtn")
const loginLink = document.querySelector("#loginLink")

//main users url
const usersUrl = "http://localhost:4000/users"


// add new user form function
submitBtn.addEventListener("click",async(e)=> {
    e.preventDefault()

    addUserFetch()

    mainContainer.style.display = 'flex';

})

//new user fetch 
const addUserFetch = async()=> {
    try {
        const response = await fetch(`${usersUrl}/add`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName:userNameInput.value,
                userEmail:userEmailInput.value,
                userPassword:userPasswordInput.value,
                userPasswordConfirm:userPassword_ConfirmInput.value
            })
        })
        const data = await response.json()
        console.log(data);

        if(!data.success){
        alert(data.error)
        }
        else{
            alert(data.message)
            homeContainer.style.display = "none";

            userEmailInput.value = ""
            userPasswordInput.value = ""

            loginContainer()

        }

    } catch (error) {
        console.log(error);
    }
}

//------------------------------------------------------Login Form---------------------------------------------------------//

// login link function
loginLink.addEventListener("click",async(e)=>{
    e.preventDefault()

    homeContainer.style.display = "none";
    mainContainer.style.display = 'flex';

    
    loginContainer()
})

//login form builder
const loginContainer = async()=> {
   
    const loginForm = document.createElement("form")
    loginForm.className = "loginContainer"


    const h2 = document.createElement("h2")
    h2.textContent = "login"


    const loginBtn = document.createElement("button")
    loginBtn.setAttribute("id","loginBtn")
    loginBtn.setAttribute("href","")
    loginBtn.textContent = "login"


    const goBack = document.createElement("a")
    goBack.setAttribute("href","")
    goBack.className = "goBack"
    goBack.textContent = "go back"
    

    loginForm.append(h2,userEmailInput,userPasswordInput,loginBtn,goBack)
    mainContainer.append(loginForm)    
    document.body.append(mainContainer)

    loginBtn.addEventListener("click",(e)=>{
        e.preventDefault()
        
        loginFetch()
    })
}

// login fetch
const loginFetch = async()=> {
    try {
        const response = await fetch(`${usersUrl}/login`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                userEmail:userEmailInput.value,
                userPassword:userPasswordInput.value
            })
        })

        const data = await response.json()
        console.log(data);

        if(!data.success){
            alert(data.error)
        }
        else{
            alert(data.message)
            Cookies.set("logged", true, { expires: 0.25 });
            Cookies.set("user_id", data.user_id, { expires: 0.25 });

            location.href = "notes.html"
        }
            } catch (error) {
        console.log(error);
    }
}



