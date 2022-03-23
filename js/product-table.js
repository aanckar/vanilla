import { delay } from "./utils.js";

async function fetchProductData(sku) {
  const params = new URLSearchParams();
  params.append("sku", sku);
  await delay(2000);
  const res = await fetch(`/api/product-data.php?${params.toString()}`);
  const json = await res.json();
  const tr = document.querySelector(`tr[data-id="${sku}"]`);
  if (tr) {
    tr.querySelector("td[data-col='name']").innerHTML = json.name;
    tr.querySelector("td[data-col='price']").innerHTML = json.price;
    tr.querySelector("td[data-col='detailsUrl']").innerHTML = json.details_url;
  }
}

function createTd(data) {
  const { name, content } = data;
  const td = document.createElement("td");
  td.dataset.col = name;
  td.innerHTML = content ?? "...";
  return td;
}

function createRow(data) {
  const { sku } = data;
  const tr = document.createElement("tr");
  tr.dataset.id = sku;
  const cols = [
    { name: "sku", content: sku },
    { name: "name" },
    { name: "price" },
    { name: "detailsUrl" },
  ];
  const tds = cols.map((col) => createTd(col));
  tds.forEach((td) => tr.appendChild(td));
  return tr;
}

export default function initProductTable() {
  const form = document.querySelector("[data-add-products-form]");
  const input = form.querySelector("input[type='text']");
  const table = document.querySelector("[data-add-products-table]");

  if (!form || !table) {
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const sku = formData.get("product-sku");
    form.reset();
    input.focus();
    addProduct(sku);
    fetchProductData(sku);
  });

  function addProduct(sku) {
    const tr = createRow({ sku });
    table.appendChild(tr);
  }
}
