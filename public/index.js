document.addEventListener("DOMContentLoaded", () => {
  const $navbarBurgers = [].slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );
  const $filter = document.getElementById("form_filter");
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach(el => {
      el.addEventListener("click", () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
  if ($filter) {
    $filter.addEventListener("submit", findPlayer);
    $filter.addEventListener("formdata", event => {
      event.preventDefault();
      const data = event.formData;
      // get the data
      const entries = [...data.entries()];
      console.log(entries);

      const values = [...data.values()];
      console.log(values);
      fetch("https://balldontlie.io/api/v1/players?search=" + values).then(
        res => {
          console.log("res", res);
        }
      );
    });
  }
  function findPlayer(event) {
    event.preventDefault();
    new FormData($filter);
  }
});
