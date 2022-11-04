const fetchDataBtn = document.querySelector("#fetchdata");
const input = document.querySelector("input");

const renderError = function (msg) {
  document.querySelector("#app").insertAdjacentHTML("afterbegin", msg);
};

const createUserHTML = function (user) {
  return `
  <div class=user>
    <p><img src="${user.avatar_url}" alt="${user.name}"/></p>
    <p>Login: ${user.login}</p>
    <p>GitHub Profile: <a href="${user.html_url}" target="_blank">${user.login}</a></p>
  </div>
`;
};

const renderUserFriends = function (data) {
  const html = data.map((user) => createUserHTML(user));
  document.querySelector("#app").insertAdjacentHTML("beforeend", html);
};

function fetchUserFriends() {
  fetch(`https://api.github.com/users/${input.value}/followers`)
    .then((response) => response.json())
    .then((data) => {
      return renderUserFriends(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function fetchUser() {
  fetch(`https://api.github.com/users/${input.value}`)
    .then((response) => {
      if (!response.ok) throw new Error(`This is not a valid user.`);
      return response.json();
    })
    .then((data) => {
      const html = createUserHTML(data);
      document.querySelector("#app").insertAdjacentHTML("afterbegin", html);
      return fetchUserFriends();
    })
    .catch((error) => {
      renderError(error);
    });
}
// fetchData();
fetchDataBtn.addEventListener("click", fetchUser);
