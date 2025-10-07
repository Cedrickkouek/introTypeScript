var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = "https://hub-sorel-tracy.mathiscote.ca/api/users";
function main() {
    const loadUserButton = document.querySelector("[data-load-users]");
    const userUl = document.querySelector("[data-user-list]");
    //or if(!loadUserButton) == null == false
    if (loadUserButton == null) {
        console.error("Load user button not found...");
        return;
    }
    loadUserButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(API_URL);
        const users = yield response.json(); //casting de type de la reponse api
        for (const user of users) {
            const li = document.createElement("li");
            li.innerHTML = `
        <h4>Nom d'utilisateur: ${user.username}</h4>
        <h5>Nom: ${user.firstname} ${user.lastname}</h5>
        <button data-user-id="${user.id}">Load courses</button>
      `;
            if (userUl == null) {
                console.error("User list not found...");
                return;
            }
            userUl.appendChild(li);
            const loadCoursesButton = li.querySelector("button");
            loadCoursesButton === null || loadCoursesButton === void 0 ? void 0 : loadCoursesButton.addEventListener("click", handleLoadCourseClick);
            //loadCoursesButton?.addEventListener("click", handleLoadCourseClick); si jamais il est null (use ?)
            //loadCoursesButton!.addEventListener("click", handleLoadCourseClick); quand on sait que ca ne sera pas null (use !)
        }
    }));
}
function handleLoadCourseClick(event) {
    return __awaiter(this, void 0, void 0, function* () {
        const button = event.target;
        const userId = button.dataset.userId;
        const parentLi = button.closest("li");
        const response = yield fetch(`${API_URL}/${userId}`);
        const user = yield response.json();
        const courseUl = document.createElement("ul");
        for (const course of user.courses) {
            const courseLi = document.createElement("li");
            courseLi.innerHTML = course.icon + " " + course.name;
            courseUl.appendChild(courseLi);
        }
        parentLi.appendChild(courseUl);
        button.remove();
    });
}
main();
export {};
