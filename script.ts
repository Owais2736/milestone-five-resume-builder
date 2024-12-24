// script.ts

const form = document.getElementById("resumeForm") as HTMLFormElement;
const outputDiv = document.getElementById("resumeOutput") as HTMLDivElement;
const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement;

form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission

    const userName = (document.getElementById("userName") as HTMLInputElement).value;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
    const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;

    const resumeHTML = `
        <h2>Your Resume</h2>
        <h2>${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Experience:</strong></p>
        <p>${experience}</p>
        <p><strong>Skills:</strong></p>
        <p>${skills}</p>
        <p><a href="https://resume.example.com/${userName}" target="_blank">Shareable Resume Link</a></p>
        <button class="btn">Download as PDF</button>
    `;

    outputDiv.innerHTML = resumeHTML;

    const file = profilePictureInput.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const img = document.createElement("img");
            img.src = reader.result as string;
            img.classList.add("profile-picture");  // Add profile-picture class for styling
            outputDiv.prepend(img); // Add image as profile picture at top of resume
        };
        reader.readAsDataURL(file);
    }
});

