import React from "react";
import {useSelector} from "react-redux";

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
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Результат</th>
                <th>Время работы</th>
                <th>Текущее время</th>
            </tr>
            </thead>
            <tbody>{resultRows}</tbody>
        </table>
    );
}
