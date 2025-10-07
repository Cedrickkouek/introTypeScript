export type User = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
}

type Course = {
  id: number;
  name: string;
  icon: string;
}

type userDetail = User & {
  courses: Course[];
}

const API_URL = "https://hub-sorel-tracy.mathiscote.ca/api/users";

function main(){
  const loadUserButton = document.querySelector("[data-load-users]");
  const userUl = document.querySelector("[data-user-list]");

  //or if(!loadUserButton) == null == false
  if(loadUserButton == null){
    console.error("Load user button not found...");
    return;
  }

  loadUserButton.addEventListener("click", async () => {
    const response = await fetch(API_URL);
    const users: User[] = await response.json();  //casting de type de la reponse api

    for (const user of users) {
      const li = document.createElement("li");

      li.innerHTML = `
        <h4>Nom d'utilisateur: ${user.username}</h4>
        <h5>Nom: ${user.firstname} ${user.lastname}</h5>
        <button data-user-id="${user.id}">Load courses</button>
      `;

      if(userUl == null){
        console.error("User list not found...");
        return;
      }

      userUl.appendChild(li);

      const loadCoursesButton = li.querySelector("button");

      loadCoursesButton?.addEventListener("click", handleLoadCourseClick);
      //loadCoursesButton?.addEventListener("click", handleLoadCourseClick); si jamais il est null (use ?)
      //loadCoursesButton!.addEventListener("click", handleLoadCourseClick); quand on sait que ca ne sera pas null (use !)
    }
  });
}


async function handleLoadCourseClick(event: PointerEvent) {
  const button = event.target as HTMLButtonElement;
  const userId = button.dataset.userId;
  const parentLi = button.closest("li")!;

  const response = await fetch(`${API_URL}/${userId}`);
  const user = await response.json();

  const courseUl = document.createElement("ul");
  for (const course of user.courses) {
    const courseLi = document.createElement("li");
    courseLi.innerHTML = course.icon + " " + course.name;
    courseUl.appendChild(courseLi);
  }

  parentLi.appendChild(courseUl);

  button.remove();
}

main();
