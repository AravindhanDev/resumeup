const username = document.getElementById("username")
const password = document.getElementById("password")
const eye = document.querySelector(".eye")
const register = document.getElementById("btn-register")
const usernameError = document.querySelector(".username-error")
const passwordError = document.querySelector(".password-error")

window.addEventListener("load", () => {
	let auth = JSON.parse(localStorage.getItem("auth"))
	if (auth) {
		location.href = "https://resumeup.netlify.app/"
	}
})

function removeFormText() {
	usernameError.classList.add("d-none")
	passwordError.classList.add("d-none")
}

eye.addEventListener("click", (e) => {
	let element = e.currentTarget.previousElementSibling
	let type = element.getAttribute("type")
	if (type === "password") {
		element.setAttribute("type", "text")
	} else {
		element.setAttribute("type", "password")
	}
})

username.addEventListener("keydown", () => {
	removeFormText()
})

password.addEventListener("keydown", () => {
	removeFormText()
})

register.addEventListener("click", () => {
	const user = username.value
	const pass = password.value
	registerApi(user, pass)
})

async function registerApi(user, pass) {
	let error = false
	if (user === "") {
		usernameError.classList.remove("d-none")
		error = true
	}
	if (pass === "") {
		passwordError.classList.remove("d-none")
		error = true
	}
	if (pass.length < 6) {
		passwordError.classList.remove("d-none")
		error = true
	}
	if (error) return
	let options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			username: user,
			password: pass
		})
	}
	const response = await fetch(
		"https://resumed-up.herokuapp.com/register",
		options
	)
	const res = await response.json()
	if (res.notExist) {
		localStorage.setItem("auth", true)
		location.href = "https://resumeup.netlify.app/"
	} else {
		usernameError.classList.remove("d-none")
		localStorage.setItem("auth", false)
	}
}
