let locations = [];
let id = 0;
let addLocationForm = document.querySelector("#addLocationForm");

if (localStorage.locations) {
  locations = JSON.parse(localStorage.locations);
  renderLocations();
}

if (localStorage.id) {
  id = Number(localStorage.id);
}

function generateId() {
  id++;
  localStorage.id = id;
  return id;
}

addLocationBtn.addEventListener("click", () => {
  modal.classList.remove("editModal");
  document.querySelector('input[name="id"]').value = "";
  modal.showModal();
});

function handleLocationForm() {
  let formData = new FormData(addLocationForm);
  let formObj = Object.fromEntries(formData);
  addLocationForm.reset();

  if (formObj.id !== "") {
    let location = locations.find((x) => x.id === Number(formObj.id));
    location.name = formObj.name;
    location.lname = formObj.lname;
    location.phonenumber = Number(formObj.phonenumber);
    location.adress = formObj.adress;
  } else {
    formObj.id = generateId();
    locations.push(formObj);
  }

  save();
  renderLocations();
}

addLocationForm.addEventListener("submit", handleLocationForm);

function save() {
  localStorage.locations = JSON.stringify(locations);
}

function createLocationHtml(location) {
  return `
 
 <div class="movie">
        <div class="movieEditControls">
          <a class="movieEditBtn" href="#" data-locationid="${location.id}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
          </a>
          <a class="movieDeleteBtn" href="#" data-locationid="${location.id}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
          </a>
        </div>
        <div class="adres">
        <p> <b>Adı : </b>${location.name}</p>
        <p><b>Soyadı : </b>${location.lname} </p>
        <p><b>Tel : </b>${location.phonenumber}</p>
        <p><b>Adres : </b>${location.adress}</p>
      </div>
      </div>
      `;
}

function handleDeleteBtn(e) {
  e.preventDefault();

  if (!confirm("Emin misin ?")) {
    return;
  }

  locations = locations.filter((x) => x.id !== Number(this.dataset.locationid));

  save();
  renderLocations();
}

function handleEditBtn(e) {
  e.preventDefault();
  modal.classList.add("editModal");

  let locationId = Number(this.dataset.locationid);
  let location = locations.find((x) => x.id === locationId);

  document.querySelector('input[name = "id"]').value = location.id;
  document.querySelector('input[name = "name"]').value = location.name;
  document.querySelector('input[name = "lname"]').value = location.lname;
  document.querySelector('input[name = "adress"]').value = location.adress;
  document.querySelector('input[name = "phonenumber"]').value =
    location.phonenumber;
  modal.showModal();
}

function renderLocations() {
  locationContainer.innerHTML = locations
    .map((x) => createLocationHtml(x))
    .join("");

  document
    .querySelectorAll(".movieDeleteBtn")
    .forEach((x) => x.addEventListener("click", handleDeleteBtn));

  document
    .querySelectorAll(".movieEditBtn")
    .forEach((x) => x.addEventListener("click", handleEditBtn));
}
