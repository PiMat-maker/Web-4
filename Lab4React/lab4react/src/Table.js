import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProfileFetch} from "./redux/actions/Fetch";
import {useEffect} from "react/cjs/react.production.min";

export default function Table() {
    const table = useSelector((state) => state.form.table);

    const resultRows = table.map((row) => (
        <tr key={row.id} className="order-table-row">
            <td> {row.x} </td>
            <td> {row.y} </td>
            <td> {row.r} </td>
            <td> {row.result === true ? "true" : "false"} </td>
            <td> {row.workTime} мс</td>
            <td> {row.currentTime} </td>
        </tr>
    ));



    return (
        <table id="resultTable">
            <thead>
            <tr>
                <th>Координата X</th>
                <th>Координата Y</th>
                <th>Радиус</th>
                <th>Результат</th>
                <th>Время работы скрипта</th>
                <th>Текущее время</th>
            </tr>
            </thead>
            <tbody>{resultRows}</tbody>
        </table>
    );
}
