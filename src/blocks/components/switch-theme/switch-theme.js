var buttons = document.querySelectorAll(".switch-theme .switch-theme__item");

for (var button of buttons) {
  button.addEventListener("click", function () {
    buttons.forEach((i) => i.classList.remove("active"));

    this.classList.toggle("active");

    const currentClass = this.classList[1];
    console.log(currentClass);
    // динамечески менять класс в body удаляем классы и добавляем новый
    document.body.classList.remove(...document.body.classList);
    document.body.classList.add("theme-" + currentClass);
  });
}
