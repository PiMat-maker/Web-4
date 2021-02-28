function error(txt, value = 1) {
  console.log("1");
  //main block with elements
  const parent = document.getElementById("form");
  //nodes to change
  const node1 = document.getElementById("checkbox_y");
  const node2 = document.querySelector(".R");
  const node3 = document.getElementById("x_text");

  document.querySelector(".form_button").setAttribute("disabled", true);

  //text
  const text = document.createTextNode("! " + txt + " !");
  const span = document.createElement("span");
  span.appendChild(text);
  span.style = "color: red";
  const p = document.createElement("p");
  p.appendChild(span);
  //pic error
  const img = document.createElement("img");
  img.src = "resources/pictures/злой_пингвинчик.gif";
  img.style.border = "6px dotted #CD5C5C";
  const container = document.createElement("p");
  container.appendChild(img);
  //new section
  const section = document.createElement("section");
  section.appendChild(p);
  section.appendChild(container);
  section.id = "error";
  section.padding = 1;

  disappear(node1);
  disappear(node2);
  disappear(node3);

  parent.appendChild(section);

  setTimeout(() => {
    parent.removeChild(document.getElementById("error"));
    appear(node1);
    appear(node2);
    appear(node3);

    if (value === 0) {
      document.querySelector(".form_button").removeAttribute("disabled");
    }
  }, 2000);
}

//function to hide an element
function disappear(element) {
  element.classList.add("disappear");
}
//function to return an element
function appear(element) {
  element.classList.remove("disappear");
}

export default { disappear, appear, error };
