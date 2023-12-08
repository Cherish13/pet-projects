document.addEventListener("DOMContentLoaded", function () {
    const userList = document.getElementById("user-list");
    const loadUsersButton = document.getElementById("load-users");
    const searchInput = document.getElementById("search");
    const searchButton = document.getElementById("search-btn");
    let page = 1;
  
    // Fetch data from the Random User Generator API
    function fetchUsers() {
      fetch(`https://randomuser.me/api/?page=${page}&results=10`)
        .then(response => response.json())
        .then(data => {
          const users = data.results;
          users.forEach(user => {
            const userCard = createUserCard(user);
            userList.appendChild(userCard);
          });
        })
        .catch(error => console.error("Error fetching data:", error));
    }
  
    function createUserCard(user) {
      const userCard = document.createElement("div");
      userCard.classList.add("user-card");
  
      const image = document.createElement("img");
      image.src = user.picture.large;
      image.alt = "User Image";
  
      const userInfo = document.createElement("div");
      const userName = document.createElement("h3");
      userName.textContent = `${user.name.first} ${user.name.last}`;
      const email = document.createElement("p");
      email.textContent = `Email: ${user.email}`;
      const phone = document.createElement("p");
      phone.textContent = `Phone: ${user.phone}`;
  
      userInfo.appendChild(userName);
      userInfo.appendChild(email);
      userInfo.appendChild(phone);
  
      userCard.appendChild(image);
      userCard.appendChild(userInfo);
  
      return userCard;
    }
  
    // Load more users when the button is clicked
    loadUsersButton.addEventListener("click", function () {
      page++;
      fetchUsers();
    });
  
    // Search users when the button is clicked
    searchButton.addEventListener("click", function () {
      const searchTerm = searchInput.value.toLowerCase();
      if (searchTerm.trim() !== "") {
        // Clear existing user cards
        userList.innerHTML = "";
        // Fetch data based on the search term
        fetch(`https://randomuser.me/api/?results=10&nat=us&seed=${searchTerm}`)
          .then(response => response.json())
          .then(data => {
            const users = data.results;
            users.forEach(user => {
              const userCard = createUserCard(user);
              userList.appendChild(userCard);
            });
          })
          .catch(error => console.error("Error fetching data:", error));
      } else {
        // If the search term is empty, load more users
        fetchUsers();
      }
    });
  
    // Initial load
    fetchUsers();
  });