const buildResume = document.getElementById("buildResume")

buildResume.addEventListener("click", () => {
	let auth = JSON.parse(localStorage.getItem("auth")) || false
	let resumeCompleted =
		JSON.parse(localStorage.getItem("resumeCompleted")) || false
	if (!auth) {
		location.href = "https://resumeup.netlify.app/login.html"
		return
	}
	if (!resumeCompleted) {
		location.href = "https://resumeup.netlify.app/createResume.html"
		return
	}
	location.href = "https://resumeup.netlify.app/resume.html"
})

window.addEventListener("load", () => {
	let auth = JSON.parse(localStorage.getItem("auth")) || false
	let resumeCompleted =
		JSON.parse(localStorage.getItem("resumeCompleted")) || false
	localStorage.setItem("auth", auth)
	localStorage.setItem("resumeCompleted", resumeCompleted)
})
