// Access jsPDF from the global window object
var jsPDF = window.jsPDF;
var form = document.getElementById("resumeForm");
var outputDiv = document.getElementById("resumeOutput");
var profilePictureInput = document.getElementById("profilePicture");
form.addEventListener("submit", function (e) {
    var _a;
    e.preventDefault(); // Prevent form submission
    var userName = document.getElementById("userName").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value;
    var resumeHTML = "\n        <h2>Your Resume</h2>\n        <h2>".concat(name, "</h2>\n        <p><strong>Email:</strong> ").concat(email, "</p>\n        <p><strong>Phone:</strong> ").concat(phone, "</p>\n        <p><strong>Experience:</strong></p>\n        <p>").concat(experience, "</p>\n        <p><strong>Skills:</strong></p>\n        <p>").concat(skills, "</p>\n        <p><a href=\"https://resume.example.com/").concat(userName, "\" target=\"_blank\">Shareable Resume Link</a></p>\n        <button class=\"btn\" id=\"downloadButton\">Download as PDF</button>\n    ");
    outputDiv.innerHTML = resumeHTML;
    var file = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader_1 = new FileReader();
        reader_1.onload = function () {
            var img = document.createElement("img");
            img.src = reader_1.result;
            img.classList.add("profile-picture"); // Add profile-picture class for styling
            outputDiv.prepend(img); // Add image as profile picture at top of resume
        };
        reader_1.readAsDataURL(file);
    }
    // Add event listener to the "Download as PDF" button
    var downloadButton = document.getElementById("downloadButton");
    if (downloadButton) {
        downloadButton.addEventListener("click", downloadResumeAsPDF);
    }
});
function downloadResumeAsPDF() {
    var pdf = new jsPDF();
    // Set font size and start position for the title
    pdf.setFontSize(18);
    pdf.text("Your Resume", 10, 10);
    // Add profile picture if it exists
    var imgElement = outputDiv.querySelector("img");
    if (imgElement) {
        var imgData = imgElement.src;
        var width = 50; // Width for the profile picture
        var height = (imgElement.height * width) / imgElement.width;
        pdf.addImage(imgData, "JPEG", 10, 20, width, height); // Add profile picture to PDF
    }
    // Adjust Y position after the image
    var yPosition = imgElement ? 30 + (imgElement.height * 50) / imgElement.width : 20;
    // Add resume text below the image
    pdf.setFontSize(12);
    pdf.text("Name: " + document.getElementById("name").value, 10, yPosition);
    pdf.text("Email: " + document.getElementById("email").value, 10, yPosition + 10);
    pdf.text("Phone: " + document.getElementById("phone").value, 10, yPosition + 20);
    pdf.text("Experience: " + document.getElementById("experience").value, 10, yPosition + 30);
    pdf.text("Skills: " + document.getElementById("skills").value, 10, yPosition + 40);
    // Save the PDF
    pdf.save("resume.pdf");
}
