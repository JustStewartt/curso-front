const forms = document.querySelectorAll(".signup-form")
// const sendEmail = (event) => {
//     e.preventDefault()
//     console.log(event);
// }
// console.log(forms);

const getTemplate = () =>{
    return fetch("./template.html")
    .then((response) =>response.text())
}

const sendEmailToApi = (address, template) => {
    fetch(`https://bedu-email-sender-api.herokuapp.com/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: address,
        template: template,
      }),
    })
      .then((results) => {
          if (results.status==200) {
              alert("Email Send")
          }
          else{
              alert("Send Failed")
          }
        console.log(results);
        document.getElementById(email).value = ""
        alert("E-mail send!!!")
      })
      .catch((error) => {
        console.error(error);
        document.getElementById(email).value = ""
        alert("Send failed")
      });
  };

function sendEmail(miVariable){
    miVariable.preventDefault()
    const email = miVariable.target.querySelector("input").value
    getTemplate()
    .then((template) => {
      sendEmailToApi(email, template);
    })
    .catch((error)=>{
        console.log(error, "error al obtener template");
    })
    
}

for (let i = 0; i <forms.length; i++) {
    // const element = forms[i];
    // console.log(i);
    forms[i].addEventListener("submit", sendEmail)
}