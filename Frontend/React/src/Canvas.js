import React from "react";
import "./styles.css";
import { FormPostFetch } from "./redux/actions/FormFetch";
import { setAnswer } from "./redux/reducers/formReducer";
import {useDispatch, useSelector} from "react-redux";

export default function Canvas(){

    const dispatch = useDispatch();
    const r = useSelector((state) => state.form.r);


    const clicked = (ev) => {
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
        console.log("R " + r);
        if (r.length === 0) {
            dispatch(setAnswer("R not chosen"));
            return;
        }

        //check right R chosen
        for (let valR of r) {
            if (valR <= 0) {
                console.log("Wrong R chosen (only R > 0)");
                dispatch(setAnswer("Wrong R chosen (only R > 0)"));
                return;
            }
        }

        //count number of columns in result

        console.log("Send request");

        //make FormData and send it
        const formData = new FormData();
        for (let i = 0; i < r.length; ++i) {
            formData.append(`x[${i}]`, xCalculated * r[i]);
            formData.append(`y[${i}]`, yCalculated * r[i]);
            formData.append(`r[${i}]`, r[i]);
        }

        dispatch(FormPostFetch(formData));
        const hit = checkArea(xCalculated,yCalculated);
        drawPoint(xCalculated,yCalculated, hit)
    };

    const checkArea = (x,y) => {

        //circle
        if (Math.floor(x) >= 0 && Math.ceil(y) <= 0 && (x*x + y*y) <= 1/4) return "true";

        // rectangle
        if (Math.floor(x) >= 0 && Math.ceil(x) <= 1 && Math.floor(y) >= 0 && Math.ceil(y) <= 1) return "true";

        //triangle
        if (Math.ceil(x) <= 0 && Math.floor(y) >= 0 && Math.ceil(-2*x + parseFloat(y)) <= 1) return "true";
        return "false";
    }

    const drawPoint = (x, y, hit) => {
        console.log("Marking point " + x + ", " + y + ", " + hit);
        let color = "red";
        if (hit === "true") {
            color = "lime";
        }
        if (hit === "none") {
            color = "grey";
        }
        const canvas = document.getElementById("canvas");
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx",x/1.5 * 150 + 150);
        circle.setAttribute("cy",-y/1.5 * 150 + 150);
        circle.setAttribute("r","3");
        circle.setAttribute("fill", color);
        g.appendChild(circle);
        canvas.appendChild(g);
    }

    return (
        <svg id="canvas" onClick={clicked}>
            <line x1="0" x2="300" y1="150" y2="150" stroke="black"/>
            <line x1="150" x2="150" y1="0" y2="300" stroke="black"/>
            <polygon points="150,0 144,15 156,15" stroke="black"/>
            <polygon points="300,150 285,156 285,144" stroke="black"/>

            <line x1="200" x2="200" y1="155" y2="145" stroke="black"/>
            <line x1="250" x2="250" y1="155" y2="145" stroke="black"/>

            <line x1="50" x2="50" y1="155" y2="145" stroke="black"/>
            <line x1="100" x2="100" y1="155" y2="145" stroke="black"/>

            <line x1="145" x2="155" y1="100" y2="100" stroke="black"/>
            <line x1="145" x2="155" y1="50" y2="50" stroke="black"/>

            <line x1="145" x2="155" y1="200" y2="200" stroke="black"/>
            <line x1="145" x2="155" y1="250" y2="250" stroke="black"/>

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
            />

            <path
                className="circle"
                d="M 150 200 A 50 50, 90, 0, 0, 200 150 L 150 150 Z"
                fill="#FF4500"
                fillOpacity="0.3"
                stroke="#FF4500"
            />

            <polygon
                className="triangle"
                points="100,150 150,150 150,50"
                fill="#FFA500"
                fillOpacity="0.3"
                stroke="#FFA500"
            />

            <circle r="0" cx="150" cy="150" id="target-dot"/>
        </svg>
    );

}
