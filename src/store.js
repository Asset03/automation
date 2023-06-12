import { reactive } from "vue";

export let cells;
export function createCell(headerLength, rowLength, rows) {
  const keys = Object.keys(rows[0]);
  cells = reactive(
    Array.from(Array(headerLength).keys()).map((i) =>
      Array.from(Array(rowLength).keys()).map((j) => rows[j][keys[i + 1]])
    )
  );
  return cells;
}
export function getRows(cells, headers, rowLength) {
  const keys = Object.keys(cells[0]);
  headers = Object.values(headers);
  const data = [];

  cells.forEach((row, rowIndex) => {
    keys.forEach((key, keyIndex) => {
      if (!data.hasOwnProperty(key)) {
        data[key] = {};
      }
      data[key].id = keyIndex + 1;
      data[key][headers[rowIndex]] = row[keyIndex];
    });
  });
  return data;
}
// export function evalCell(exp) {
//   return exp;
//   if (!exp.startsWith("=")) {
//     return exp;
//   }

//   // = A1 + B2 ---> get(0,1) + get(1,2)
//   exp = exp
//     .slice(1)
//     .replace(
//       /\b([A-Z])(\d{1,2})\b/g,
//       (_, c, r) => `get(${c.charCodeAt(0) - 65},${r})`
//     );

//   try {
//     return new Function("get", `return ${exp}`)(getCellValue);
//   } catch (e) {
//     return `#ERROR ${e}`;
//   }
// }

// function getCellValue(c, r) {
//   const val = evalCell(cells[c][r]);
//   const num = Number(val);
//   return Number.isFinite(num) ? num : val;
// }
