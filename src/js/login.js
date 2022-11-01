const username = document.getElementById("username")
const password = document.getElementById("password")
const login = document.getElementById("btn-login")
const usernameError = document.querySelector(".username-error")
const passwordError = document.querySelector(".password-error")

window.addEventListener("load", () => {
	let auth = JSON.parse(localStorage.getItem("auth"))
	if (auth) {
		location.href = "https://resumeup.netlify.app/"
		return
	}
})

function removeFormText() {
	usernameError.classList.add("d-none")
	passwordError.classList.add("d-none")
}

username.addEventListener("keydown", () => {
	removeFormText()
})

password.addEventListener("keydown", () => {
	removeFormText()
})

login.addEventListener("click", () => {
	const user = username.value
	const pass = password.value
	loginApi(user, pass)
})

async function loginApi(user, pass) {
	if (user === "") {
		usernameError.classList.remove("d-none")
	}
	if (pass === "") {
		passwordError.classList.remove("d-none")
	}
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
		"https://resumed-up.herokuapp.com/login",
		options
	)
	const res = await response.json()
	if (!res.exist) {
		usernameError.classList.remove("d-none")
		localStorage.setItem("auth", false)
		return
	}
	if (!res.userMatch) {
		passwordError.classList.remove("d-none")
		localStorage.setItem("auth", false)
		return
	}
	localStorage.setItem("auth", true)
	location.href = "https://resumeup.netlify.app/"
	// if (!JSON.parse(localStorage.getItem("resumeCompleted"))) {
	// 	location.href = "https://resumeup.netlify.app/createResume.html"
	// } else {
	// 	location.href = "https://resumeup.netlify.app/resume.html"
	// }
}
