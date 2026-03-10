const getResponse = await fetch("http://localhost:5009/testimonials")
const testimonialsJson = await getResponse.json();
const testimonialList = document.querySelector("ul[name=testimonials_list]")
for(let i = 0; i < testimonialsJson.length; i++){
    const testimonial = testimonialsJson[i];
    const feedback = testimonial.feedback;
    const rating = testimonial.rating;
    


    const newLi = document.createElement("li");
    newLi.innerText = `Feedback: ${feedback}, Rating: ${rating}`;
    testimonialList.appendChild(newLi);
}
const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const body = {
        Feedback: formData.get("feedback"),
        Rating: formData.get("rating"),

    }
    console.log("formData");
    console.log(formData.get("feedback"));
    console.log(formData.get("rating"));
    await fetch("http://localhost:5009/testimonials",{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(body),


    });
    location.reload();

});