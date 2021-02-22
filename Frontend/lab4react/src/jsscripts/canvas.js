let arrayPoint = [];
let currentNumberRows = document.getElementsByClassName("order-table-row")
  .length;
let arrayRows = [];

function createGraphic() {
  console.log("Drawing graphic...");
  for (let elem of arrayPoint) {
    drawPoint(...elem);
  }
}

function drawPoint(x, y, hit) {
  console.log("Marking point " + x + ", " + y + ", " + hit);
  let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d");
  context.beginPath();
  context.arc(
    Math.round(150 + (x / 5) * 130),
    Math.round(150 - (y / 5) * 130),
    2,
    0,
    Math.PI * 2,
    false
  );

  context.strokeStyle = "black";
  let color = "red";
  if (hit === "true") {
    color = "lime";
  }
  if (hit === "none") {
    color = "grey";
  }
  context.fillStyle = color;
  context.fill();
  //context.stroke();
}

//onClick canvas
function clicked(ev) {
  console.log("Click on canvas");
  let canvas = document.getElementById("canvas");
  let br = canvas.getBoundingClientRect();
  let left = br.left;
  let top = br.top;
  let x = ev.clientX - left;
  let y = ev.clientY - top;
  let xCalculated = (((x - 176) / 130) * 5).toFixed(5);
  let yCalculated = (((-y + 176) / 130) * 5).toFixed(5);
  console.log(`Click on ${xCalculated}, ${yCalculated}`);

  if (Math.abs(xCalculated) > 5 || Math.abs(yCalculated) > 5) {
    if (document.getElementById("error") == null) {
      error("The point isn't on the coordinate plane", 0);
    }
    return;
  }

  //count number of columns in result
  arrayRows.push(
    Math.max(
      currentNumberRows,
      document.getElementsByClassName("order-table-row").length
    )
  );
  currentNumberRows = Math.max(
    currentNumberRows + 1,
    document.getElementsByClassName("order-table-row").length + 1
  );
  console.log("ADD" + arrayRows.toString());
}

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

export default { disappear, appear, clicked, error };
