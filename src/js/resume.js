const download = document.getElementById("btn-download")
const edit = document.getElementById("btn-edit")
const editBox = document.getElementById("edit-box")
const resume = document.getElementById("resume")
const colorBox = document.querySelectorAll(".color-box")
let flag = false
// dom elements to manipulate
const btnLogout = document.getElementById("btn-logout")
const candidateImg = document.querySelector(".candidate-img")
const candidateDescription = document.querySelector(".candidate-description")
const candidatePhone = document.querySelector(".candidate-phone")
const candidateEmail = document.querySelector(".candidate-email")
const candidateWebsite = document.querySelector(".candidate-website")
const candidateLinkedIn = document.querySelector(".candidate-linkedin")
const candidateGithub = document.querySelector(".candidate-github")
const candidateSkills = document.querySelector(".candidate-skill-list")
const candidateExpertise = document.querySelector(".candidate-expertise-list")
const candidateName = document.querySelector(".candidate-heading")
const candidateMajor = document.querySelector(".candidate-major")
const candidateEducations = document.querySelector(".candidate-educations")
const candidateProjects = document.querySelector(".candidate-projects")
const candidateEmployment = document.querySelector(".candidate-employment")
const candidateInterests = document.querySelector(".candidate-interest-list")
const editResumeData = document.querySelector(".edit-resume-data")

window.addEventListener("load", () => {
	let auth = JSON.parse(localStorage.getItem("auth"))
	if (!auth) {
		location.href = "https://resumeup.netlify.app/login.html"
	}
	let resumeObj = JSON.parse(localStorage.getItem("resumeObj"))
	let {
		personalDetails,
		educationDetails,
		employement,
		expertise,
		interest,
		skills,
		projectDetails,
		profileImg
	} = resumeObj
	candidateImg.src = profileImg
	candidateDescription.innerText = personalDetails.about
	candidatePhone.innerText = `+91 ${personalDetails.mobile}`
	candidateEmail.innerText = personalDetails.email
	if (personalDetails.website === "") {
		candidateWebsite.classList.add("d-none")
	} else {
		candidateWebsite.href = personalDetails.website
	}
	if (personalDetails.github === "") {
		candidateGithub.classList.add("d-none")
	} else {
		candidateGithub.href = personalDetails.github
	}
	if (personalDetails.linkedin === "") {
		candidateLinkedIn.classList.add("d-none")
	} else {
		candidateLinkedIn.href = personalDetails.linkedin
	}
	candidateName.innerText = `${personalDetails.fName} ${personalDetails.lName}`
	candidateMajor.innerText = `${educationDetails.degreeMajor} Major`
	let html = ""
	for (let data of skills) {
		html += `<li>${data}</li>`
	}
	candidateSkills.innerHTML = html
	html = ""
	for (let data of expertise) {
		html += `<li>${data}</li>`
	}
	candidateExpertise.innerHTML = html
	html = ""
	for (let data of interest) {
		html += `<li>${data}</li>`
	}
	candidateInterests.innerHTML = html
	html = ""
	html += `<h6 class="candidate-heading">PROJECTS</h6>`
	for (let data of projectDetails) {
		html += `<div class="candidate-project mt-2">
				<p>${data.projectname} | ${new Date(data.dateOfCompletion).getFullYear()}</p>
				<a target="_blank" href="${data.projectLink}"
					>${data.projectLink}/</a
				>
			</div>`
	}
	candidateProjects.innerHTML = html
	html = ""
	html += `<h6 class="candidate-heading">EDUCATION</h6>
	<div class="candidate-education">
		<p>${educationDetails.college}  ||  ${educationDetails.degreeStart}-${
		educationDetails.degreeEnd
	}</p>
		<p>${
			educationDetails.degree === "Under Graduate"
				? "Bachelors in "
				: educationDetails.degree === "Post Graduate"
				? "Masters of "
				: educationDetails.degree + " in "
		}Computer Application</p>
		<p>GPA: ${educationDetails.degreePercentage / 10}</p>
	</div>
	<div class="candidate-education mt-4">
		<p>${educationDetails.hscSchool}  ||  ${educationDetails.hscStart}-${
		educationDetails.hscEnd
	}</p>
		<p>${educationDetails.major}</p>
		<p>Percentage: ${educationDetails.hscPercentage}%</p>
	</div>
	<div class="candidate-education mt-4">
		<p>${educationDetails.sslcSchool}  ||  ${educationDetails.sslcStart}-${
		educationDetails.sslcEnd
	}</p>
		<p>Science</p>
		<p>GPA: ${educationDetails.sslcPercentage}</p>
	</div>`
	candidateEducations.innerHTML = html
	html = ""
	if (employement.job !== "") {
		html += `<h6 class="candidate-heading">EMPLOYMENT</h6>
		<p>${employement.job} (${employement.employment}) || ${employement.jobStart}-${employement.jobEnd}</p>
		<p>${employement.company}, ${employement.location}</p>
		<p>${employement.description}</p>`
	}
	candidateEmployment.innerHTML = html
})

edit.addEventListener("click", () => {
	if (editBox.classList.contains("d-none")) {
		editBox.classList.remove("d-none")
	} else {
		editBox.classList.add("d-none")
	}
})

for (let element of colorBox) {
	element.addEventListener("click", (e) => {
		let name = e.target.getAttribute("name")
		if (name === "default") {
			document.documentElement.style.setProperty("--secondary-color", "#ff4a4a")
			document.documentElement.style.setProperty(
				"--secondary-opac-color",
				"rgba(255, 74, 74, 0.8)"
			)
			document.documentElement.style.setProperty(
				"--secondary-border",
				"#e64848"
			)
		} else if (name === "teal") {
			document.documentElement.style.setProperty("--secondary-color", "#319da0")
			document.documentElement.style.setProperty(
				"--secondary-opac-color",
				"rgba(49, 157, 160, 0.8)"
			)
			document.documentElement.style.setProperty(
				"--secondary-border",
				"#66bfbf"
			)
		} else if (name === "blue") {
			document.documentElement.style.setProperty("--secondary-color", "#5837d0")
			document.documentElement.style.setProperty(
				"--secondary-opac-color",
				"rgba(88, 55, 208, 0.8)"
			)
			document.documentElement.style.setProperty(
				"--secondary-border",
				"#7900ff"
			)
		} else if (name === "pink") {
			document.documentElement.style.setProperty("--secondary-color", "#ea047e")
			document.documentElement.style.setProperty(
				"--secondary-opac-color",
				"rgba(234, 4, 126, 0.8)"
			)
			document.documentElement.style.setProperty(
				"--secondary-border",
				"#ff5c8d"
			)
		} else if (name === "yellow") {
			document.documentElement.style.setProperty("--secondary-color", "#ffb200")
			document.documentElement.style.setProperty(
				"--secondary-opac-color",
				"rgba(255, 178, 0, 1)"
			)
			document.documentElement.style.setProperty(
				"--secondary-border",
				"#ffcb42"
			)
		} else {
			document.documentElement.style.setProperty("--secondary-color", "#3ccf4e")
			document.documentElement.style.setProperty(
				"--secondary-opac-color",
				"rgba(60, 207, 78, 0.8)"
			)
			document.documentElement.style.setProperty(
				"--secondary-border",
				"#38e54d"
			)
		}
	})
}

download.addEventListener("click", function () {
	editResumeData.classList.add("d-none")
	resume.style.border = "0"
	const { personalDetails } = JSON.parse(localStorage.getItem("resumeObj"))
	let opt = {
		margin: 0,
		padding: 0,
		filename: `${personalDetails.fName}_resume_${Date.now()}.pdf`,
		image: { type: "jpg", quality: 0.9 },
		html2canvas: { scale: 2 },
		jsPDF: { unit: "in", format: "A4", orientation: "portrait" }
	}

	html2pdf()
		.set(opt)
		.from(resume)
		.save()
		.then(() => {
			resume.style.border = "2px dashed #ddd"
			editResumeData.classList.remove("d-none")
		})
})

editResumeData.addEventListener("click", () => {
	localStorage.setItem("resumeCompleted", false)
	location.href = "https://resumeup.netlify.app/createResume.html"
})

btnLogout.addEventListener("click", () => {
	localStorage.setItem("auth", false)
	location.href = "https://resumeup.netlify.app/"
})
