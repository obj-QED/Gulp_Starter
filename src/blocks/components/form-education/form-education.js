function toggleLoader() {
  const loader = document.getElementById("loader");

  if (form.querySelector("button")) {
    // form.querySelector("button").disabled = true;
    loader.classList.toggle("hidden");
  }
}

function onSuccess(formNode) {
  alert("Ваша заявка успешно отправлена! Данные выведены в консоль.");
  formNode.classList.toggle("hidden");
}

function onError(error) {
  console.log(error.message);
}

function serializeForm(formNode) {
  const { elements } = formNode;

  const data = Array.from(elements)
    .map((element) => {
      const { name, type } = element;
      const value = type === "checkbox" ? element.checked : element.value;

      return { name, value };
    })
    .filter((item) => !!item.name);

  console.log(data);
}

function checkValidity(event) {
  const input = event.target;
  const isValid = input.checkValidity();
  if (!isValid) {
    const error = document.createElement("div");
    error.classList.add("error");
    error.innerHTML = input.validationMessage;
    input.parentNode.appendChild(error);
    input.classList.add("error__input");
  } else {
    const error = input.parentNode.querySelector(".error");
    if (error) {
      input.parentNode.removeChild(error);
      input.classList.remove("error__input");
    }
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  serializeForm(form);
  toggleLoader();

  setTimeout(() => {
    toggleLoader();
    onSuccess(form);
  }, 2000);
}

function handleDegreesBtnClick() {
  const degreesBlock = event.target.closest(".degrees-block");
  const parent = degreesBlock.parentNode;
  const clone = degreesBlock.cloneNode(true);

  const degreesBlocks = parent.querySelectorAll(".degrees-block");
  if (degreesBlocks.length === 1) {
    degreesBlocks[0].classList.add("none-remove");

    const removeBtn = degreesBlocks[0].querySelector(".degrees-block__remove");
    removeBtn.removeEventListener("click", handleDegreesBlockRemoveClick);

    parent.insertBefore(clone, degreesBlock.nextSibling);

    clone.querySelectorAll("input").forEach((input) => {
      input.value = "";
      if (input.classList.contains("error__input")) {
        input.classList.remove("error__input");
      }
      const addBtn = input.closest(".degrees-block").querySelector(".degrees-block__add");
      addBtn.classList.add("degrees-block__add--deactive");

      const checkbox = input.closest(".degrees-block").querySelector("input[type=checkbox]");
      checkbox.checked = false;

      const error = input.parentNode.querySelector(".error");
      if (error) {
        input.parentNode.removeChild(error);
      }
    });
  }

  // если элементов больше 2 то первому блоку ставим класс index

  clone.querySelector(".degrees-block__add").addEventListener("click", handleDegreesBtnClick);
  clone.querySelector(".degrees-block__remove").addEventListener("click", handleDegreesBlockRemoveClick);
}

function handleDegreesBlockRemoveClick() {
  const degreesBlock = event.target.closest(".degrees-block");
  const parent = degreesBlock.parentNode;

  const degreesBlocks = parent.querySelectorAll(".degrees-block");
  if (degreesBlocks.length > 1) {
    parent.removeChild(degreesBlock);
  }
}

const form = document.getElementById("form-education");

form.addEventListener("submit", handleFormSubmit);
form.addEventListener("input", checkValidity);

document.addEventListener("DOMContentLoaded", () => {
  const degreesBlocks = document.querySelectorAll(".degrees-block");
  degreesBlocks.forEach((degreesBlock) => {
    const addBlock = degreesBlock.querySelector(".degrees-block__add");
    addBlock.addEventListener("click", handleDegreesBtnClick);
    const removeBlock = degreesBlock.querySelector(".degrees-block__remove");
    removeBlock.addEventListener("click", handleDegreesBlockRemoveClick);
  });

  const checkboxParent = document.querySelectorAll(".toggle-checkbox");

  checkboxParent.forEach((checkboxParent) => {
    const checkbox = checkboxParent.querySelector("input[type=checkbox]");
    checkbox.addEventListener("change", () => {
      checkbox.checked
        ? checkbox.closest(".toggle-checkbox").classList.add("toggle-checkbox--check")
        : checkbox.closest(".toggle-checkbox").classList.remove("toggle-checkbox--check");
    });
  });
});
