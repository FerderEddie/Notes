//if a cookie is saved, than the whole code will run
const login = Cookies.get("logged");

if (login) {

  const user_id = Cookies.get("user_id");

  //  notes and users url
  const notesUrl = "http://localhost:4000/notes";
  const usersUrl = "http://localhost:4000/users";

  // navbar buttons
  const showAll = document.querySelector("#showAll");
  const addNote = document.querySelector("#addNote");
  const logoutBtn = document.querySelector("#logoutBtn");

  let mainContainer = document.querySelector(".mainContainer");

  // fetch that display user name by id
  const welcomeFetch = async()=> {
    try {
      const response = await fetch(`${usersUrl}/getById/${user_id}`)
      const data = await response.json()

      const welcome = document.querySelector("#welcome")
      welcome.className = "welcome"
      welcome.textContent =`welcome ${data.userById.userName}`

    } catch (error) {
      console.log(error);
    }
  }
  welcomeFetch()




  // all notes fetch function
  const allNotesFetch = async (obj) => {
    try {
      const response = await fetch(`${notesUrl}/getNotesByUserId/${user_id}`);
      const data = await response.json();

      if (data.notes < 1) {

        const dashDiv = document.createElement("div")
        dashDiv.className = "dashDiv"

        const noNote = document.createElement("h3")
        noNote.textContent = "no notes"
        noNote.className = "noNote"

        const addNote_FromDash = document.createElement("a")
        addNote_FromDash.setAttribute("href","")
        addNote_FromDash.textContent = "add new note"

        addNote_FromDash.addEventListener("click",async(e)=> {
          e.preventDefault()
          mainContainer.innerHTML = "";

          addingForm();
        })

        dashDiv.append(noNote,addNote_FromDash)
        mainContainer.append(dashDiv)
      }

      for (const note of data.notes) {
        noteBuilder(note);
      }
    } catch (error) {
      console.log(error);
    }
  };

  allNotesFetch();

  let note;

  // note builder function
  const noteBuilder = async (obj) => {
    note = document.createElement("div");
    note.setAttribute("class", "card");
    note.style = "width:18rem;margin:2em;";
    note.className = "note";

    const noteBody = document.createElement("div");
    noteBody.setAttribute("class", "card-body");

    const noteTitle = document.createElement("h5");
    noteTitle.setAttribute("class", "card-title mb-4");
    noteTitle.textContent = obj.noteTitle;

    const noteDate = document.createElement("h6");
    noteDate.setAttribute("class", "card-subtitle mb-4");
    noteDate.textContent = obj.createdAt;

    const noteContent = document.createElement("p");
    noteContent.setAttribute("class", "card-text mb-4");
    noteContent.className = "noteContent";
    noteContent.textContent = obj.noteContent;

    const noteCreator = document.createElement("p");
    noteCreator.setAttribute("class", "card-text");
    noteCreator.textContent = `user: ${obj.noteCreator.userName}`;

    //-----------------------------------------------------------------Edit note---------------------------------------------------
    const editNote = document.createElement("i");
    editNote.setAttribute("class", "fa-solid fa-pen-to-square");
    editNote.style =
      "cursor:pointer;color:black;font-size:1.5em;padding:0.5em;margin:0.5em;";

    editNote.addEventListener("click", () => {
      editNote.remove();
      removeNote.remove();

      const titleInput = document.createElement("input");
      titleInput.setAttribute("class", "card-text mb-1");
      titleInput.value = obj.noteTitle;
      noteTitle.textContent = ""
      noteTitle.append(titleInput)

      const contentInput = document.createElement("textarea");
      contentInput.setAttribute("class", "card-text mb-1");
      contentInput.value = obj.noteContent;
      noteContent.textContent = ""
      noteContent.append(contentInput)

      const saveNote = document.createElement("i");
      saveNote.setAttribute("class", "fa-solid fa-floppy-disk");
      saveNote.style =
        "cursor:pointer;color:black;font-size:1.7em;padding:0.5em;";
      miniDiv.append(saveNote);

      saveNote.addEventListener("click", async () => {
        updateFetch();
      });

      //-------------------------------------------Update fetch------------------------------------------------------------
      const updateFetch = async () => {

        const dataToUpdate = {
          noteTitle: titleInput.value,
          noteContent: contentInput.value
        }


        try {
          const response = await fetch(`${notesUrl}/update/${obj._id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(dataToUpdate)
          });

          const data = await response.json();
          console.log(data);

          noteTitle.textContent = dataToUpdate.noteTitle;
          noteContent.textContent = dataToUpdate.noteContent;
          titleInput.replaceWith(noteTitle);
          contentInput.replaceWith(noteContent);
          saveNote.remove();
          miniDiv.append(editNote, removeNote);

          
          alert("Changes Saved !");
        } catch (error) {
          console.log(error);
        }
      };
    });


    //delete note function
    const removeNote = document.createElement("i");
    removeNote.setAttribute("class", "fa-solid fa-trash-can");
    removeNote.style =
      "cursor:pointer;color:black;font-size:1.5em;padding:0.5em;margin:0.5em;";

    removeNote.addEventListener("click", async () => {
      deleteFetch(obj);
      mainContainer.innerHTML = "";
      allNotesFetch();
    });

    // appending all together
    const miniDiv = document.createElement("div");
    miniDiv.append(editNote, removeNote);

    noteBody.append(noteTitle, noteDate, noteContent, noteCreator, miniDiv);
    note.append(noteBody);
    mainContainer.append(note);
  };

  //-------------------------------------------------------Delete fetch-----------------------------------------------------
  const deleteFetch = async (obj) => {
    try {
      const response = await fetch(`${notesUrl}/delete/${obj._id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      console.log(data.message);
      note.remove();

      mainContainer.innerHTML = "";
    } catch (error) {
      console.log(error);
    }
  };

  //-----------------------------------------------------------------Add note btn--------------------------------------------------------
  addNote.addEventListener("click", async (e) => {

    e.preventDefault();
    mainContainer.innerHTML = "";

    addingForm();
    
  });

  // adding form for new note
  const addingForm = () => {
    const pageTitle = document.createElement("p");
    pageTitle.textContent = "why remember things when you can note them 😉";

    const form = document.createElement("form");
    form.className = "addingForm";

    const titleDiv = document.createElement("div");
    titleDiv.setAttribute("class", "mb-3");

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("class", "form-label");
    titleLabel.textContent = "title*";

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("class", "form-control");

    titleDiv.append(titleLabel, titleInput);

    const contentDiv = document.createElement("div");
    contentDiv.setAttribute("class", "mb-3");

    const contentLabel = document.createElement("label");
    contentLabel.setAttribute("class", "form-label");
    contentLabel.textContent = "content";

    const contentBox = document.createElement("textarea");
    contentBox.setAttribute("type", "text");
    contentBox.setAttribute("class", "form-control");

    contentDiv.append(contentLabel, contentBox);

    const submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("class", "btn btn-warning");
    submitBtn.textContent = "add note";

    //-------------------------------------------------------Add fetch--------------------------------------------------------------------
    submitBtn.addEventListener("click", async (e) => {
      e.preventDefault()

      try {

        const response = await fetch(`${notesUrl}/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            noteTitle: titleInput.value,
            noteContent: contentBox.value,
            noteCreator:user_id
          }),
        });


        const data = await response.json();

        if (!data.success) {
          alert(data.error);
        } else {
          
          alert("note added");
          titleInput.value = "";
          contentBox.value = "";
        }
      } catch (error) {
        console.log(error);
      }
    });

 
    form.append(pageTitle, titleDiv, contentDiv, submitBtn);
    mainContainer.append(form);
  };

  //----------------------------------------------------------------show all notes--------------------------------------------------------
  // show all notes button function
  showAll.addEventListener("click", async () => {
    try {
      mainContainer.innerHTML = "";
      allNotesFetch();
    } catch (error) {
      console.log(error);
    }
  });

  //----------------------------------------------------------------Logout--------------------------------------------------------
  // logout function
  logoutBtn.addEventListener("click", async () => {

    Cookies.remove('logged');
    Cookies.remove('user_id');
    location.href = "index.html"
  });
}

