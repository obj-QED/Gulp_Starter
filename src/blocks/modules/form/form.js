function toggleLoader() {
  const loader = document.getElementById("loader");
  loader.classList.toggle("hidden");
}

function onSuccess(formNode) {
  console.log("Ваша заявка успешно отправлена!");
  formNode.classList.toggle("hidden");
}

function onError(error) {
  alert(error.message);
}

function serializeForm(formNode) {
  const data = new FormData(formNode);
  return data;
}

function checkValidity(event) {
  const formNode = event.target.form;
  const isValid = formNode.checkValidity();
  formNode.querySelector("button").disabled = !isValid;
}

function handleFormSubmit(event) {
  event.preventDefault();
  // loader
  toggleLoader();

  // todo: значение из поля email в консоль
  console.log(event.target.elements.email.value);
  // console.log(JSON.stringify(event.target.elements));

  // скрой кнопку submit
  event.target.querySelector("button").classList.add("hidden");

  // todo: иимтируем отправку формы на сервер
  // const formNode = event.target.form;
  // const data = serializeForm(formNode);
  // toggleLoader();

  // fetch("https://neto-api.herokuapp.com/bosa", {
  //   method: "POST",
  //   body: data,
  // })
  //   .then((response) => {
  //     if (response.ok) {
  //       return response.json();
  //     }
  //     throw new Error("Ошибка отправки данных");
  //   })
  //   .then((data) => {
  //     onSuccess(formNode);
  //     toggleLoader();
  //   })
  //   .catch((error) => {
  //     onError(error);
  //     toggleLoader();
  //   });

  // return false;
}

const applicantForm = document.getElementById("form-banner");
applicantForm.addEventListener("submit", handleFormSubmit);
applicantForm.addEventListener("input", checkValidity);

applicantForm.querySelector("button").disabled = true;
