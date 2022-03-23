import { delay } from "./utils.js";

async function fetchProductData(sku, rowId) {
  const params = new URLSearchParams();
  params.append("sku", sku);
  await delay(2000);
  const res = await fetch(`/api/product-data.php?${params.toString()}`);
  const json = await res.json();
  const tr = document.querySelector(`tr[data-id="${rowId}"]`);
  if (tr) {
    tr.querySelector("td[data-col='name']").innerHTML = json.name;
    tr.querySelector("td[data-col='price']").innerHTML = json.price;
    tr.querySelector("td[data-col='detailsUrl']").innerHTML = json.details_url;
  }
}

function createCol(data) {
  const { name, content } = data;
  const td = document.createElement("td");
  td.dataset.col = name;
  td.innerHTML = content ?? "...";
  return td;
}

function createRow(data) {
  const { id, sku } = data;
  const tr = document.createElement("tr");
  tr.dataset.id = id;
  const cols = [
    { name: "sku", content: sku },
    { name: "name" },
    { name: "price" },
    { name: "detailsUrl" },
  ];
  const tds = cols.map((col) => createCol(col));
  tds.forEach((td) => tr.appendChild(td));
  const actionsTd = document.createElement("td");
  const removeBtn = document.createElement("button");
  removeBtn.innerHTML = "Del";
  removeBtn.type = "button";
  removeBtn.addEventListener("click", (e) => {
    tr.remove();
  });
  actionsTd.appendChild(removeBtn);
  tr.appendChild(actionsTd);
  return tr;
}

export default function initProductTable() {
  const form = document.querySelector("[data-add-products-form]");
  const table = document.querySelector("[data-add-products-table]");

  if (!form || !table) {
    return;
  }
  const input = form.querySelector("input[type='text']");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const sku = formData.get("product-sku");
    form.reset();
    input.focus();
    const rowId = addProduct(sku);
    fetchProductData(sku, rowId);
  });

  function addProduct(sku) {
    const id = Date.now();
    const tr = createRow({ id, sku });
    table.appendChild(tr);
    return id;
  }
}
