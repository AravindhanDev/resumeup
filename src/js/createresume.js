"use strict"

import resumeObj from "./resumeResource/resumeObj.js"
import {
	formText,
	firstName,
	lastName,
	emailId,
	mobileNumber,
	aboutYou,
	linkedInProfile,
	githubProfile,
	websitePortfolio,
	sslcSchoolName,
	sslcSchoolPercentage,
	sslcStartYear,
	sslcEndYear,
	hscSchoolName,
	hscSchoolPercentage,
	hscStartYear,
	hscEndYear,
	hscMajor,
	collegeName,
	collegeDegree,
	collegeDegreePercentage,
	collegeDegreeMajor,
	degreeStartYear,
	degreeEndYear,
	projectName,
	projectDate,
	projectUrl,
	projectData,
	projectDelete,
	skills,
	expertise,
	skillData,
	expertiseData,
	skillDelete,
	expertiseDelete,
	companyName,
	jobTitle,
	employmentType,
	jobLocation,
	jobStartYear,
	jobEndYear,
	jobDescription,
	interest,
	interestData,
	interestDelete,
	profileImage,
	uploadBox,
	uploadImage,
	previewBox,
	previewImg,
	discardImg,
	btn1Next,
	btn2Prev,
	btn2Next,
	btn3Prev,
	btn3Next,
	btn4prev,
	btn4Next,
	btn5Prev,
	btn5Next,
	btn6Prev,
	btn6Next,
	btn7Prev,
	btn7Next,
	createResume1,
	createResume2,
	createResume3,
	createResume4,
	createResume5,
	createResume6,
	createResume7,
	formControl,
	formSelect,
	textArea,
	skip
} from "./resumeResource/resumeDom.js"

let currentPage = getCurrentPage()
let fileObj = {}

window.addEventListener("load", () => {
	let auth = JSON.parse(localStorage.getItem("auth"))
	if (!auth) {
		location.href = "https://resumeup.netlify.app/login.html"
		return
	}
	let projectArr = getProjectArr()
	let skillsArr = getSkillsArr()
	let expertiseArr = getExpertiseArr()
	let interestArr = getInterestArr()
	if (interestArr.length <= 0) {
		setInterestArr([])
	} else {
		let interestArr = getInterestArr()
		let html = ""
		interestArr.forEach((data, index) => {
			html += `<div class="interest" id="${index}">
			<div class="interest-name">${data}</div>
			<div class="interest-delete"><i class="bi bi-trash3-fill"></i></div>
			</div>`
		})
		interestData.innerHTML = html
		interest.selectedIndex = 0
		let interestDelete = document.querySelectorAll(".interest-delete")
		interestDelete.forEach((data) => {
			data.addEventListener("click", (e) => {
				interestArr = getInterestArr()
				let element = e.currentTarget.parentElement
				let elementIndex = element.getAttribute("id")
				interestArr.splice(elementIndex, 1)
				setInterestArr(interestArr)
				element.remove()
				interest.selectedIndex = 0
				interestReRender()
			})
		})
	}
	if (skillsArr.length <= 0) {
		setSkillsArr([])
	} else {
		let skillsArr = getSkillsArr()
		let html = ""
		skillsArr.forEach((data, index) => {
			html += `<div class="skill" id="${index}">
			<div class="skill-name">${data}</div>
			<div class="skill-delete"><i class="bi bi-trash3-fill"></i></div>
			</div>`
		})
		skillData.innerHTML = html
		skills.selectedIndex = 0
		let skillDelete = document.querySelectorAll(".skill-delete")
		skillDelete.forEach((data) => {
			data.addEventListener("click", (e) => {
				skillsArr = getSkillsArr()
				let element = e.currentTarget.parentElement
				let elementIndex = element.getAttribute("id")
				console.log(element)
				skillsArr.splice(elementIndex, 1)
				setSkillsArr(skillsArr)
				element.remove()
				skills.selectedIndex = 0
				skillsReRender()
			})
		})
	}
	if (expertiseArr.length <= 0) {
		setExpertiseArr([])
	} else {
		let expertiseArr = getExpertiseArr()
		let html = ""
		expertiseArr.forEach((data, index) => {
			html += `<div class="expertise" id="${index}">
			<div class="expertise-name">${data}</div>
			<div class="expertise-delete"><i class="bi bi-trash3-fill"></i></div>
			</div>`
		})
		expertiseData.innerHTML = html
		expertise.selectedIndex = 0
		let expertiseDelete = document.querySelectorAll(".expertise-delete")
		expertiseDelete.forEach((data) => {
			data.addEventListener("click", (e) => {
				expertiseArr = getExpertiseArr()
				let element = e.currentTarget.parentElement
				let elementIndex = element.getAttribute("id")
				console.log(element)
				expertiseArr.splice(elementIndex, 1)
				setExpertiseArr(expertiseArr)
				element.remove()
				expertise.selectedIndex = 0
				expertiseReRender()
			})
		})
	}
	if (projectArr.length <= 0) {
		setProjectArr([])
	} else {
		let str = ""
		projectArr.forEach((data, index) => {
			str += `<div class="project" id="${index}">`
			str += `<div>${data.projectname}</div>`
			str += `<div>${new Date(data.dateOfCompletion).getFullYear()}</div>`
			str += `<div>${data.projectLink}</div>`
			str += `<div class="projectDelete" id="${index}"><i class="bi bi-trash3-fill"></i></div>`
			str += "</div>"
		})
		projectData.innerHTML = str
		const projectDelete = document.querySelectorAll(".projectDelete")
		projectDelete.forEach((data) => {
			data.addEventListener("click", (e) => {
				let element = e.currentTarget.parentElement
				let elementIndex = element.id
				projectArr.splice(elementIndex, 1)
				setProjectArr(projectArr)
				element.remove()
				projectReRender()
			})
		})
	}
	let resumeObj = getResumeObj()
	setResumeObj(resumeObj)
	currentPage = getCurrentPage()
	setCurrentPage(currentPage)
	reRender()
	renderPage1Details()
	renderPage2Details()
	renderPage5Details()
	if (resumeObj.profileImg !== "") {
		uploadBox.classList.add("d-none")
		previewBox.classList.remove("d-none")
		discardImg.classList.remove("d-none")
		previewImg.src = resumeObj.profileImg
	}
	// renderPageImage()
})

btn1Next.addEventListener("click", (e) => {
	let resumeObj = getResumeObj()
	let error = false
	let fName = firstName.value
	let lName = lastName.value
	let mobile = mobileNumber.valueAsNumber
	let email = emailId.value
	let about = aboutYou.value
	let linkedin = linkedInProfile.value
	let github = githubProfile.value
	let website = websitePortfolio.value

	if (fName === "") {
		firstName.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (lName === "") {
		lastName.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (mobile === "") {
		mobileNumber.nextElementSibling.innerText = "Mobile number is mandatory"
		mobileNumber.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (String(mobile).length < 10) {
		mobileNumber.nextElementSibling.innerText =
			"Please enter valid mobile number"
		mobileNumber.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (email === "") {
		emailId.nextElementSibling.innerText = "Email is mandatory"
		emailId.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (!isEmail(email)) {
		emailId.nextElementSibling.innerText = "Please enter valid email id"
		emailId.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (about === "") {
		aboutYou.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (linkedin !== "" && !linkedin) {
		linkedInProfile.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (github !== "" && !isValidUrl(github)) {
		githubProfile.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (website !== "" && !isValidUrl(website)) {
		websitePortfolio.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (error) return

	resumeObj.personalDetails = {
		fName,
		lName,
		mobile,
		email,
		about,
		linkedin,
		github,
		website
	}
	setResumeObj(resumeObj)
	createResume1.classList.add("d-none")
	setCurrentPage(2)
	reRender()
})

btn2Prev.addEventListener("click", (e) => {
	createResume2.classList.add("d-none")
	setCurrentPage(1)
	reRender()
})

btn2Next.addEventListener("click", (e) => {
	let resumeObj = getResumeObj()
	let error = false
	let sslcSchool = sslcSchoolName.value
	let sslcPercentage = sslcSchoolPercentage.valueAsNumber
	let sslcStart = sslcStartYear.value
	let sslcEnd = sslcEndYear.value
	let hscSchool = hscSchoolName.value
	let hscPercentage = hscSchoolPercentage.valueAsNumber
	let hscStart = hscStartYear.value
	let hscEnd = hscEndYear.value
	let major = hscMajor.value
	let college = collegeName.value
	let degree = collegeDegree.value
	let degreePercentage = collegeDegreePercentage.valueAsNumber
	let degreeStart = degreeStartYear.value
	let degreeEnd = degreeEndYear.value
	let degreeMajor = collegeDegreeMajor.value

	if (sslcSchool === "") {
		sslcSchoolName.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (isNaN(sslcPercentage)) {
		sslcSchoolPercentage.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (Number(sslcStart) > Number(sslcEnd)) {
		sslcEndYear.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (hscSchool === "") {
		hscSchoolName.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (isNaN(hscPercentage)) {
		hscSchoolPercentage.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (Number(hscStart) > Number(hscEnd)) {
		hscEndYear.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (college === "") {
		collegeName.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (isNaN(degreePercentage)) {
		collegeDegreePercentage.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (Number(degreeStart) > Number(degreeEnd)) {
		degreeEndYear.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (error) return
	resumeObj.educationDetails = {
		sslcSchool,
		sslcPercentage,
		sslcStart,
		sslcEnd,
		hscSchool,
		hscPercentage,
		hscStart,
		hscEnd,
		major,
		college,
		degreePercentage,
		degree,
		degreeMajor,
		degreeStart,
		degreeEnd
	}
	setResumeObj(resumeObj)
	createResume2.classList.add("d-none")
	setCurrentPage(3)
	reRender()
})

btn3Prev.addEventListener("click", (e) => {
	createResume3.classList.add("d-none")
	setCurrentPage(2)
	reRender()
})

btn3Next.addEventListener("click", (e) => {
	let resumeObj = getResumeObj()
	let projectArr = getProjectArr()
	if (projectArr.length === 0) {
		swal("Ouch!", "Projects can't be empty", "warning")
	} else {
		console.log(projectArr)
		resumeObj.projectDetails = projectArr
		setResumeObj(resumeObj)
		createResume3.classList.add("d-none")
		setCurrentPage(4)
		reRender()
	}
})

btn4prev.addEventListener("click", (e) => {
	createResume4.classList.add("d-none")
	setCurrentPage(3)
	reRender()
})

btn4Next.addEventListener("click", (e) => {
	let skillsArr = getSkillsArr()
	let expertiseArr = getExpertiseArr()
	if (skillsArr.length < 2 || expertiseArr.length < 2) {
		swal("Note!", "Atleast select two in both!", "info")
		return
	}
	let resumeObj = getResumeObj()
	resumeObj.skills = skillsArr
	resumeObj.expertise = expertiseArr
	console.log(resumeObj)
	setResumeObj(resumeObj)
	createResume4.classList.add("d-none")
	setCurrentPage(5)
	reRender()
})

btn5Prev.addEventListener("click", (e) => {
	createResume5.classList.add("d-none")
	setCurrentPage(4)
	reRender()
})

btn5Next.addEventListener("click", (e) => {
	let resumeObj = getResumeObj()
	let job = jobTitle.value
	let company = companyName.value
	let employment = employmentType.value
	let location = jobLocation.value
	let jobStart = jobStartYear.value
	let jobEnd = jobEndYear.value
	let description = jobDescription.value
	let error = false

	if (job === "") {
		jobTitle.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (company === "") {
		companyName.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (employment === "") {
		employmentType.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (location === "") {
		jobLocation.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (jobStart > jobEnd) {
		jobEndYear.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (description === "") {
		jobDescription.nextElementSibling.classList.remove("d-none")
		error = true
	}
	if (error) return
	resumeObj.employement = {
		job,
		company,
		employment,
		location,
		jobStart,
		jobEnd,
		description
	}
	setResumeObj(resumeObj)
	console.log(resumeObj)
	createResume5.classList.add("d-none")
	setCurrentPage(6)
	reRender()
})

btn6Prev.addEventListener("click", (e) => {
	createResume6.classList.add("d-none")
	setCurrentPage(5)
	reRender()
})

btn6Next.addEventListener("click", (e) => {
	let interestArr = getInterestArr()
	if (interestArr.length < 2) {
		swal("Note!", "Atleast select two interest", "info")
		return
	}
	let resumeObj = getResumeObj()
	resumeObj.interest = interestArr
	setResumeObj(resumeObj)
	createResume6.classList.add("d-none")
	setCurrentPage(7)
	reRender()
})

btn7Prev.addEventListener("click", (e) => {
	createResume7.classList.add("d-none")
	setCurrentPage(6)
	reRender()
})

btn7Next.addEventListener("click", (e) => {
	let resumeObj = getResumeObj()
	if (resumeObj.profileImg !== "") {
		location.href = "https://resumeup.netlify.app/resume.html"
		return
	}
	let file = profileImage.value
	if (file === "") {
		swal("Oops!", "Please select a image for resume!", "error")
		return
	}
	const reader = new FileReader()
	reader.addEventListener("load", () => {
		let img = reader.result
		resumeObj.profileImg = img
		setResumeObj(resumeObj)
		async function callApi() {
			let options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(resumeObj)
			}
			const response = await fetch(
				"https://resumed-up.herokuapp.com/resume",
				options
			)
			const res = await response.json()
			console.log(res)
			if (res.statusCode === 201) {
				localStorage.setItem("resumeCompleted", true)
				setCurrentPage(1)
				location.href = "https://resumeup.netlify.app/resume.html"
			}
		}
		callApi()
	})
	reader.readAsDataURL(fileObj)
})

skip.addEventListener("click", (e) => {
	createResume5.classList.add("d-none")
	setCurrentPage(6)
	reRender()
})

uploadBox.addEventListener("click", (e) => {
	profileImage.click()
})

profileImage.addEventListener("change", (e) => {
	let file = e.target.files[0]
	fileObj = file
	let url = URL.createObjectURL(file)
	uploadBox.classList.add("d-none")
	previewBox.classList.remove("d-none")
	previewImg.setAttribute("src", url)
	discardImg.classList.remove("d-none")
})

discardImg.addEventListener("click", (e) => {
	profileImage.value = ""
	uploadBox.classList.remove("d-none")
	previewBox.classList.add("d-none")
})

interest.addEventListener("change", (e) => {
	let interestArr = getInterestArr()
	if (interestArr.length === 5) {
		swal("Ouch!", "Atmost 5 interests", "warning")
		interest.selectedIndex = 0
		return
	}
	if (interestArr.includes(e.target.value)) {
		swal("Ouch!", "Already exists", "warning")
		skills.selectedIndex = 0
		return
	}
	interestArr.push(e.target.value)
	setInterestArr(interestArr)
	let html = ""
	interestArr.forEach((data, index) => {
		html += `<div class="interest" id=${index}>
			<div class="interest-name">${data}</div>
			<div class="interest-delete">
				<i class="bi bi-trash3-fill"></i>
			</div>
		</div>`
	})
	interestData.innerHTML = html
	interest.selectedIndex = 0
	let interestDelete = document.querySelectorAll(".interest-delete")
	for (let data of interestDelete) {
		data.addEventListener("click", (e) => {
			let element = e.currentTarget.parentElement
			interestArr = getInterestArr()
			if (interestArr.length === 1) {
				interestArr = []
			} else {
				let elementIndex = element.getAttribute("id")
				interestArr.splice(elementIndex, 1)
			}
			setInterestArr(interestArr)
			element.remove()
			interest.selectedIndex = 0
			interestReRender()
		})
	}
})

skills.addEventListener("change", (e) => {
	let skillsArr = getSkillsArr()
	if (skillsArr.length === 5) {
		swal("Ouch!", "Atmost 5 skills", "warning")
		skills.selectedIndex = 0
		return
	}
	if (skillsArr.includes(e.target.value)) {
		swal("Ouch!", "Already exist", "warning")
		skills.selectedIndex = 0
		return
	}
	skillsArr.push(e.target.value)
	setSkillsArr(skillsArr)
	let html = ""
	skillsArr.forEach((data, index) => {
		html += `<div class="skill" id=${index}>
			<div class="skill-name">${data}</div>
			<div class="skill-delete">
				<i class="bi bi-trash3-fill"></i>
			</div>
		</div>`
	})
	skillData.innerHTML = html
	skills.selectedIndex = 0
	let skillDelete = document.querySelectorAll(".skill-delete")
	console.log(skillDelete)
	for (let data of skillDelete) {
		data.addEventListener("click", (e) => {
			let element = e.currentTarget.parentElement
			skillsArr = getSkillsArr()
			if (skillsArr.length === 1) {
				skillsArr = []
			} else {
				let elementIndex = element.getAttribute("id")
				skillsArr.splice(elementIndex, 1)
			}
			setSkillsArr(skillsArr)
			element.remove()
			skills.selectedIndex = 0
			skillsReRender()
		})
	}
})

expertise.addEventListener("change", (e) => {
	let expertiseArr = getExpertiseArr()
	if (expertiseArr.length === 5) {
		swal("Ouch!", "Atmost 5 expertise", "warning")
		expertise.selectedIndex = 0
		return
	}
	if (expertiseArr.includes(e.target.value)) {
		swal("Ouch!", "Already exists", "warning")
		skills.selectedIndex = 0
		return
	}
	expertiseArr.push(e.target.value)
	setExpertiseArr(expertiseArr)
	let html = ""
	expertiseArr.forEach((data, index) => {
		html += `<div class="expertise" id=${index}>
		<div class="expertise-name">${data}</div>
		<div class="expertise-delete">
		<i class="bi bi-trash3-fill"></i>
		</div>
		</div>`
	})
	expertise.selectedIndex = 0
	expertiseData.innerHTML = html
	let expertiseDelete = document.querySelectorAll(".expertise-delete")
	for (let data of expertiseDelete) {
		data.addEventListener("click", (e) => {
			let element = e.currentTarget.parentElement
			expertiseArr = getExpertiseArr()
			if (expertiseArr.length === 1) {
				expertiseArr = []
			} else {
				let elementIndex = element.getAttribute("id")
				expertiseArr.splice(elementIndex, 1)
			}
			setExpertiseArr(expertiseArr)
			element.remove()
			expertise.selectedIndex = 0
			expertiseReRender()
		})
	}
})

projectUrl.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		let projectArr = getProjectArr()
		if (projectArr.length == 2) {
			swal("Ouch!", "Maximum 2 projects", "warning")
			projectName.value = ""
			projectDate.value = ""
			projectUrl.value = ""
			return
		}
		let error = false
		let projectname = projectName.value
		let dateOfCompletion = projectDate.valueAsDate
		let projectLink = projectUrl.value
		if (projectname === "") {
			projectName.nextElementSibling.classList.remove("d-none")
			error = true
		}
		if (dateOfCompletion === null) {
			projectDate.nextElementSibling.classList.remove("d-none")
			error = true
		}
		if (projectLink === "") {
			projectUrl.nextElementSibling.classList.remove("d-none")
			error = true
		}
		if (!isValidUrl(projectLink)) {
			projectUrl.nextElementSibling.innerText = "Invalid project url"
			projectUrl.nextElementSibling.classList.remove("d-none")
			error = true
		}
		if (error) return
		const projectObj = {
			projectname,
			dateOfCompletion,
			projectLink
		}
		projectArr.push(projectObj)
		setProjectArr(projectArr)
		console.log(projectArr)
		let str = ""
		projectArr.forEach((data, index) => {
			str += `<div class="project col-lg-12" id="${index}">`
			str += `<div>${data.projectname}</div>`
			str += `<div>${new Date(data.dateOfCompletion).getFullYear()}</div>`
			str += `<div>${data.projectLink}</div>`
			str += `<div class="projectDelete"><i class="bi bi-trash3-fill"></i></div>`
			str += "</div>"
		})
		projectData.innerHTML = str
		projectName.value = ""
		projectDate.value = ""
		projectUrl.value = ""
		const projectDelete = document.querySelectorAll(".projectDelete")
		projectDelete.forEach((data) => {
			data.addEventListener("click", (e) => {
				let element = e.currentTarget.parentElement
				let elementIndex = element.id
				projectArr.splice(elementIndex, 1)
				setProjectArr(projectArr)
				element.remove()
				projectReRender()
			})
		})
	}
})

mobile.addEventListener("input", (e) => {
	if (e.target.value.length > parseInt(e.target.getAttribute("maxlength"))) {
		e.target.value = e.target.value.slice(0, e.target.getAttribute("maxlength"))
	}
})

for (let data of formControl) {
	data.addEventListener("keydown", (e) => {
		if (e.key === "Enter" || e.key === "Alt" || e.key === "Control") return
		removeFormText()
	})
}

for (let data of formSelect) {
	data.addEventListener("keydown", () => {
		removeFormText()
	})
}

for (let data of textArea) {
	data.addEventListener("keydown", () => {
		removeFormText()
	})
}

function reRender() {
	currentPage = getCurrentPage()
	if (currentPage === 1) createResume1.classList.remove("d-none")
	else if (currentPage === 2) createResume2.classList.remove("d-none")
	else if (currentPage === 3) createResume3.classList.remove("d-none")
	else if (currentPage === 4) createResume4.classList.remove("d-none")
	else if (currentPage === 5) createResume5.classList.remove("d-none")
	else if (currentPage === 6) createResume6.classList.remove("d-none")
	else createResume7.classList.remove("d-none")
}

function interestReRender() {
	let interestArr = getInterestArr()
	let html = ""
	interestArr.forEach((data, index) => {
		html += `<div class="interest" id="${index}">
			<div class="interest-name">${data}</div>
				<div class="interest-delete">
					<i class="bi bi-trash3-fill"></i>
				</div>
			</div>`
	})
	interestData.innerHTML = html
	let interestDelete = document.querySelectorAll(".interest-delete")
	for (let data of interestDelete) {
		data.addEventListener("click", (e) => {
			let element = e.currentTarget.parentElement
			interestArr = getInterestArr()
			if (interestArr.length === 1) {
				interestArr = []
			} else {
				let elementIndex = element.getAttribute("id")
				interestArr.splice(elementIndex, 1)
			}
			setInterestArr(interestArr)
			element.remove()
			interestReRender()
		})
	}
}

function skillsReRender() {
	let skillsArr = getSkillsArr()
	let html = ""
	skillsArr.forEach((data, index) => {
		html += `<div class="skill" id="${index}">
					<div class="skill-name">${data}</div>
					<div class="skill-delete">
						<i class="bi bi-trash3-fill"></i>
					</div>
				</div>`
	})
	skillData.innerHTML = html
	let skillDelete = document.querySelectorAll(".skill-delete")
	for (let data of skillDelete) {
		data.addEventListener("click", (e) => {
			let element = e.currentTarget.parentElement
			skillsArr = getSkillsArr()
			if (skillsArr.length === 1) {
				skillsArr = []
			} else {
				let elementIndex = element.getAttribute("id")
				skillsArr.splice(elementIndex, 1)
			}
			setSkillsArr(skillsArr)
			element.remove()
			skillsReRender()
		})
	}
}

function expertiseReRender() {
	let expertiseArr = getExpertiseArr()
	let html = ""
	expertiseArr.forEach((data, index) => {
		html += `<div class="expertise" id="${index}">
					<div class="expertise-name">${data}</div>
					<div class="expertise-delete">
						<i class="bi bi-trash3-fill"></i>
					</div>
				</div>`
	})
	expertiseData.innerHTML = html
	let expertiseDelete = document.querySelectorAll(".expertise-delete")
	for (let data of expertiseDelete) {
		data.addEventListener("click", (e) => {
			let element = e.currentTarget.parentElement
			expertiseArr = getExpertiseArr()
			if (expertiseArr.length === 1) {
				expertiseArr = []
			} else {
				let elementIndex = element.getAttribute("id")
				expertiseArr.splice(elementIndex, 1)
			}
			setExpertiseArr(expertiseArr)
			element.remove()
			expertiseReRender()
		})
	}
}

function projectReRender() {
	let projectArr = getProjectArr()
	let html = ""
	projectArr.forEach((data, index) => {
		html += `<div class="project" id="${index}">
					<div>${data.projectname}</div>
					<div>
						${new Date(data.dateOfCompletion).getFullYear()}
					</div>
					<div>${data.projectLink}</div>
					<div class="projectDelete" id="${index}">
						<i class="bi bi-trash3-fill"></i></div>
					</div>`
	})
	projectData.innerHTML = html
	const projectDelete = document.querySelectorAll(".projectDelete")
	projectDelete.forEach((data) => {
		data.addEventListener("click", (e) => {
			let element = e.currentTarget.parentElement
			let elementIndex = element.id
			projectArr.splice(elementIndex, 1)
			setProjectArr(projectArr)
			element.remove()
		})
	})
}

function renderPage1Details() {
	let resumeObj = getResumeObj()
	const { fName, lName, mobile, email, about, linkedin, github, website } =
		resumeObj.personalDetails
	firstName.value = fName
	lastName.value = lName
	mobileNumber.value = mobile
	emailId.value = email
	aboutYou.value = about
	linkedInProfile.value = linkedin
	githubProfile.value = github
	websitePortfolio.value = website
}

function renderPage2Details() {
	let resumeObj = getResumeObj()
	const {
		sslcSchool,
		sslcPercentage,
		sslcStart,
		sslcEnd,
		hscSchool,
		hscPercentage,
		hscStart,
		hscEnd,
		major,
		college,
		degreePercentage,
		degree,
		degreeMajor,
		degreeStart,
		degreeEnd
	} = resumeObj.educationDetails
	sslcSchoolName.value = sslcSchool
	sslcSchoolPercentage.value = sslcPercentage
	sslcStartYear.value = sslcStart
	sslcEndYear.value = sslcEnd
	hscSchoolName.value = hscSchool
	hscSchoolPercentage.value = hscPercentage
	hscStartYear.value = hscStart
	hscEndYear.value = hscEnd
	hscMajor.selectedIndex = 0
	collegeName.value = college
	collegeDegreePercentage.value = degreePercentage
	collegeDegree.selectedIndex = 0
	collegeDegreeMajor.selectedIndex = 0
	degreeStartYear.value = degreeStart
	degreeEndYear.value = degreeEnd
}

function renderPage5Details() {
	let resumeObj = getResumeObj()
	const { job, company, employment, location, jobStart, jobEnd, description } =
		resumeObj.employement
	jobTitle.value = job
	companyName.value = company
	employmentType.value = employment
	jobLocation.value = location
	jobStartYear.value = jobStart
	jobEndYear.value = jobEnd
	jobDescription.value = description
}

function isEmail(emailAdress) {
	let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	if (emailAdress.match(regex)) return true
	else return false
}

function renderPageImage() {
	let resumeObj = getResumeObj()
	if (resumeObj.profileImg !== "") {
		uploadBox.classList.add("d-none")
		discardImg.classList.remove("d-none")
		previewBox.classList.remove("d-none")
		previewImg.src = resumeObj.profileImg
	}
}

const isValidUrl = (urlString) => {
	const urlPattern = new RegExp(
		"^(https?:\\/\\/)?" + // validate protocol
			"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
			"((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
			"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
			"(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
			"(\\#[-a-z\\d_]*)?$",
		"i"
	) // validate fragment locator
	return !!urlPattern.test(urlString)
}

function removeFormText() {
	for (let data of formText) {
		data.classList.add("d-none")
	}
}

function getCurrentPage() {
	return parseInt(localStorage.getItem("currentPage")) || 1
}

function setCurrentPage(page) {
	localStorage.setItem("currentPage", page)
}

function getResumeObj() {
	return JSON.parse(localStorage.getItem("resumeObj")) || resumeObj
}

function setResumeObj(resumeObj) {
	localStorage.setItem("resumeObj", JSON.stringify(resumeObj))
}

function getProjectArr() {
	return JSON.parse(localStorage.getItem("projectArr")) || []
}

function setProjectArr(projectArr) {
	localStorage.setItem("projectArr", JSON.stringify(projectArr))
}

function getSkillsArr() {
	return JSON.parse(localStorage.getItem("skillsArr")) || []
}

function setSkillsArr(skillsArr) {
	localStorage.setItem("skillsArr", JSON.stringify(skillsArr))
}

function getExpertiseArr() {
	return JSON.parse(localStorage.getItem("expertiseArr")) || []
}

function setExpertiseArr(expertiseArr) {
	localStorage.setItem("expertiseArr", JSON.stringify(expertiseArr))
}

function getInterestArr() {
	return JSON.parse(localStorage.getItem("interestArr")) || []
}

function setInterestArr(interestArr) {
	localStorage.setItem("interestArr", JSON.stringify(interestArr))
}
