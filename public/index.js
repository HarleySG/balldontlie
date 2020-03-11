document.addEventListener("DOMContentLoaded", () => {
  const $navbarBurgers = [].slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );
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
  const $filter = document.getElementById("form_filter");
  const $create = document.getElementById("form_create");
  const $teamList = document.getElementById("form_teamList");
  const $teamInputs = document.getElementById("form-teamvalues");
  function createPlayer() {
    const input = document.forms.namedItem("form_create");
    input.addEventListener("submit", findPlayer);
    input.addEventListener("formdata", formdataFunc);
    function formdataFunc() {
      const data = event.formData;
      let playerModel = {};
      for (var pair of data.entries()) {
        playerModel[pair[0]] = pair[1];
      }
      console.log("createPlayer -> playerModel", playerModel);
      fetch("http://localhost:4200/addPlayer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: playerModel
      })
        .then(res => {
          console.log("status", res.status);
          return res.json();
        })
        .then(res => {
          console.log("res", res);
        })
        .catch(err => {
          console.error("res", err);
        });
    }
    function findPlayer(event) {
      event.preventDefault();
      new FormData(input);
    }
  }

  // Capturar la entrada del input
  function domFilter(inputElement, selector, selectorContainer) {
    if (inputElement) {
      inputElement.addEventListener("keyup", e => {
        if (e.key === "Escape") e.target.value = "";
        compare(e.target.value.toUpperCase(), selector, selectorContainer);
      });
    }
  }
  // Mostrar los elementos que coincidan con esa entrada (ocultar los que no)
  function compare(filterText, selectorElement, selectorContainer) {
    let searchElements = document.querySelectorAll(selectorElement);
    let searchContainers = document.querySelectorAll(selectorContainer);
    searchElements.forEach(el => {
      el.textContent.toUpperCase().includes(filterText)
        ? (el.dataset.visible = "true")
        : (el.dataset.visible = "false");
    });
    searchContainers.forEach(el => {
      el.textContent.toUpperCase().includes(filterText)
        ? (el.dataset.visible = "true")
        : (el.dataset.visible = "false");
    });
  }

  domFilter($filter, ".js-table-row", ".js-table");
  createPlayer($create);
  (function() {
    if ($teamList) {
      const team_db = localStorage.getItem("team_db");
      async function setTeamList(teamList) {
        await teamList.map(team => {
          const option = document.createElement("option");
          option.value = team.id;
          option.textContent = team.name;
          $teamList.appendChild(option);
        });
      }
      if (!team_db) {
        fetch("https://www.balldontlie.io/api/v1/teams")
          .then(res => {
            return res.json();
          })
          .then(data => {
            localStorage.setItem("team_db", JSON.stringify(data.data));
            setTeamList(data.data);
          });
      } else {
        setTeamList(JSON.parse(team_db));
      }
      $teamList.addEventListener("change", e => {
        const teamSelected = JSON.parse(team_db).find(team => {
          if (team.id == e.target.value) {
            return team;
          }
        });
        Object.keys(teamSelected).map(val => {
          const input = document.querySelector(
            `#${$teamInputs.id} input[name="${val}"]`
          );
          if ($teamInputs) {
            input && (input.value = teamSelected[val]);
          }
        });
      });
    }
  })();
});
