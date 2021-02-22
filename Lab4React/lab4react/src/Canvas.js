import React from "react";
import "./styles.css";
//import { useSelector, useDispatch } from "react-redux";
import { FormPostFetch } from "./redux/actions/FormFetch";
import { setAnswer } from "./redux/reducers/formReducer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Canvas extends React.Component {

    constructor(){
        super(1);

        this.state = {
            arrayPoint : [],
            currentNumberRows : document.getElementsByClassName("order-table-row").length,
            arrayRows : []
        }

        document.addEventListener("DOMNodeInserted", () => {
            let row = document.getElementsByClassName("order-table-row").length - 1;
            const index = this.state.arrayRows.indexOf(row);
            console.log("THIS ROW " + row);
            if (index !== -1) {
                console.log(this.state.arrayRows.indexOf(row) + " " + this.state.arrayRows.toString());
                this.state.arrayRows.splice(index, 1);
                const x = document
                    .getElementsByClassName("order-table-row")[row].querySelectorAll("td")[0].innerText;
                const y = document
                    .getElementsByClassName("order-table-row")[row].querySelectorAll("td")[1].innerText;
                const r = document
                    .getElementsByClassName("order-table-row")[row].querySelectorAll("td")[2].innerText;
                const hit = document
                    .getElementsByClassName("order-table-row")[row].querySelectorAll("td")[3].innerText;
                this.drawPoint(x, y, r, hit);
                this.state.arrayPoint.push([x, y, r, "none"]);
            }
        });
    }


    clicked = (ev) => {
        console.log("Click on canvas");
        let canvas = document.getElementById("canvas");
        let br = canvas.getBoundingClientRect();
        let left = br.left;
        let top = br.top;
        let x = ev.clientX - left;
        let y = ev.clientY - top;
        let xCalculated = (((x - 195.5) / 150) * 1.5).toFixed(5);
        let yCalculated = (((-y + 195.76) / 150) * 1.5).toFixed(5);
        console.log(`Click on ${xCalculated}, ${yCalculated}`);
        console.log("PIXELS ", x, " ", y);

        if (Math.abs(xCalculated) > 5 || Math.abs(yCalculated) > 5) {
            if (document.getElementById("error") == null) {
                //error("The point isn't on the coordinate plane", 0);
            }
            return;
        }

        //check R chosen
        console.log("R " + this.props.r);
        if (this.props.r.length === 0) {
            this.props.setAnswer("R not chosen");
            return;
        }

        //check right R chosen
        for (let valR of this.props.r) {
            if (valR <= 0) {
                console.log("Wrong R chosen (only R > 0)");
                this.props.setAnswer("Wrong R chosen (only R > 0)");
                return;
            }
        }

        //count number of columns in result
        this.state.arrayRows.push(
            Math.max(
                this.state.currentNumberRows,
                document.getElementsByClassName("order-table-row").length
            )
        );
        this.setState({
            currentNumberRows : Math.max(
                this.state.currentNumberRows + 1,
                document.getElementsByClassName("order-table-row").length + 1
            )});
        console.log("ADD" + this.state.arrayRows.toString());

        console.log("Send request");

        //make FormData and send it
        const formData = new FormData();
        for (let i = 0; i < this.props.r.length; ++i) {
            formData.append(`x[${i}]`, xCalculated * this.props.r[i]);
            formData.append(`y[${i}]`, yCalculated * this.props.r[i]);
            formData.append(`r[${i}]`, this.props.r[i]);
        }
        //could not to work properly
        this.props.FormPostFetch(formData);
    };

    /*
    function createGraphic() {
      console.log("Drawing graphic...");
      for (let elem of arrayPoint) {
        drawPoint(...elem);
      }
    }
    */

    drawPoint = (x, y, r, hit) => {
        console.log("Marking point " + x + ", " + y + ", " + r + ", " + hit);
        //let point = document.getElementById("target-dot");
        //let newpoint = document.createElement("circle");
        //newpoint.setAttribute("r", "3");
        //newpoint.setAttribute("cx", x/1.5 * 150 + 195.6);
        //newpoint.setAttribute("cy", -y/1.5 * 150 + 195.6);
        let color = "red";
        if (hit === "true") {
            color = "lime";
        }
        if (hit === "none") {
            color = "grey";
        }
        //newpoint.setAttribute("fill", color);
        //point.parentNode.insertBefore(newpoint, point.nextSibling);
        const canvas = document.getElementById("canvas");
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx",x/r/1.5 * 150 + 150);
        circle.setAttribute("cy",-y/r/1.5 * 150 + 150);
        circle.setAttribute("r","3");
        circle.setAttribute("fill", color);
        g.appendChild(circle);
        canvas.appendChild(g);

        //context.stroke();
    }



    render(){
        return (
            <svg id="canvas" onClick={this.clicked}>
                <line x1="0" x2="300" y1="150" y2="150" stroke="black"></line>
                <line x1="150" x2="150" y1="0" y2="300" stroke="black"></line>
                <polygon points="150,0 144,15 156,15" stroke="black"></polygon>
                <polygon points="300,150 285,156 285,144" stroke="black"></polygon>

                <line x1="200" x2="200" y1="155" y2="145" stroke="black"></line>
                <line x1="250" x2="250" y1="155" y2="145" stroke="black"></line>

                <line x1="50" x2="50" y1="155" y2="145" stroke="black"></line>
                <line x1="100" x2="100" y1="155" y2="145" stroke="black"></line>

                <line x1="145" x2="155" y1="100" y2="100" stroke="black"></line>
                <line x1="145" x2="155" y1="50" y2="50" stroke="black"></line>

                <line x1="145" x2="155" y1="200" y2="200" stroke="black"></line>
                <line x1="145" x2="155" y1="250" y2="250" stroke="black"></line>

                <text x="195" y="140">
                    R/2
                </text>
                <text x="248" y="140">
                    R
                </text>

                <text x="40" y="140">
                    -R
                </text>
                <text x="90" y="140">
                    -R/2
                </text>

                <text x="160" y="105">
                    R/2
                </text>
                <text x="160" y="55">
                    R
                </text>

                <text x="160" y="205">
                    -R/2
                </text>
                <text x="160" y="255">
                    -R
                </text>

                <polygon
                    className="rectangle"
                    points="250,50 150,50 150,150, 250,150"
                    fill="#FF69B4"
                    fillOpacity="0.3"
                    stroke="#FF69B4"
                ></polygon>

                <path
                    className="circle"
                    d="M 150 200 A 50 50, 90, 0, 0, 200 150 L 150 150 Z"
                    fill="#FF4500"
                    fillOpacity="0.3"
                    stroke="#FF4500"
                ></path>

                <polygon
                    className="triangle"
                    points="100,150 150,150 150,50"
                    fill="#FFA500"
                    fillOpacity="0.3"
                    stroke="#FFA500"
                ></polygon>

                <circle r="0" cx="150" cy="150" id="target-dot"></circle>
            </svg>
        );
    }

}

const mapDispatchToProps = (dispatch) => ({
    setAnswer : (error) => dispatch(setAnswer(error)),
    FormPostFetch : (formData) => dispatch(FormPostFetch(formData))
});

const mapStateToProps = (state) => ({
    r: state.form.r
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Canvas));
